package org.muellners.bounties.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.muellners.bounties.service.dto.BountyDTO;
import org.muellners.bounties.service.dto.StripeConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${application.stripe.secret-key}")
    private static String stripeApiKey;

    @Value("${application.stripe.payment-methods}")
    private String paymentMethods;
    
    @Value("${application.stripe.publishable-key}")
    public String stripePublishableKey;
    
    @Value("${application.stripe.account-country}")
    public String stripeCountry;

    public StripePaymentService() {
        //
    }

    public PaymentIntent createPaymentIntent(final BountyDTO bounty) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        Map<String, Object> paymentIntentParams = new HashMap<String, Object>();
        paymentIntentParams.put("amount", bounty.getAmount());
        paymentIntentParams.put("currency", "USD"); // bounty.currency);

        //build initial payment methods which should exclude currency specific ones
        List<String> payment_method_types = new ArrayList<String>();
        payment_method_types.remove("au_becs_debit");
        payment_method_types = Arrays.asList(Optional.ofNullable(paymentMethods).orElse("card")
                                                                            .split("\\s*,\\s*"));
        paymentIntentParams.put("payment_method_types", payment_method_types);

        return PaymentIntent.create(paymentIntentParams);
    }

    public PaymentIntent updatePaymentIntent(String paymentIntentId, final BountyDTO bounty,
                                                      String currency, List<String> paymentMethods) {
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
        Stripe.apiKey = stripeApiKey;
        return PaymentIntent.retrieve(id);
    }

    public StripeConfig getConfig() {
        return new StripeConfig();
    }

}
