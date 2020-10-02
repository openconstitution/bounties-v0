package org.muellners.bounties.service.dto;

import com.sun.istack.NotNull;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.domain.Funding;
import org.muellners.bounties.domain.Issue;
import org.muellners.bounties.domain.enumeration.Category;
import org.muellners.bounties.domain.enumeration.Experience;
import org.muellners.bounties.domain.enumeration.Status;
import org.muellners.bounties.domain.enumeration.Type;

public class BountyDTO {

  private Long id;

  private Status status;

  @NotNull private String summary;

  private String description;

  @NotNull private String url;

  @NotNull private String summary;

  @NotNull private String description;

  @NotNull private BigDecimal amount;

  private Experience experience;

  private Integer commitment;

  private Category category;

  private String keywords;

  private Type type;

  private boolean permission;

  private LocalDate expires;

  private Set<Funding> funding;

  private String createdBy;

  private Instant createdDate;

  public BountyDTO() {
    // Empty
  }

  public BountyDTO(final Bounty bounty) {
    this.id = bounty.getId();
    this.status = bounty.getStatus();
    this.summary = bounty.getSummary();
    this.description = bounty.getDescription();
    this.amount = bounty.getAmount();
    this.url = bounty.getIssue().getUrl();
    this.summary = bounty.getSummary();
    this.description = bounty.getDescription();
    this.type = bounty.getType();
    this.experience = bounty.getExperience();
    this.commitment = bounty.getCommitment();
    this.category = bounty.getCategory();
    this.keywords = bounty.getKeywords();
    this.permission = bounty.getPermission();
    this.expires = bounty.getExpires();
    this.funding = bounty.getFundings();
    this.createdBy = bounty.getCreatedBy();
    this.createdDate = bounty.getCreatedDate();
  }

  // prettier-ignore
  @Override
  public String toString() {
    return "BountyDTO{"
        + "id=" + id + ", summary='" + summary + '\'' + ", description='" +
        description + '\'' + ", status='" + status + '\'' + ", url='" + url +
        '\'' + ", amount=" + amount + ", experience='" + experience + '\'' +
        ", commitment=" + commitment + ", category='" + category + '\'' +
        ", keywords='" + keywords + '\'' + ", permission=" + permission +
        ", expires=" + expires + ", funding=" + funding + ", createdBy='" +
        createdBy + '\'' + ", createdDate=" + createdDate + '}';
  }

  public Long getId() { return id; }

  public void setId(final Long id) { this.id = id; }

  public String getSummary() { return summary; }

  public void setSummary(final String summary) { this.summary = summary; }

  public String getDescription() { return description; }

  public void setDescription(final String description) {
    this.description = description;
  }

  public Status getStatus() { return status; }

  public void setStatus(final Status status) { this.status = status; }

  public String getUrl() { return url; }

  public String getSummary() { return summary; }

  public void setSummary(String summary) { this.summary = summary; }

  public String getDescription() { return description; }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setUrl(final String url) { this.url = url; }

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

  public LocalDate getExpires() { return expires; }

  public void setExpires(final LocalDate expires) { this.expires = expires; }

  public Set<Funding> getFunding() { return funding; }

  public void setFundingIds(final Set<Funding> funding) {
    this.funding = funding;
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

  public BountyDTO url(final String url) {
    this.url = url;
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

  public BountyDTO expires(final LocalDate expires) {
    this.expires = expires;
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
