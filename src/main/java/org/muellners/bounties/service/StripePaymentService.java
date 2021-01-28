package org.muellners.bounties.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.muellners.bounties.service.dto.StripeConfig;
import java.util.List;

public interface StripePaymentService {

	PaymentIntent createPaymentIntent(final String paymentMethodId, final String receiptEmail,
                                         final Long bountyId, String currency) throws StripeException;

	PaymentIntent updatePaymentIntent(final String paymentIntentId, final String paymentMethodId,
	                                     final String receiptEmail, final Long bountyId, final String currency,
	                                     final List<String> paymentMethods);

	PaymentIntent confirmPaymentIntent(final String paymentIntentId);

	PaymentIntent getPaymentIntent(String id) throws StripeException;

	StripeConfig getConfig();

	String createPaymentMethod(final String cardNumber, final String cardExpiryDate,
                                  final String cardCvcNumber) throws StripeException;
}
