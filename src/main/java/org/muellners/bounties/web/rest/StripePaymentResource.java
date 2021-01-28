package org.muellners.bounties.web.rest;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.stripe.model.PaymentIntent;
import io.github.jhipster.web.util.HeaderUtil;
import org.muellners.bounties.service.StripeFulfilmentService;
import org.muellners.bounties.service.StripePaymentService;
import org.muellners.bounties.service.dto.StripeConfig;
import org.muellners.bounties.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.stripe.exception.StripeException;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;

/**
 * REST controller for managing {@link org.muellners.bounties.service.dto.StripeConfig}.
 */
@RestController
@RequestMapping("/api/stripe")
@Transactional
public class StripePaymentResource {

    private final Logger log = LoggerFactory.getLogger(StripePaymentResource.class);

    private static final String ENTITY_NAME = "payment";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final StripePaymentService stripePaymentService;

	private final StripeFulfilmentService fulfilmentService;

	public StripePaymentResource(final StripePaymentService stripePaymentService,
	                             final StripeFulfilmentService fulfilmentService) {
		this.stripePaymentService = stripePaymentService;
		this.fulfilmentService = fulfilmentService;
	}

    /**
     * GET  /config : Get stripe config.
     *
     * @return the ResponseEntity with status 200 (OK) and the stripe configs in body
     */
    @GetMapping("/config")
    public ResponseEntity<StripeConfig> getStripeConfig() {
        log.debug("REST request to get stripe config");
        final StripeConfig stripeConfig = stripePaymentService.getConfig();
	    return ResponseEntity.ok()
			    .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stripeConfig.country))
			    .body(stripeConfig);
    }

	/**
     * POST  /payment-intents : Create a new payment intent.
     *
     * @throws URISyntaxException if the Location URI syntax is incorrect
	 * @return
     */
    @PostMapping("/payment-intents")
    public ResponseEntity<String> createPaymentIntent(@RequestBody String apiJsonString) throws URISyntaxException, StripeException {
        log.debug("REST request to create a Payment Intent for with params : {}", apiJsonString);

	    JsonElement apiJsonElement = JsonParser.parseString(apiJsonString);
	    JsonObject apiJsonObject = apiJsonElement.getAsJsonObject();

	    final Long bountyId = apiJsonObject.get("bountyId").getAsLong();
	    final String paymentMethodId = apiJsonObject.get("paymentMethodId").getAsString();
//	    final String receiptEmail = apiJsonObject.get("receiptEmail").getAsString();
//	    final String currency = apiJsonObject.get("currency").getAsString();

        if (bountyId == null) {
            throw new BadRequestAlertException("Cannot create a payment intent for a non-existent bounty", ENTITY_NAME, "nullid");
        }
        final PaymentIntent paymentIntent = this.stripePaymentService.createPaymentIntent(paymentMethodId, null,
		        bountyId, null);
        return ResponseEntity.created(new URI("/api/payment-intents/" + paymentIntent.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, paymentIntent.getId()))
	        .body(new Gson().toJson(paymentIntent));
    }

    /**
     * GET  /payment-intents/:id : Get Payment intent.
     *
     * @return the ResponseEntity with status 200 (OK) and the payment intent in body
     */
    @GetMapping("/payment-intents/{id}")
    public ResponseEntity<String> getPaymentIntent(@PathVariable final String id) throws StripeException {
        log.debug("REST request to get stripe payment intent");
	    final PaymentIntent paymentIntent =  stripePaymentService.getPaymentIntent(id);
	    return ResponseEntity.ok()
			    .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, id))
			    .body(new Gson().toJson(paymentIntent));
    }

	/**
     * PUT  /payment-intents/:id : Updates an existing payment-intent.
     *
     *
	 * @param id
	 * @param bountyId
	 * @param currency
	 * @param paymentMethods
	 * @return the ResponseEntity with status 200 (OK) and with body the updated payment,
     * or with status 400 (Bad Request) if the payment is not valid,
     * or with status 500 (Internal Server Error) if the payment couldn't be updated
	 */
    @PutMapping("/payment-intents/{id}")
    public ResponseEntity<String> updatePaymentIntent(@PathVariable final String id,
                                                                      @Valid @RequestBody Long bountyId,
                                                                      @PathParam("currency") String currency,
                                                                      @PathParam("payment_methods") List<String> paymentMethods) {

	    log.debug("REST request to update Payment : {}", id);
	    if (id == null) {
		    throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	    }
	    final PaymentIntent paymentIntent = this.stripePaymentService.updatePaymentIntent(id, null, null, bountyId,
			    currency, paymentMethods);
	    return ResponseEntity.ok()
			    .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, id))
			    .body(new Gson().toJson(paymentIntent));
    }

	/**
	 * GET  /payment-intents/:id/confirm : Confirm a payment intent.
	 *
	 *
	 * @param paymentIntentId
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 * @return
	 */
	@GetMapping("/payment-intents/{paymentIntentId}/confirm")
	public ResponseEntity<String> confirmPaymentIntent(@PathVariable final String paymentIntentId) throws URISyntaxException, StripeException {
		log.debug("REST request to create a Payment Intent with params : {}", paymentIntentId);

		if (paymentIntentId == null) {
			throw new BadRequestAlertException("Cannot create a payment intent for a non-existent bounty", ENTITY_NAME, "nullid");
		}
		final PaymentIntent paymentIntent = this.stripePaymentService.confirmPaymentIntent(paymentIntentId);
		return ResponseEntity.created(new URI("/api/payment-intents/" + paymentIntent.getId() + "/confirm"))
				.headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, paymentIntent.getId()))
				.body(new Gson().toJson(paymentIntent));
	}

	/**
	 * POST  /payment-intents : Create a new payment intent.
	 *
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 * @return
	 */
	@PostMapping("/payment-methods")
	public ResponseEntity<String> createPaymentMethod(@RequestBody String apiJsonString) throws URISyntaxException, StripeException {
		JsonElement apiJsonElement = JsonParser.parseString(apiJsonString);
		JsonObject apiJsonObject = apiJsonElement.getAsJsonObject();

		final String cardNumber = apiJsonObject.get("cardNumber").getAsString();
		final String cardExpiryDate = apiJsonObject.get("cardExpiryDate").getAsString();
		final String cardCvcNumber = apiJsonObject.get("cardCvcNumber").getAsString();
		log.debug("REST request to create a Payment Intent for card : {}", cardNumber);
		if (cardNumber == null) {
			throw new BadRequestAlertException("Cannot create a payment method for a non-existent bounty", ENTITY_NAME, "nullid");
		}
		final String responseJson = this.stripePaymentService.createPaymentMethod(cardNumber, cardExpiryDate, cardCvcNumber);

		if (responseJson.indexOf("error") > 0) {
			return ResponseEntity.status(402).body(responseJson);
		}
		return ResponseEntity.created(new URI("/api/payment-methods/" + cardNumber))
				.headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, cardNumber))
				.body(responseJson);
	}

	/**
     * POST  /webhook : Post stripe event webhook.
     *
     * @return the ResponseEntity with status 201 (Created) and with body the new payment, or with status 400 (Bad Request) if the payment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/webhook")
    public ResponseEntity<Object> webhookReceived(@RequestHeader(name = "Stripe-Signature") String stripeSignature,
                                                  @RequestBody String payload) throws StripeException {
        log.debug("REST request to get read stripe webhook");
        Integer responseCode = this.fulfilmentService.fulfill(this.fulfilmentService.verifyAndReturn(payload, stripeSignature));
	    return ResponseEntity.status(responseCode).build();

    }
}
