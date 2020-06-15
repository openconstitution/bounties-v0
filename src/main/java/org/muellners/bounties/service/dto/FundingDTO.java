package org.muellners.bounties.service.dto;

import java.math.BigDecimal;
import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.domain.Funding;

public class FundingDTO {
  private Long id;

  private BigDecimal amount;

  private String mode;

  private Boolean paymentAuth;

  private Bounty bounty;

  public FundingDTO(Funding funding) {
    this.id = funding.getId();
    this.amount = funding.getAmount();
    this.mode = funding.getMode();
    this.paymentAuth = funding.getPaymentAuth();
    this.bounty = funding.getBounty();
  }

  public Long getId() { return id; }

  public void setId(Long id) { this.id = id; }

  public BigDecimal getAmount() { return amount; }

  public FundingDTO amount(BigDecimal amount) {
    this.amount = amount;
    return this;
  }

  public void setAmount(BigDecimal amount) { this.amount = amount; }

  public String getMode() { return mode; }

  public FundingDTO mode(String mode) {
    this.mode = mode;
    return this;
  }

  public void setMode(String mode) { this.mode = mode; }

  public Boolean isPaymentAuth() { return paymentAuth; }

  public FundingDTO paymentAuth(Boolean paymentAuth) {
    this.paymentAuth = paymentAuth;
    return this;
  }

  public void setPaymentAuth(Boolean paymentAuth) {
    this.paymentAuth = paymentAuth;
  }

  public Boolean getPaymentAuth() { return this.paymentAuth; }

  public Bounty getBounty() { return bounty; }

  public FundingDTO bounty(Bounty bounty) {
    this.bounty = bounty;
    return this;
  }

  public void setBounty(Bounty bounty) { this.bounty = bounty; }
}
