package org.muellners.bounties.service.dto;

import org.muellners.bounties.domain.Profile;

public class ProfileDTO {

    private Long id;
    private Integer votes;
    private String profileLink;
    private String about;
    private String walletAddress;
    private String githubEmail;
    private String githubOrgName;

    public ProfileDTO() {
        //
    }

    public ProfileDTO(Profile profile) {
        this.id = profile.getId();
        this.votes = profile.getVotes();
        this.profileLink = profile.getProfileLink();
        this.about = profile.getAbout();
        this.walletAddress = profile.getWalletAddress();
        this.githubEmail = profile.getGithubEmail();
        this.githubOrgName = profile.getGithubOrgName();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProfileDTO votes(Integer votes) {
        this.votes = votes;
        return this;
    }

    public void setVotes(Integer votes) {
        this.votes = votes;
    }

    public Integer getVotes() {
        return votes;
    }

    public String getProfileLink() {
        return profileLink;
    }

    public void setProfileLink(String profileLink) {
        this.profileLink = profileLink;
    }

    public String getAbout() {
        return about;
    }

    public ProfileDTO about(String about) {
        this.about = about;
        return this;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public String getGithubEmail() {
        return githubEmail;
    }

    public ProfileDTO githubEmail(String githubEmail) {
        this.githubEmail = githubEmail;
        return this;
    }

    public void setGithubEmail(String githubEmail) {
        this.githubEmail = githubEmail;
    }

    public String getGithubOrgName() {
        return githubOrgName;
    }

    public ProfileDTO githubOrgName(String githubOrgName) {
        this.githubOrgName = githubOrgName;
        return this;
    }

    public void setGithubOrgName(String githubOrgName) {
        this.githubOrgName = githubOrgName;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProfileDTO)) {
            return false;
        }
        return id != null && id.equals(((ProfileDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Profile{" +
            "id=" + getId() +
            ", votes=" + getVotes() +
            ", profileLink='" + getProfileLink() + "'" +
            ", about='" + getAbout() + "'" +
            ", walletAddress='" + getWalletAddress() + "'" +
            ", githubEmail='" + getGithubEmail() + "'" +
            ", githubOrgName='" + getGithubOrgName() + "'" +
            "}";
    }

}