package org.muellners.bounties.service.dto;

import com.stripe.model.PaymentIntent;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class StripePaymentIntentDTO {
	private String id;
	private Long amount;
	private Long amountCapturable;
	private Long amountReceived;
	private Long applicationFeeAmount;
	private Long canceledAt;
	private String cancellationReason;
	private String captureMethod;
	private List<StripeChargeDTO> charges;
	private String clientSecret;
	private String confirmationMethod;
	private Long created;
	private String currency;
	private String description;
	private Boolean livemode;
	private Map<String, String> metadata;
	private String object;
	private List<String> paymentMethodTypes;
	private String receiptEmail;
	private String setupFutureUsage;
	private HashMap<String, String> shipping;
	private String statementDescriptor;
	private String statementDescriptorSuffix;
	private String status;
	private String transferGroup;

	public StripePaymentIntentDTO(final PaymentIntent paymentIntent) {
		this.id = paymentIntent.getId();
		this.amount = paymentIntent.getAmount();
		this.amountCapturable = paymentIntent.getAmountCapturable();
		this.amountReceived = paymentIntent.getAmountReceived();
		this.applicationFeeAmount = paymentIntent.getApplicationFeeAmount();
		this.canceledAt = paymentIntent.getCanceledAt();
		this.cancellationReason = paymentIntent.getCancellationReason();
		this.captureMethod = paymentIntent.getCaptureMethod();
		this.charges = paymentIntent.getCharges().getData()
									.stream().map(StripeChargeDTO::new)
									.collect(Collectors.toList());
		this.clientSecret = paymentIntent.getClientSecret();
		this.confirmationMethod = paymentIntent.getConfirmationMethod();
		this.created = paymentIntent.getCreated();
		this.currency = paymentIntent.getCurrency();
		this.description = paymentIntent.getDescription();
		this.livemode = paymentIntent.getLivemode();
		this.metadata = paymentIntent.getMetadata();
		this.object = paymentIntent.getObject();
		this.paymentMethodTypes = paymentIntent.getPaymentMethodTypes();
		this.receiptEmail = paymentIntent.getReceiptEmail();
		this.setupFutureUsage = paymentIntent.getSetupFutureUsage();

		this.shipping.put("name", paymentIntent.getShipping().getName());
		this.shipping.put("phone", paymentIntent.getShipping().getPhone());
		this.shipping.put("carrier", paymentIntent.getShipping().getCarrier());
		this.shipping.put("address", paymentIntent.getShipping().getAddress().toString());
		this.shipping.put("trackingNumber", paymentIntent.getShipping().getTrackingNumber());

		this.statementDescriptor = paymentIntent.getStatementDescriptor();
		this.statementDescriptorSuffix = paymentIntent.getStatementDescriptorSuffix();
		this.status = paymentIntent.getStatus();
		this.transferGroup = paymentIntent.getTransferGroup();
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

	public Long getAmountCapturable() {
		return amountCapturable;
	}

	public void setAmountCapturable(Long amountCapturable) {
		this.amountCapturable = amountCapturable;
	}

	public Long getAmountReceived() {
		return amountReceived;
	}

	public void setAmountReceived(Long amountReceived) {
		this.amountReceived = amountReceived;
	}

	public Long getApplicationFeeAmount() {
		return applicationFeeAmount;
	}

	public void setApplicationFeeAmount(Long applicationFeeAmount) {
		this.applicationFeeAmount = applicationFeeAmount;
	}

	public Long getCanceledAt() {
		return canceledAt;
	}

	public void setCanceledAt(Long canceledAt) {
		this.canceledAt = canceledAt;
	}

	public String getCancellationReason() {
		return cancellationReason;
	}

	public void setCancellationReason(String cancellationReason) {
		this.cancellationReason = cancellationReason;
	}

	public String getCaptureMethod() {
		return captureMethod;
	}

	public void setCaptureMethod(String captureMethod) {
		this.captureMethod = captureMethod;
	}

	public List<StripeChargeDTO> getCharges() {
		return charges;
	}

	public void setCharges(List<StripeChargeDTO> charges) {
		this.charges = charges;
	}

	public String getClientSecret() {
		return clientSecret;
	}

	public void setClientSecret(String clientSecret) {
		this.clientSecret = clientSecret;
	}

	public String getConfirmationMethod() {
		return confirmationMethod;
	}

	public void setConfirmationMethod(String confirmationMethod) {
		this.confirmationMethod = confirmationMethod;
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

	public List<String> getPaymentMethodTypes() {
		return paymentMethodTypes;
	}

	public void setPaymentMethodTypes(List<String> paymentMethodTypes) {
		this.paymentMethodTypes = paymentMethodTypes;
	}

	public String getReceiptEmail() {
		return receiptEmail;
	}

	public void setReceiptEmail(String receiptEmail) {
		this.receiptEmail = receiptEmail;
	}

	public String getSetupFutureUsage() {
		return setupFutureUsage;
	}

	public void setSetupFutureUsage(String setupFutureUsage) {
		this.setupFutureUsage = setupFutureUsage;
	}

	public HashMap<String, String> getShipping() {
		return shipping;
	}

	public void setShipping(HashMap<String, String> shipping) {
		this.shipping = shipping;
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
		if (!(o instanceof StripePaymentIntentDTO)) return false;
		StripePaymentIntentDTO that = (StripePaymentIntentDTO) o;
		return Objects.equals(getId(), that.getId()) &&
				Objects.equals(getAmount(), that.getAmount()) &&
				Objects.equals(getAmountCapturable(), that.getAmountCapturable()) &&
				Objects.equals(getAmountReceived(), that.getAmountReceived()) &&
				Objects.equals(getApplicationFeeAmount(), that.getApplicationFeeAmount()) &&
				Objects.equals(getCanceledAt(), that.getCanceledAt()) &&
				Objects.equals(getCancellationReason(), that.getCancellationReason()) &&
				Objects.equals(getCaptureMethod(), that.getCaptureMethod()) &&
				Objects.equals(getCharges(), that.getCharges()) &&
				Objects.equals(getClientSecret(), that.getClientSecret()) &&
				Objects.equals(getConfirmationMethod(), that.getConfirmationMethod()) &&
				Objects.equals(getCreated(), that.getCreated()) &&
				Objects.equals(getCurrency(), that.getCurrency()) &&
				Objects.equals(getDescription(), that.getDescription()) &&
				Objects.equals(getLivemode(), that.getLivemode()) &&
				Objects.equals(getMetadata(), that.getMetadata()) &&
				Objects.equals(getObject(), that.getObject()) &&
				Objects.equals(getPaymentMethodTypes(), that.getPaymentMethodTypes()) &&
				Objects.equals(getReceiptEmail(), that.getReceiptEmail()) &&
				Objects.equals(getSetupFutureUsage(), that.getSetupFutureUsage()) &&
				Objects.equals(getShipping(), that.getShipping()) &&
				Objects.equals(getStatementDescriptor(), that.getStatementDescriptor()) &&
				Objects.equals(getStatementDescriptorSuffix(), that.getStatementDescriptorSuffix()) &&
				Objects.equals(getStatus(), that.getStatus()) &&
				Objects.equals(getTransferGroup(), that.getTransferGroup());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId(), getAmount(), getAmountCapturable(), getAmountReceived(), getApplicationFeeAmount(), getCanceledAt(), getCancellationReason(), getCaptureMethod(), getCharges(), getClientSecret(), getConfirmationMethod(), getCreated(), getCurrency(), getDescription(), getLivemode(), getMetadata(), getObject(), getPaymentMethodTypes(), getReceiptEmail(), getSetupFutureUsage(), getShipping(), getStatementDescriptor(), getStatementDescriptorSuffix(), getStatus(), getTransferGroup());
	}

	@Override
	public String toString() {
		return "StripePaymentIntentDTO{" +
				"id='" + id + '\'' +
				", amount=" + amount +
				", amountCapturable=" + amountCapturable +
				", amountReceived=" + amountReceived +
				", applicationFeeAmount=" + applicationFeeAmount +
				", canceledAt=" + canceledAt +
				", cancellationReason='" + cancellationReason + '\'' +
				", captureMethod='" + captureMethod + '\'' +
				", charges=" + charges +
				", clientSecret='" + clientSecret + '\'' +
				", confirmationMethod='" + confirmationMethod + '\'' +
				", created=" + created +
				", currency='" + currency + '\'' +
				", description='" + description + '\'' +
				", livemode=" + livemode +
				", metadata=" + metadata +
				", object='" + object + '\'' +
				", paymentMethodTypes=" + paymentMethodTypes +
				", receiptEmail='" + receiptEmail + '\'' +
				", setupFutureUsage='" + setupFutureUsage + '\'' +
				", shipping=" + shipping +
				", statementDescriptor='" + statementDescriptor + '\'' +
				", statementDescriptorSuffix='" + statementDescriptorSuffix + '\'' +
				", status='" + status + '\'' +
				", transferGroup='" + transferGroup + '\'' +
				'}';
	}
}
