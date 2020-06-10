package org.muellners.bounties.service.dto;

import com.sun.istack.NotNull;
import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.domain.Funding;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

public class BountiesDTO {

    private Long id;

    private String status;

    @NotNull
    private String url;

    @NotNull
    private BigDecimal amount;

    private String experience;

    private Integer commitment;

    private String category;

    private String keywords;

    private String type;

    private boolean permission;

    private LocalDate expires;

    private Set<String> funding;

    private String issue;

    private String createdBy;

    private Instant createdDate;

    public BountiesDTO(){
        // Empty
    }

    public BountiesDTO(Bounty bounty) {
        this.id = bounty.getId();
        this.status = bounty.getStatus().toString();
        this.amount = bounty.getAmount();
        this.type = bounty.getType().toString();
        this.experience = bounty.getExperience().toString();
        this.commitment = bounty.getCommitment();
        this.category = bounty.getCategory().toString();
        this.keywords = bounty.getKeywords();
        this.permission = bounty.getPermission();
        this.expires = bounty.getExpires();
        this.funding = bounty.getFundings().stream()
            .map(Funding::toString).collect(Collectors.toSet());
        this.issue = bounty.getIssue().toString();
        this.createdBy = bounty.getCreatedBy();
        this.createdDate = bounty.getCreatedDate();

    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BountiesDTO{" +
            "id=" + id +
            ", status='" + status + '\'' +
            ", url='" + url + '\'' +
            ", amount=" + amount +
            ", experience='" + experience + '\'' +
            ", commitment=" + commitment +
            ", category='" + category + '\'' +
            ", keywords='" + keywords + '\'' +
            ", permission=" + permission +
            ", expires=" + expires +
            ", funding=" + funding +
            ", issue='" + issue + '\'' +
            ", createdBy='" + createdBy + '\'' +
            ", createdDate=" + createdDate +
            '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public Integer getCommitment() {
        return commitment;
    }

    public void setCommitment(Integer commitment) {
        this.commitment = commitment;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public boolean isPermission() {
        return permission;
    }

    public void setPermission(boolean permission) {
        this.permission = permission;
    }

    public LocalDate getExpires() {
        return expires;
    }

    public void setExpires(LocalDate expires) {
        this.expires = expires;
    }

    public Set<String> getFunding() {
        return funding;
    }

    public void setFunding(Set<String> funding) {
        this.funding = funding;
    }

    public String getIssue() {
        return issue;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BountiesDTO status(String status) {
        this.status = status;
        return this;
    }

    public BountiesDTO url(String url) {
        this.url = url;
        return this;
    }

    public BountiesDTO amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public BountiesDTO experience(String experience) {
        this.experience = experience;
        return this;
    }

    public BountiesDTO commitment(String commitment) {
        this.status = commitment;
        return this;
    }

    public BountiesDTO type(String type) {
        this.type = type;
        return this;
    }

    public BountiesDTO category(String category) {
        this.category = category;
        return this;
    }

    public BountiesDTO keywords(String keywords) {
        this.keywords = keywords;
        return this;
    }

    public BountiesDTO permission(boolean permission) {
        this.permission = permission;
        return this;
    }

    public BountiesDTO expires(LocalDate expires) {
        this.expires = expires;
        return this;
    }

}
