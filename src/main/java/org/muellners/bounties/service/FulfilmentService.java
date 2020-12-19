package org.muellners.bounties.service;

import com.google.gson.JsonSyntaxException;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Source;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class FulfilmentService {

    private final Logger log = LoggerFactory.getLogger(FulfilmentService.class);

    private Environment env;

    public FulfilmentService(final Environment env) {
        this.env = env;
    }

    public Event verifyAndReturn(String payload, String header) throws JsonSyntaxException, SignatureVerificationException {

        Stripe.apiKey = env.getProperty("application.stripe.api-key");

        final String endpointSecret = env.getProperty("application.stripe.webhook-secret");

        Event event;

        if (endpointSecret == null) {
            event = ApiResource.GSON.fromJson(payload, Event.class);
        } else {
            event = Webhook.constructEvent(
                    payload, header, endpointSecret
            );
        }

        return event;
    }

    public Integer fulfill(Event event) throws StripeException {

        PaymentIntent pi;
        Source source;
        String paymentIntentId;

        // Switch on the event type to handle the different events we have subscribed to
        switch (event.getType()) {

            // Events where the PaymentIntent has succeeded
            case "payment_intent.succeeded":
                // Get the PaymentIntent out from the event.
                pi = (PaymentIntent) event.getDataObjectDeserializer().getObject().orElseThrow(IllegalArgumentException::new);

                // Print a success message
                log.debug("Webhook received! Payment for PaymentIntent {} succeeded", pi.getId());
                break;

            case "payment_intent.payment_failed":
                // Get the PaymentIntent out from the event.
                pi = (PaymentIntent) event.getDataObjectDeserializer().deserializeUnsafe();

                // Print a failure message
                log.debug("Webhook received! Payment for PaymentIntent {} failed", pi.getId());
                break;

            case "source.chargeable":
                // Get the Source out from the event
                source = (Source) event.getDataObjectDeserializer().getObject().orElseThrow(IllegalArgumentException::new);
                log.debug("Webhook received! The source {} is chargeable", source.getId());

                // Attempt to get the PaymentIntent associated with this source
                paymentIntentId = source.getMetadata().get("paymentIntent");

                // If there was no PaymentIntent associated with the source, return a 400
                if (paymentIntentId == null) {
                    log.debug("Could not find a PaymentIntent in the source.chargeable event {}", event.getId());
                    return 400;
                }

                // Get the PaymentIntent
                pi = PaymentIntent.retrieve(source.getMetadata().get("paymentIntent"));

                // If the PaymentIntent already has a source, return a 403
                if (!(pi.getStatus().equals("requires_payment_method"))) {
                    return 403;
                }

                // Confirm the PaymentIntent using the source id
                final Map<String, Object> params = new HashMap<String, Object>();
                params.put("source", source.getId());
                pi.confirm(params);

                break;

            case "source.failed":
                // Get the Source out from the event.
                source = (Source) event.getDataObjectDeserializer().getObject().orElseThrow(IllegalArgumentException::new);

                // Print a failure message
                log.debug("The Source {} failed or timed out.", source.getId());

                // Attempt to get the PaymentIntent associated with this source
                paymentIntentId = source.getMetadata().get("paymentIntent");

                // If there was no PaymentIntent associated with the source, return a 400
                if (paymentIntentId == null) {
                    log.debug("Could not find a PaymentIntent in the source.chargeable event {}", event.getId());
                    return 400;
                }

                // Get the PaymentIntent
                pi = PaymentIntent.retrieve(source.getMetadata().get("paymentIntent"));

                pi.cancel();

                break;

            case "source.cancelled":
                // Get the Source out from the event.
                source = (Source) event.getDataObjectDeserializer().getObject().orElseThrow(IllegalArgumentException::new);

                // Print a failure message
                log.debug("The Source {} failed or timed out.", source.getId());

                // Attempt to get the PaymentIntent associated with this source
                paymentIntentId = source.getMetadata().get("paymentIntent");

                // If there was no PaymentIntent associated with the source, return a 400
                if (paymentIntentId == null) {
                    log.debug("Could not find a PaymentIntent in the source.chargeable event {}", event.getId());
                    return 400;
                }

                // Get the PaymentIntent
                pi = PaymentIntent.retrieve(source.getMetadata().get("paymentIntent"));

                pi.cancel();

            default:
                log.debug("No case to handle events of type {}", event.getType());
        }

        return 200;
    }
}
