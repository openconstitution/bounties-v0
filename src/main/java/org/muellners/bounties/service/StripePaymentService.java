package org.muellners.bounties.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.muellners.bounties.service.dto.BountyDTO;
import org.muellners.bounties.service.dto.StripeConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StripePaymentService {

    private final Logger log = LoggerFactory.getLogger(StripePaymentService.class);

    @Value("${application.stripe.payment-methods}")
    private List<String> paymentMethods;

    private BountyService bountyService;

    private Environment env;

    public StripePaymentService(final BountyService bountyService, final Environment env) {
        this.bountyService = bountyService;
        this.env = env;
    }

    public PaymentIntent createPaymentIntent(final Long bountyId) throws StripeException {

        Stripe.apiKey = env.getProperty("application.stripe.api-key");

        final BountyDTO bounty = bountyService.findOne(bountyId);

        Map<String, Object> paymentIntentParams = new HashMap<String, Object>();
        paymentIntentParams.put("amount", 100.0);
        paymentIntentParams.put("currency", "USD"); // bounty.currency);

        //build initial payment methods which should exclude currency specific ones
//        paymentMethods.remove("eps");
//        paymentMethods.remove("bancontact");
//        paymentMethods.remove("au_becs_debit");
        paymentIntentParams.put("payment_method_types", paymentMethods);

        return PaymentIntent.create(paymentIntentParams);
    }

    public PaymentIntent updatePaymentIntent(String paymentIntentId, final Long bountyId,
                                                      String currency, List<String> paymentMethods) {
        Stripe.apiKey = env.getProperty("application.stripe.api-key");
        final BountyDTO bounty = bountyService.findOne(bountyId);
        try {
            final PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            final BigDecimal amount = bounty.getAmount();

            Map<String, Object> paymentIntentParams = new HashMap<String, Object>();
            if (amount != null) {
                paymentIntentParams.put("amount", amount);
            }
            if (currency != null) {
                paymentIntentParams.put("currency", currency);
            }
            if (paymentMethods != null) {
                paymentIntentParams.put("payment_method_types", paymentMethods);
            }

            return paymentIntent.update(paymentIntentParams);
        } catch (StripeException e) {
            log.debug("An error occurred : {}", e.getLocalizedMessage());
            return null;
        }
    }

    public PaymentIntent getPaymentIntent(String id) throws StripeException {
        Stripe.apiKey = env.getProperty("application.stripe.api-key");
        return PaymentIntent.retrieve(id);
    }

    public StripeConfig getConfig() {
        return new StripeConfig(env.getProperty("application.stripe.publishable-key"),
                env.getProperty("application.stripe.account-country"));
    }

}
