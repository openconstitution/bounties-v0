package org.muellners.bounties.web.rest;

import com.stripe.model.PaymentIntent;
import io.github.jhipster.web.util.HeaderUtil;
import org.muellners.bounties.service.FulfilmentService;
import org.muellners.bounties.service.StripePaymentService;
import org.muellners.bounties.service.dto.BountyDTO;
import org.muellners.bounties.service.dto.StripeConfig;
import org.muellners.bounties.service.dto.StripePaymentIntentDTO;
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

	private final FulfilmentService fulfilmentService;

	public StripePaymentResource(final StripePaymentService stripePaymentService,
	                             final FulfilmentService fulfilmentService) {
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
    public ResponseEntity<StripePaymentIntentDTO> createPaymentIntent(@PathParam("bounty") String bountyId) throws URISyntaxException, StripeException {
        log.debug("REST request to create a Payment Intent for bounty : {}", bountyId);
        if (bountyId == null) {
            throw new BadRequestAlertException("Cannot create a payment intent for a non-existent bounty", ENTITY_NAME, "nullid");
        }
        final PaymentIntent paymentIntent = this.stripePaymentService.createPaymentIntent(Long.valueOf(bountyId));
        return ResponseEntity.created(new URI("/api/payment-intents/" + paymentIntent.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, paymentIntent.getId()))
	        .body(new StripePaymentIntentDTO(paymentIntent));
    }

    /**
     * GET  /payment-intents/:id : Get Payment intent.
     *
     * @return the ResponseEntity with status 200 (OK) and the payment intent in body
     */
    @GetMapping("/payment-intents/{id}")
    public ResponseEntity<StripePaymentIntentDTO> getPaymentIntent(@PathVariable final String id) throws StripeException {
        log.debug("REST request to get stripe payment intent");
	    final PaymentIntent paymentIntent =  stripePaymentService.getPaymentIntent(id);
	    return ResponseEntity.ok()
			    .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, id))
			    .body(new StripePaymentIntentDTO(paymentIntent));
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
    public ResponseEntity<StripePaymentIntentDTO> updatePaymentIntent(@PathVariable final String id,
                                                                      @Valid @RequestBody Long bountyId,
                                                                      @PathParam("currency") String currency,
                                                                      @PathParam("payment_methods") List<String> paymentMethods) {

	    log.debug("REST request to update Payment : {}", id);
	    if (id == null) {
		    throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	    }
	    final PaymentIntent paymentIntent = this.stripePaymentService.updatePaymentIntent(id, bountyId,
			    currency, paymentMethods);
	    return ResponseEntity.ok()
			    .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, id))
			    .body(new StripePaymentIntentDTO(paymentIntent));
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
