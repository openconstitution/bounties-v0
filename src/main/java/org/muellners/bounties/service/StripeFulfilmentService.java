package org.muellners.bounties.service;

import com.google.gson.JsonSyntaxException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;

public interface StripeFulfilmentService {

	Event verifyAndReturn(String payload, String header) throws JsonSyntaxException, SignatureVerificationException;

	Integer fulfill(Event event) throws StripeException;

}
