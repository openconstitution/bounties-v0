package org.muellners.bounties.service.dto;

import com.sun.istack.NotNull;
import org.muellners.bounties.domain.Bounty;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public class BountyDTO {

    private Long id;

    private String status;

    @NotNull
    private String summary;

    @NotNull
    private String issueUrl;

    @NotNull
    private BigDecimal amount;

    private Integer commitment;

    private List<String> keywords;

    private String type;

    private String category;

    private String experience;

    private boolean permission;

    private LocalDate expiryDate;

    private Set<FundingDTO> fundings;

    private String hunter;

    private String createdBy;

    private Instant createdDate;

    public BountyDTO(){
        // Empty
    }

    public BountyDTO(final Bounty bounty) {
        this.id = bounty.getId();
        this.status = bounty.getStatus().getKey();
        this.summary = bounty.getSummary();
        this.amount = bounty.getAmount();
        this.issueUrl = bounty.getIssueUrl();
        this.commitment = bounty.getCommitment();
        this.type = bounty.getType().getKey();
        this.category = bounty.getCategory().getKey();
        this.experience = bounty.getExperience().getKey();
        this.keywords = bounty.getKeywords();
        this.permission = bounty.getPermission();
        this.expiryDate = bounty.getExpiryDate();
        if (bounty.getHunter() != null) {
            this.hunter = bounty.getHunter().getLogin();
        }
        this.createdBy = bounty.getCreatedBy();
        this.createdDate = bounty.getCreatedDate();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BountyDTO{" +
            "id=" + id +
            ", summary='" + summary + '\'' +
            ", status='" + status + '\'' +
            ", issueUrl='" + issueUrl + '\'' +
            ", amount=" + amount +
            ", experience='" + experience + '\'' +
            ", commitment=" + commitment +
            ", category='" + category + '\'' +
            ", keywords='" + keywords + '\'' +
            ", permission=" + permission +
            ", c=" + expiryDate +
            ", hunter=" + hunter +
            ", createdBy='" + createdBy + '\'' +
            ", createdDate=" + createdDate +
            '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(final String summary) {
        this.summary = summary;
    }

    public String getIssueUrl() {
        return issueUrl;
    }

    public void setIssueUrl(final String issueUrl) {
        this.issueUrl = issueUrl;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(final BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getCommitment() {
        return commitment;
    }

    public void setCommitment(final Integer commitment) {
        this.commitment = commitment;
    }

    public boolean isPermission() {
        return permission;
    }

    public void setPermission(final boolean permission) {
        this.permission = permission;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(final LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Set<FundingDTO> getFundings() {
        return fundings;
    }

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

    public String getHunter() {
        return hunter;
    }

    public void setHunter(String hunter) {
        this.hunter = hunter;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BountyDTO status(final String status) {
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

    public BountyDTO experience(final String experience) {
        this.experience = experience;
        return this;
    }

    public BountyDTO commitment(final Integer commitment) {
        this.commitment = commitment;
        return this;
    }

    public BountyDTO type(final String type) {
        this.type = type;
        return this;
    }

    public BountyDTO category(final String category) {
        this.category = category;
        return this;
    }

    public BountyDTO keywords(final List<String> keywords) {
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

	public Boolean getPermission() {
        return permission;
    }

}
