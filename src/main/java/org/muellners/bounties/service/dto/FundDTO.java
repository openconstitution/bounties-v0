package org.muellners.bounties.service.dto;

import java.math.BigDecimal;
import java.time.Instant;

import org.muellners.bounties.domain.Fund;

public class FundDTO {
    private Long id;

    private BigDecimal amount;

    private String mode;

    private Boolean paymentAuth;

    private String createdBy;

    private Instant createdDate;

    public FundDTO() {
        //
    }

    public FundDTO(Fund fund) {
        this.id = fund.getId();
        this.amount = fund.getAmount();
        this.mode = fund.getMode();
        this.paymentAuth = fund.getPaymentAuth();
        this.createdBy = fund.getCreatedBy();
        this.createdDate = fund.getCreatedDate();
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public FundDTO amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getMode() {
        return mode;
    }

    public FundDTO mode(String mode) {
        this.mode = mode;
        return this;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public Boolean isPaymentAuth() {
        return paymentAuth;
    }

    public FundDTO paymentAuth(Boolean paymentAuth) {
        this.paymentAuth = paymentAuth;
        return this;
    }

    public void setPaymentAuth(Boolean paymentAuth) {
        this.paymentAuth = paymentAuth;
    }

    public Boolean getPaymentAuth() {
        return this.paymentAuth;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final Instant createdDate) {
        this.createdDate = createdDate;
    }
}
