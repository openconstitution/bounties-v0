package org.muellners.bounties.service.dto;

import com.sun.istack.NotNull;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;
import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.domain.enumeration.Category;
import org.muellners.bounties.domain.enumeration.Experience;
import org.muellners.bounties.domain.enumeration.Status;
import org.muellners.bounties.domain.enumeration.Type;

public class BountyDTO {

  private Long id;

  private Status status;

  @NotNull private String summary;

  @NotNull private String issueUrl;

  @NotNull private BigDecimal amount;

  private Experience experience;

  private Integer commitment;

  private Category category;

  private String keywords;

  private Type type;

  private boolean permission;

  private LocalDate expiryDate;

  private Set<FundingDTO> fundings;

  private String createdBy;

  private Instant createdDate;

  public BountyDTO() {
    // Empty
  }

  public BountyDTO(final Bounty bounty) {
    this.id = bounty.getId();
    this.status = bounty.getStatus();
    this.summary = bounty.getSummary();
    this.amount = bounty.getAmount();
    this.issueUrl = bounty.getIssueUrl();
    this.type = bounty.getType();
    this.experience = bounty.getExperience();
    this.commitment = bounty.getCommitment();
    this.category = bounty.getCategory();
    this.keywords = bounty.getKeywords();
    this.permission = bounty.getPermission();
    this.expiryDate = bounty.getExpiryDate();
    this.createdBy = bounty.getCreatedBy();
    this.createdDate = bounty.getCreatedDate();
  }

  // prettier-ignore
  @Override
  public String toString() {
    return "BountyDTO{"
        + "id=" + id + ", summary='" + summary + '\'' + ", status='" + status +
        '\'' + ", issueUrl='" + issueUrl + '\'' + ", amount=" + amount +
        ", experience='" + experience + '\'' + ", commitment=" + commitment +
        ", category='" + category + '\'' + ", keywords='" + keywords + '\'' +
        ", permission=" + permission + ", expiryDate=" + expiryDate +
        ", createdBy='" + createdBy + '\'' + ", createdDate=" + createdDate +
        '}';
  }

  public Long getId() { return id; }

  public void setId(final Long id) { this.id = id; }

  public String getSummary() { return summary; }

  public void setSummary(final String summary) { this.summary = summary; }

  public Status getStatus() { return status; }

  public void setStatus(final Status status) { this.status = status; }

  public String getIssueUrl() { return issueUrl; }

  public void setIssueUrl(final String issueUrl) { this.issueUrl = issueUrl; }

  public BigDecimal getAmount() { return amount; }

  public void setAmount(final BigDecimal amount) { this.amount = amount; }

  public Experience getExperience() { return experience; }

  public void setExperience(final Experience experience) {
    this.experience = experience;
  }

  public Integer getCommitment() { return commitment; }

  public void setCommitment(final Integer commitment) {
    this.commitment = commitment;
  }

  public Category getCategory() { return category; }

  public void setCategory(final Category category) { this.category = category; }

  public String getKeywords() { return keywords; }

  public void setKeywords(final String keywords) { this.keywords = keywords; }

  public boolean isPermission() { return permission; }

  public void setPermission(final boolean permission) {
    this.permission = permission;
  }

  public LocalDate getExpiryDate() { return expiryDate; }

  public void setExpiryDate(final LocalDate expiryDate) {
    this.expiryDate = expiryDate;
  }

  public Set<FundingDTO> getFundings() { return fundings; }

  public BountyDTO addFundings(FundingDTO funding) {
    this.fundings.add(funding);
    return this;
  }

  public BountyDTO removeFundings(FundingDTO funding) {
    this.fundings.remove(funding);
    return this;
  }

  public void setFundings(Set<FundingDTO> fundings) {
    this.fundings = fundings;
  }

  public String getCreatedBy() { return createdBy; }

  public void setCreatedBy(final String createdBy) {
    this.createdBy = createdBy;
  }

  public Instant getCreatedDate() { return createdDate; }

  public void setCreatedDate(final Instant createdDate) {
    this.createdDate = createdDate;
  }

  public Type getType() { return type; }

  public void setType(final Type type) { this.type = type; }

  public BountyDTO status(final Status status) {
    this.status = status;
    return this;
  }

  public BountyDTO issueUrl(final String issueUrl) {
    this.issueUrl = issueUrl;
    return this;
  }

  public BountyDTO amount(final BigDecimal amount) {
    this.amount = amount;
    return this;
  }

  public BountyDTO experience(final Experience experience) {
    this.experience = experience;
    return this;
  }

  public BountyDTO commitment(final Integer commitment) {
    this.commitment = commitment;
    return this;
  }

  public BountyDTO type(final Type type) {
    this.type = type;
    return this;
  }

  public BountyDTO category(final Category category) {
    this.category = category;
    return this;
  }

  public BountyDTO keywords(final String keywords) {
    this.keywords = keywords;
    return this;
  }

  public BountyDTO permission(final boolean permission) {
    this.permission = permission;
    return this;
  }

  public BountyDTO expiryDate(final LocalDate expiryDate) {
    this.expiryDate = expiryDate;
    return this;
  }

  public BountyDTO permission(final Boolean permission) {
    this.permission = permission;
    return this;
  }

  public void setPermission(final Boolean permission) {
    this.permission = permission;
  }

  public Boolean getPermission() { return permission; }
}
