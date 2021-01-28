package org.muellners.bounties.service.criteria;

import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BigDecimalFilter;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

import java.io.Serializable;

/**
 * Criteria class for the [cm.pwork.schoolman.domain.Option] entity. This class is used in
 * [cm.pwork.schoolman.web.rest.OptionResource] to receive all the possible filtering options from the
 * Http GET request parameters.
 * For example the following could be a valid request:
 * ```/options?id.greaterThan=5&attr1.contains=something&attr2.specified=false```
 * As Spring is unable to properly convert the types, unless specific [Filter] class are used, we need to use
 * fix type specific filters.
 */
public class FundCriteria implements Serializable, Criteria {

	private static final long serialVersionUID = 1L;

	private LongFilter id;
	private BigDecimalFilter amount;
	private StringFilter mode;
	private StringFilter paymentIntentId;
	private BooleanFilter paymentAuth;

	public FundCriteria(final FundCriteria other) {
		other.id.copy();
		other.amount.copy();
		other.mode.copy();
		other.paymentIntentId.copy();
		other.paymentAuth.copy();
	}

	public LongFilter getId() {
		return id;
	}

	public void setId(LongFilter id) {
		this.id = id;
	}

	public BigDecimalFilter getAmount() {
		return amount;
	}

	public void setAmount(BigDecimalFilter amount) {
		this.amount = amount;
	}

	public StringFilter getMode() {
		return mode;
	}

	public void setMode(StringFilter mode) {
		this.mode = mode;
	}

	public StringFilter getPaymentIntentId() {
		return paymentIntentId;
	}

	public void setPaymentIntentId(StringFilter paymentIntentId) {
		this.paymentIntentId = paymentIntentId;
	}

	public BooleanFilter getPaymentAuth() {
		return paymentAuth;
	}

	public void setPaymentAuth(BooleanFilter paymentAuth) {
		this.paymentAuth = paymentAuth;
	}

	@Override
	public Criteria copy() {
		return new FundCriteria(this);
	}
}
