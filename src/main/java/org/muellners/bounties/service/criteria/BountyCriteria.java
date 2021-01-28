package org.muellners.bounties.service.criteria;

import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BigDecimalFilter;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.LocalDateFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

import java.io.Serializable;
import java.util.List;

/**
 * Criteria class for the [cm.pwork.schoolman.domain.Option] entity. This class is used in
 * [cm.pwork.schoolman.web.rest.OptionResource] to receive all the possible filtering options from the
 * Http GET request parameters.
 * For example the following could be a valid request:
 * ```/options?id.greaterThan=5&attr1.contains=something&attr2.specified=false```
 * As Spring is unable to properly convert the types, unless specific [Filter] class are used, we need to use
 * fix type specific filters.
 */
public class BountyCriteria implements Serializable, Criteria {

	private static final long serialVersionUID = 1L;

	private LongFilter id;
	private StringFilter summary;
	private StringFilter description;
	private BigDecimalFilter amount;
	private LongFilter issueId;
	private LongFilter statusId;
	private LongFilter commitmentId;
	private LongFilter categoryId;
	private LongFilter typeId;
	private LongFilter experienceId;
	private BooleanFilter permission;
	private LocalDateFilter expiryDate;
	private LongFilter fundsId;
	private LongFilter hunterId;
	private LongFilter keywordsId;

	public BountyCriteria(final BountyCriteria other) {
		other.id.copy();
		other.summary.copy();
		other.description.copy();
		other.amount.copy();
		other.issueId.copy();
		other.statusId.copy();
		other.commitmentId.copy();
		other.categoryId.copy();
		other.typeId.copy();
		other.experienceId.copy();
		other.permission.copy();
		other.expiryDate.copy();
		other.fundsId.copy();
		other.hunterId.copy();
		other.keywordsId.copy();
	}

	public LongFilter getId() {
		return id;
	}

	public void setId(LongFilter id) {
		this.id = id;
	}

	public StringFilter getSummary() {
		return summary;
	}

	public void setSummary(StringFilter summary) {
		this.summary = summary;
	}

	public StringFilter getDescription() {
		return description;
	}

	public void setDescription(StringFilter description) {
		this.description = description;
	}

	public BigDecimalFilter getAmount() {
		return amount;
	}

	public void setAmount(BigDecimalFilter amount) {
		this.amount = amount;
	}

	public LongFilter getIssueId() {
		return issueId;
	}

	public void setIssueId(LongFilter issueId) {
		this.issueId = issueId;
	}

	public LongFilter getStatusId() {
		return statusId;
	}

	public void setStatusId(LongFilter statusId) {
		this.statusId = statusId;
	}

	public LongFilter getCommitmentId() {
		return commitmentId;
	}

	public void setCommitmentId(LongFilter commitmentId) {
		this.commitmentId = commitmentId;
	}

	public LongFilter getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(LongFilter categoryId) {
		this.categoryId = categoryId;
	}

	public LongFilter getTypeId() {
		return typeId;
	}

	public void setTypeId(LongFilter typeId) {
		this.typeId = typeId;
	}

	public LongFilter getExperienceId() {
		return experienceId;
	}

	public void setExperienceId(LongFilter experienceId) {
		this.experienceId = experienceId;
	}

	public BooleanFilter getPermission() {
		return permission;
	}

	public void setPermission(BooleanFilter permission) {
		this.permission = permission;
	}

	public LocalDateFilter getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(LocalDateFilter expiryDate) {
		this.expiryDate = expiryDate;
	}

	public LongFilter getFundsId() {
		return fundsId;
	}

	public void setFundsId(LongFilter fundsId) {
		this.fundsId = fundsId;
	}

	public LongFilter getHunterId() {
		return hunterId;
	}

	public void setHunterId(LongFilter hunterId) {
		this.hunterId = hunterId;
	}

	public LongFilter getKeywordsId() {
		return keywordsId;
	}

	public void setKeywordsId(LongFilter keywordsId) {
		this.keywordsId = keywordsId;
	}

	@Override
	public Criteria copy() {
		return new BountyCriteria(this);
	}
}
