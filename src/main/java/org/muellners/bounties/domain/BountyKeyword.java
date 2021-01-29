package org.muellners.bounties.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "bounty_keyword")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BountyKeyword implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "bounty_id", referencedColumnName = "id")
	private Bounty bounty;

	@Column(name = "keyword")
	private String keyword;

	public BountyKeyword() {
		// no-args
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Bounty getBounty() {
		return bounty;
	}

	public void setBounty(Bounty bounty) {
		this.bounty = bounty;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof BountyKeyword)) return false;

		BountyKeyword that = (BountyKeyword) o;

		if (getId() != null ? !getId().equals(that.getId()) : that.getId() != null) return false;
		if (getBounty() != null ? !getBounty().equals(that.getBounty()) : that.getBounty() != null) return false;
		return getKeyword() != null ? getKeyword().equals(that.getKeyword()) : that.getKeyword() == null;
	}

	@Override
	public int hashCode() {
		int result = getId() != null ? getId().hashCode() : 0;
		result = 31 * result + (getBounty() != null ? getBounty().hashCode() : 0);
		result = 31 * result + (getKeyword() != null ? getKeyword().hashCode() : 0);
		return result;
	}

	@Override
	public String toString() {
		return "BountyKeyword{" +
				"id=" + id +
				", bounty=" + bounty +
				", keyword='" + keyword + '\'' +
				'}';
	}
}
