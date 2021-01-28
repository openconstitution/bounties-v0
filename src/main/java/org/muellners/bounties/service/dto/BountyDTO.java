package org.muellners.bounties.service.dto;

import com.sun.istack.NotNull;
import org.muellners.bounties.domain.Bounty;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class BountyDTO {

    private Long id;

    @NotNull
    private String summary;

    private String description;

    @NotNull
    private String issueUrl;

    private BigDecimal amount;

    private String statusKey;

    private String commitmentKey;

    @NotNull
    private String typeKey;

    @NotNull
    private String categoryKey;

    @NotNull
    private String experienceKey;

    private List<String> keywords;

    private boolean permission;

    @NotNull
    private LocalDate expiryDate;

    @NotNull
    private Set<FundDTO> funds;

    private String hunter;

    private String createdBy;

    private Instant createdDate;

    public BountyDTO(){
        // Empty
    }

    public BountyDTO(final Bounty bounty) {
        this.id = bounty.getId();
        this.summary = bounty.getSummary();
        this.description = bounty.getDescription();
        this.amount = bounty.getAmount();
        this.issueUrl = bounty.getIssue().getUrl();
        this.statusKey = bounty.getStatus().getKey();
        this.commitmentKey = bounty.getCommitment().getKey();
        this.typeKey = bounty.getType().getKey();
        this.categoryKey = bounty.getCategory().getKey();
        this.experienceKey = bounty.getExperience().getKey();
        this.keywords = bounty.getKeywords().stream()
                .map(bountyKeyword -> bountyKeyword.getKeyword())
                .collect(Collectors.toList());
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
            ", issueUrl='" + issueUrl + '\'' +
            ", amount=" + amount +
            ", status='" + statusKey + '\'' +
            ", experience='" + experienceKey + '\'' +
            ", commitment=" + commitmentKey +
            ", category='" + categoryKey + '\'' +
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getStatusKey() {
        return statusKey;
    }

    public void setStatusKey(String statusKey) {
        this.statusKey = statusKey;
    }

    public String getCommitmentKey() {
        return commitmentKey;
    }

    public void setCommitmentKey(String commitmentKey) {
        this.commitmentKey = commitmentKey;
    }

    public String getTypeKey() {
        return typeKey;
    }

    public void setTypeKey(String typeKey) {
        this.typeKey = typeKey;
    }

    public String getCategoryKey() {
        return categoryKey;
    }

    public void setCategoryKey(String categoryKey) {
        this.categoryKey = categoryKey;
    }

    public String getExperienceKey() {
        return experienceKey;
    }

    public void setExperienceKey(String experienceKey) {
        this.experienceKey = experienceKey;
    }

    public boolean isPermission() {
        return permission;
    }

    public void setPermission(final boolean permission) {
        this.permission = permission;
    }

    public Set<FundDTO> getFunds() {
        return funds;
    }

    public BountyDTO addFunds(FundDTO fund) {
        this.funds.add(fund);
        return this;
    }

    public BountyDTO removeFunds(FundDTO fund) {
        this.funds.remove(fund);
        return this;
    }

    public void setFunds(Set<FundDTO> fundings) {
        this.funds = funds;
    }

    public String getHunter() {
        return hunter;
    }

    public void setHunter(String hunter) {
        this.hunter = hunter;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public BountyDTO keywords(final List<String> keywords) {
        this.keywords = keywords;
        return this;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public void setPermission(final Boolean permission) {
        this.permission = permission;
    }

    public BountyDTO permission(final Boolean permission) {
        this.permission = permission;
        return this;
    }

	public Boolean getPermission() {
        return permission;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public BountyDTO expiryDate(final LocalDate expiryDate) {
        this.expiryDate = expiryDate;
        return this;
    }

    public void setExpiryDate(final LocalDate expiryDate) {
        this.expiryDate = expiryDate;
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
