package org.muellners.bounties.service.dto;

import com.stripe.model.Charge;
import java.util.Map;
import java.util.Objects;

public class StripeChargeDTO {
	private String id;
	private Long amount;
	private Long amountCaptured;
	private Long amountRefunded;
	private Long applicationFeeAmount;
	private String authorizationCode;
	private String calculatedStatementDescriptor;
	private Boolean captured;
	private Long created;
	private String currency;
	private String description;
	private Boolean disputed;
	private String failureCode;
	private String failureMessage;
	private Boolean livemode;
	private Map<String, String> metadata;
	private String object;
	private Boolean paid;
	private String paymentMethod;
	private String receiptEmail;
	private String receiptNumber;
	private String receiptUrl;
	private Boolean refunded;
	private String statementDescriptor;
	private String statementDescriptorSuffix;
	private String status;
	private String transferGroup;

	public StripeChargeDTO(final Charge charge) {
		this.id = charge.getId();
		this.amount = charge.getAmount();
		this.amountCaptured = charge.getAmountCaptured();
		this.amountRefunded = charge.getAmountRefunded();
		this.applicationFeeAmount = charge.getApplicationFeeAmount();
		this.authorizationCode = charge.getAuthorizationCode();
		this.calculatedStatementDescriptor = charge.getCalculatedStatementDescriptor();
		this.captured = charge.getCaptured();
		this.created = charge.getCreated();
		this.currency = charge.getCurrency();
		this.description = charge.getDescription();
		this.disputed = charge.getDisputed();
		this.failureCode = charge.getFailureCode();
		this.failureMessage = charge.getFailureMessage();
		this.livemode = charge.getLivemode();
		this.metadata = charge.getMetadata();
		this.object = charge.getObject();
		this.paid = charge.getPaid();
		this.paymentMethod = charge.getPaymentMethod();
		this.receiptEmail = charge.getReceiptEmail();
		this.receiptNumber = charge.getReceiptNumber();
		this.receiptUrl = charge.getReceiptUrl();
		this.refunded = charge.getRefunded();
		this.statementDescriptor = charge.getStatementDescriptor();
		this.statementDescriptorSuffix = charge.getStatementDescriptorSuffix();
		this.status = charge.getStatus();
		this.transferGroup = charge.getTransferGroup();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Long getAmount() {
		return amount;
	}

	public void setAmount(Long amount) {
		this.amount = amount;
	}

	public Long getAmountCaptured() {
		return amountCaptured;
	}

	public void setAmountCaptured(Long amountCaptured) {
		this.amountCaptured = amountCaptured;
	}

	public Long getAmountRefunded() {
		return amountRefunded;
	}

	public void setAmountRefunded(Long amountRefunded) {
		this.amountRefunded = amountRefunded;
	}

	public Long getApplicationFeeAmount() {
		return applicationFeeAmount;
	}

	public void setApplicationFeeAmount(Long applicationFeeAmount) {
		this.applicationFeeAmount = applicationFeeAmount;
	}

	public String getAuthorizationCode() {
		return authorizationCode;
	}

	public void setAuthorizationCode(String authorizationCode) {
		this.authorizationCode = authorizationCode;
	}

	public String getCalculatedStatementDescriptor() {
		return calculatedStatementDescriptor;
	}

	public void setCalculatedStatementDescriptor(String calculatedStatementDescriptor) {
		this.calculatedStatementDescriptor = calculatedStatementDescriptor;
	}

	public Boolean getCaptured() {
		return captured;
	}

	public void setCaptured(Boolean captured) {
		this.captured = captured;
	}

	public Long getCreated() {
		return created;
	}

	public void setCreated(Long created) {
		this.created = created;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getDisputed() {
		return disputed;
	}

	public void setDisputed(Boolean disputed) {
		this.disputed = disputed;
	}

	public String getFailureCode() {
		return failureCode;
	}

	public void setFailureCode(String failureCode) {
		this.failureCode = failureCode;
	}

	public String getFailureMessage() {
		return failureMessage;
	}

	public void setFailureMessage(String failureMessage) {
		this.failureMessage = failureMessage;
	}

	public Boolean getLivemode() {
		return livemode;
	}

	public void setLivemode(Boolean livemode) {
		this.livemode = livemode;
	}

	public Map<String, String> getMetadata() {
		return metadata;
	}

	public void setMetadata(Map<String, String> metadata) {
		this.metadata = metadata;
	}

	public String getObject() {
		return object;
	}

	public void setObject(String object) {
		this.object = object;
	}

	public Boolean getPaid() {
		return paid;
	}

	public void setPaid(Boolean paid) {
		this.paid = paid;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getReceiptEmail() {
		return receiptEmail;
	}

	public void setReceiptEmail(String receiptEmail) {
		this.receiptEmail = receiptEmail;
	}

	public String getReceiptNumber() {
		return receiptNumber;
	}

	public void setReceiptNumber(String receiptNumber) {
		this.receiptNumber = receiptNumber;
	}

	public String getReceiptUrl() {
		return receiptUrl;
	}

	public void setReceiptUrl(String receiptUrl) {
		this.receiptUrl = receiptUrl;
	}

	public Boolean getRefunded() {
		return refunded;
	}

	public void setRefunded(Boolean refunded) {
		this.refunded = refunded;
	}

	public String getStatementDescriptor() {
		return statementDescriptor;
	}

	public void setStatementDescriptor(String statementDescriptor) {
		this.statementDescriptor = statementDescriptor;
	}

	public String getStatementDescriptorSuffix() {
		return statementDescriptorSuffix;
	}

	public void setStatementDescriptorSuffix(String statementDescriptorSuffix) {
		this.statementDescriptorSuffix = statementDescriptorSuffix;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTransferGroup() {
		return transferGroup;
	}

	public void setTransferGroup(String transferGroup) {
		this.transferGroup = transferGroup;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof StripeChargeDTO)) return false;
		StripeChargeDTO that = (StripeChargeDTO) o;
		return Objects.equals(id, that.id) &&
				Objects.equals(amount, that.amount) &&
				Objects.equals(amountCaptured, that.amountCaptured) &&
				Objects.equals(amountRefunded, that.amountRefunded) &&
				Objects.equals(applicationFeeAmount, that.applicationFeeAmount) &&
				Objects.equals(authorizationCode, that.authorizationCode) &&
				Objects.equals(calculatedStatementDescriptor, that.calculatedStatementDescriptor) &&
				Objects.equals(captured, that.captured) &&
				Objects.equals(created, that.created) &&
				Objects.equals(currency, that.currency) &&
				Objects.equals(description, that.description) &&
				Objects.equals(disputed, that.disputed) &&
				Objects.equals(failureCode, that.failureCode) &&
				Objects.equals(failureMessage, that.failureMessage) &&
				Objects.equals(livemode, that.livemode) &&
				Objects.equals(metadata, that.metadata) &&
				Objects.equals(object, that.object) &&
				Objects.equals(paid, that.paid) &&
				Objects.equals(paymentMethod, that.paymentMethod) &&
				Objects.equals(receiptEmail, that.receiptEmail) &&
				Objects.equals(receiptNumber, that.receiptNumber) &&
				Objects.equals(receiptUrl, that.receiptUrl) &&
				Objects.equals(refunded, that.refunded) &&
				Objects.equals(statementDescriptor, that.statementDescriptor) &&
				Objects.equals(statementDescriptorSuffix, that.statementDescriptorSuffix) &&
				Objects.equals(status, that.status) &&
				Objects.equals(transferGroup, that.transferGroup);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, amount, amountCaptured, amountRefunded, applicationFeeAmount, authorizationCode, calculatedStatementDescriptor, captured, created, currency, description, disputed, failureCode, failureMessage, livemode, metadata, object, paid, paymentMethod, receiptEmail, receiptNumber, receiptUrl, refunded, statementDescriptor, statementDescriptorSuffix, status, transferGroup);
	}

	@Override
	public String toString() {
		return "StripeChargeDTO{" +
				"id='" + id + '\'' +
				", amount=" + amount +
				", amountCaptured=" + amountCaptured +
				", amountRefunded=" + amountRefunded +
				", applicationFeeAmount=" + applicationFeeAmount +
				", authorizationCode='" + authorizationCode + '\'' +
				", calculatedStatementDescriptor='" + calculatedStatementDescriptor + '\'' +
				", captured=" + captured +
				", created=" + created +
				", currency='" + currency + '\'' +
				", description='" + description + '\'' +
				", disputed=" + disputed +
				", failureCode='" + failureCode + '\'' +
				", failureMessage='" + failureMessage + '\'' +
				", livemode=" + livemode +
				", metadata=" + metadata +
				", object='" + object + '\'' +
				", paid=" + paid +
				", paymentMethod='" + paymentMethod + '\'' +
				", receiptEmail='" + receiptEmail + '\'' +
				", receiptNumber='" + receiptNumber + '\'' +
				", receiptUrl='" + receiptUrl + '\'' +
				", refunded=" + refunded +
				", statementDescriptor='" + statementDescriptor + '\'' +
				", statementDescriptorSuffix='" + statementDescriptorSuffix + '\'' +
				", status='" + status + '\'' +
				", transferGroup='" + transferGroup + '\'' +
				'}';
	}
}
