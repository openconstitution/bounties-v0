package org.muellners.bounties.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import javax.persistence.*;
import java.io.Serializable;

/**
 * A Profile.
 */
@Entity
@Table(name = "profile")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Profile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "votes")
    private Integer votes;

    @Column(name = "profilelink")
    private String profileLink;

    @Column(name = "about")
    private String about;

    @Column(name = "walletaddress")
    private String walletAddress;

    @Column(name = "github_email")
    private String githubEmail;

    @Column(name = "github_org_name")
    private String githubOrgName;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVotes() {
        return votes;
    }

    public Profile votes(Integer votes) {
        this.votes = votes;
        return this;
    }

    public void setVotes(Integer votes) {
        this.votes = votes;
    }

    public String getProfileLink() {
        return profileLink;
    }

    public Profile profileLink(String profileLink) {
        this.profileLink = profileLink;
        return this;
    }

    public void setProfileLink(String profileLink) {
        this.profileLink = profileLink;
    }

    public String getAbout() {
        return about;
    }

    public Profile about(String about) {
        this.about = about;
        return this;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    public Profile walletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
        return this;
    }
    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public String getGithubEmail() {
        return githubEmail;
    }

    public Profile githubEmail(String githubEmail) {
        this.githubEmail = githubEmail;
        return this;
    }

    public void setGithubEmail(String githubEmail) {
        this.githubEmail = githubEmail;
    }

    public String getGithubOrgName() {
        return githubOrgName;
    }

    public Profile githubOrgName(String githubOrgName) {
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
        if (!(o instanceof Profile)) {
            return false;
        }
        return id != null && id.equals(((Profile) o).id);
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
            ", walletaddress='" + getWalletAddress() + "'" +
            ", githubEmail='" + getGithubEmail() + "'" +
            ", githubOrgName='" + getGithubOrgName() + "'" +
            "}";
    }

}
