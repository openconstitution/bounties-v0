package org.muellners.bounties.service.impl;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.CardException;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import org.muellners.bounties.service.BountyService;
import org.muellners.bounties.service.StripePaymentService;
import org.muellners.bounties.service.dto.BountyDTO;
import org.muellners.bounties.service.dto.StripeConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StripePaymentServiceImpl implements StripePaymentService {

    private final Logger log = LoggerFactory.getLogger(StripePaymentServiceImpl.class);

    @Value("${application.stripe.payment-methods}")
    private List<String> paymentMethods;

    private BountyService bountyService;

    private Environment env;

    public StripePaymentServiceImpl(final BountyService bountyService, final Environment env) {
        this.bountyService = bountyService;
        this.env = env;
    }

    @Override
    public PaymentIntent createPaymentIntent(final String paymentMethodId, final String receiptEmail,
                                             final Long bountyId, String currency) throws StripeException {

        Stripe.apiKey = env.getProperty("application.stripe.api-key");

        final BountyDTO bounty = bountyService.findOne(bountyId);

        if (currency == null) {
            currency = "USD";
        }

        Map<String, Object> paymentIntentParams = new HashMap<String, Object>();
        paymentIntentParams.put("amount", 100);
        paymentIntentParams.put("currency", currency);
        if (receiptEmail != null) {
            paymentIntentParams.put("receipt_email", receiptEmail);
        }
        paymentIntentParams.put("payment_method", paymentMethodId);
        paymentIntentParams.put("payment_method_types", paymentMethods);

        //build initial payment methods which should exclude currency specific ones
//        paymentMethods.remove("eps");
//        paymentMethods.remove("bancontact");
//        paymentMethods.remove("au_becs_debit");

        return PaymentIntent.create(paymentIntentParams);
    }

    @Override
    public PaymentIntent updatePaymentIntent(final String paymentIntentId, final String paymentMethodId,
                                             final String receiptEmail, final Long bountyId, final String currency,
                                             final List<String> paymentMethods) {
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
            if (paymentMethodId != null) {
                paymentIntentParams.put("payment_method", paymentMethodId);
            }
            if (paymentMethods != null) {
                paymentIntentParams.put("payment_method_types", paymentMethods);
            }
            if (receiptEmail != null) {
                paymentIntentParams.put("receipt_email", receiptEmail);
            }

//            paymentIntentParams.put("application_fee_amount", 1);

            return paymentIntent.update(paymentIntentParams);
        } catch (StripeException e) {
            log.debug("An error occurred : {}", e.getLocalizedMessage());
            return null;
        }
    }

    @Override
    public PaymentIntent confirmPaymentIntent(final String paymentIntentId) {
        Stripe.apiKey = env.getProperty("application.stripe.api-key");
        try {
            final PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            return paymentIntent.confirm();
        } catch (StripeException e) {
            log.debug("An error occurred : {}", e.getLocalizedMessage());
            return null;
        }
    }

    @Override
    public PaymentIntent getPaymentIntent(String id) throws StripeException {
        Stripe.apiKey = env.getProperty("application.stripe.api-key");
        return PaymentIntent.retrieve(id);
    }

    @Override
    public StripeConfig getConfig() {
        return new StripeConfig(env.getProperty("application.stripe.publishable-key"),
                env.getProperty("application.stripe.account-country"));
    }

    @Override
    public String createPaymentMethod(final String cardNumber, final String cardExpiryDate,
                                             final String cardCvcNumber) throws StripeException {
        Stripe.apiKey = env.getProperty("application.stripe.api-key");
        
        final String expiryMonth = cardExpiryDate.substring(0, 2);
        final String expiryYear = "20".concat(cardExpiryDate.substring(2));

        log.debug("Expiry Month: {} and Expiry Year: {}", expiryMonth, expiryYear);
        
        Map<String, Object> card = new HashMap<>();
        card.put("number", cardNumber);
        card.put("exp_month", expiryMonth);
        card.put("exp_year", expiryYear);
        if (cardCvcNumber != null) {
            card.put("cvc", cardCvcNumber);
        }
        Map<String, Object> params = new HashMap<>();
        params.put("type", "card");
        params.put("card", card);

        try {
            final PaymentMethod paymentMethod = PaymentMethod.create(params);
            return new Gson().toJson(paymentMethod);
        } catch (CardException e) {
            log.debug("Stripe Card Exception: {}", e.getLocalizedMessage());
            final HashMap<String, HashMap<String, String>> errorMap = new HashMap<>();
            final HashMap<String, String> errorDetailMap = new HashMap<>();
            errorDetailMap.put("code", e.getStripeError().getCode());
            errorDetailMap.put("message", e.getStripeError().getMessage());
            errorMap.put("error", errorDetailMap);
            return new Gson().toJson(errorMap);
        }
    }

}
