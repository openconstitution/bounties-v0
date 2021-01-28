package org.muellners.bounties.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.math.BigDecimal;

/**
 * A Fund.
 */
@Entity
@Table(name = "funding")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Fund extends AbstractAuditingEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount", precision = 21, scale = 2)
    private BigDecimal amount;

    @Column(name = "mode")
    private String mode;

    @Column(name = "payment_intent_id")
    private String paymentIntentId;

    @Column(name = "payment_auth")
    private Boolean paymentAuth;

    @ManyToOne
    @JsonIgnoreProperties(value = "fundings", allowSetters = true)
    private Bounty bounty;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Fund() {
        // no-args
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Fund amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getMode() {
        return mode;
    }

    public Fund mode(String mode) {
        this.mode = mode;
        return this;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public String getPaymentIntentId() {
        return paymentIntentId;
    }

    public void setPaymentIntentId(String paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
    }

    public Boolean isPaymentAuth() {
        return paymentAuth;
    }

    public Boolean getPaymentAuth() {
        return paymentAuth;
    }

    public Fund paymentAuth(Boolean paymentAuth) {
        this.paymentAuth = paymentAuth;
        return this;
    }

    public void setPaymentAuth(Boolean paymentAuth) {
        this.paymentAuth = paymentAuth;
    }

    public Bounty getBounty() {
        return bounty;
    }

    public Fund bounty(Bounty bounty) {
        this.bounty = bounty;
        return this;
    }

    public void setBounty(Bounty bounty) {
        this.bounty = bounty;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fund)) {
            return false;
        }
        return id != null && id.equals(((Fund) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Fund{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", mode='" + getMode() + "'" +
            ", paymentAuth='" + isPaymentAuth() + "'" +
            "}";
    }
}
