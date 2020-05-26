package org.muellners.bounties.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.muellners.bounties.domain.enumeration.Status;

import org.muellners.bounties.domain.enumeration.Experience;

import org.muellners.bounties.domain.enumeration.Type;

import org.muellners.bounties.domain.enumeration.Category;
import org.muellners.bounties.security.SecurityUtils;
import org.muellners.bounties.web.rest.errors.BadRequestAlertException;

/**
 * A Bounties.
 */
@Entity
@Table(name = "bounties")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "bounties")
public class Bounties extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "url")
    private String url;

    @Column(name = "amount", precision = 21, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "experience")
    private Experience experience;

    @Column(name = "commitment")
    private Integer commitment;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private Type type;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Column(name = "keywords")
    private String keywords;

    @Column(name = "permission")
    private Boolean permission;

    @Column(name = "expires")
    private LocalDate expires;

    @OneToMany(mappedBy = "bounties")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Funding> fundings = new HashSet<>();
    

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public Bounties status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getUrl() {
        return url;
    }

    public Bounties url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Bounties amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Experience getExperience() {
        return experience;
    }

    public Bounties experience(Experience experience) {
        this.experience = experience;
        return this;
    }

    public void setExperience(Experience experience) {
        this.experience = experience;
    }

    public Integer getCommitment() {
        return commitment;
    }

    public Bounties commitment(Integer commitment) {
        this.commitment = commitment;
        return this;
    }

    public void setCommitment(Integer commitment) {
        this.commitment = commitment;
    }

    public Type getType() {
        return type;
    }

    public Bounties type(Type type) {
        this.type = type;
        return this;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Category getCategory() {
        return category;
    }

    public Bounties category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getKeywords() {
        return keywords;
    }

    public Bounties keywords(String keywords) {
        this.keywords = keywords;
        return this;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public Boolean isPermission() {
        return permission;
    }

    public Bounties permission(Boolean permission) {
        this.permission = permission;
        return this;
    }

    public void setPermission(Boolean permission) {
        this.permission = permission;
    }

    public LocalDate getExpires() {
        return expires;
    }

    public Bounties expires(LocalDate expires) {
        this.expires = expires;
        return this;
    }

    public void setExpires(LocalDate expires) {
        this.expires = expires;
    }

    public Set<Funding> getFundings() {
        return fundings;
    }

    public Bounties fundings(Set<Funding> fundings) {
        this.fundings = fundings;
        return this;
    }

    public Bounties addFunding(Funding funding) {
        this.fundings.add(funding);
        funding.setBounties(this);
        return this;
    }

    public Bounties removeFunding(Funding funding) {
        this.fundings.remove(funding);
        funding.setBounties(null);
        return this;
    }

    public void setFundings(Set<Funding> fundings) {
        this.fundings = fundings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bounties)) {
            return false;
        }
        return id != null && id.equals(((Bounties) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bounties{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", url='" + getUrl() + "'" +
            ", amount=" + getAmount() +
            ", experience='" + getExperience() + "'" +
            ", commitment=" + getCommitment() +
            ", type='" + getType() + "'" +
            ", category='" + getCategory() + "'" +
            ", keywords='" + getKeywords() + "'" +
            ", permission='" + isPermission() + "'" +
            ", expires='" + getExpires() + "'" +
            "}";
    }
}
