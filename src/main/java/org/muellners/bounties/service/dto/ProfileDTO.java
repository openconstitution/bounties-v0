package org.muellners.bounties.service.dto;

import org.muellners.bounties.domain.Profile;

public class ProfileDTO {

  private Long id;
  private Integer votes;
  private String profilelink;
  private String about;
  private String walletaddress;
  private String githubEmail;
  private String githubOrgName;

  public ProfileDTO() {
    //
  }

  public ProfileDTO(Profile profile) {
    this.id = profile.getId();
    this.votes = profile.getVotes();
    this.profilelink = profile.getProfilelink();
    this.about = profile.getAbout();
    this.walletaddress = profile.getWalletaddress();
    this.githubEmail = profile.getGithubEmail();
    this.githubOrgName = profile.getGithubOrgName();
  }

  public Long getId() { return this.id; }

  public void setId(Long id) { this.id = id; }

  public ProfileDTO votes(Integer votes) {
    this.votes = votes;
    return this;
  }

  public void setVotes(Integer votes) { this.votes = votes; }

  public Integer getVotes() { return votes; }

  public String getProfilelink() { return this.profilelink; }

  public ProfileDTO profilelink(String profilelink) {
    this.profilelink = profilelink;
    return this;
  }

  public void setProfilelink(String profilelink) {
    this.profilelink = profilelink;
  }

  public String getAbout() { return about; }

  public ProfileDTO about(String about) {
    this.about = about;
    return this;
  }

  public void setAbout(String about) { this.about = about; }

  public String getWalletaddress() { return walletaddress; }

  public ProfileDTO walletaddress(String walletaddress) {
    this.walletaddress = walletaddress;
    return this;
  }

  public void setWalletaddress(String walletaddress) {
    this.walletaddress = walletaddress;
  }

  public String getGithubEmail() { return githubEmail; }

  public ProfileDTO githubEmail(String githubEmail) {
    this.githubEmail = githubEmail;
    return this;
  }

  public void setGithubEmail(String githubEmail) {
    this.githubEmail = githubEmail;
  }

  public String getGithubOrgName() { return githubOrgName; }

  public ProfileDTO githubOrgName(String githubOrgName) {
    this.githubOrgName = githubOrgName;
    return this;
  }

  public void setGithubOrgName(String githubOrgName) {
    this.githubOrgName = githubOrgName;
  }
  // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
  // setters here

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof ProfileDTO)) {
      return false;
    }
    return id != null && id.equals(((ProfileDTO)o).id);
  }

  @Override
  public int hashCode() {
    return 31;
  }

  // prettier-ignore
  @Override
  public String toString() {
    return "Profile{"
        + "id=" + getId() + ", votes=" + getVotes() + ", profilelink='" +
        getProfilelink() + "'"
        + ", about='" + getAbout() + "'"
        + ", walletaddress='" + getWalletaddress() + "'"
        + ", githubEmail='" + getGithubEmail() + "'"
        + ", githubOrgName='" + getGithubOrgName() + "'"
        + "}";
  }
}
