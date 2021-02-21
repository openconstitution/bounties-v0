package org.muellners.bounties.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.io.Serializable;

@Entity
@Table(name = "b_issue")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Issue implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(name = "issue_url")
	private String url;

	@OneToOne
	@JoinColumn(name = "status_id")
	private Option status;

	@OneToOne
	@JoinColumn(name = "resolver_id")
	private User resolver;

	public Issue() {
		// no-args
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	@Transient
	public Issue url(String url) {
		this.url = url;
		return this;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Option getStatus() {
		return status;
	}

	public Issue status(Option status) {
		this.status = status;
		return this;
	}

	public void setStatus(Option status) {
		this.status = status;
	}

	public User getResolver() {
		return resolver;
	}

	public void setResolver(User resolver) {
		this.resolver = resolver;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Issue)) return false;

		Issue issue = (Issue) o;

		if (!Objects.equals(id, issue.id)) return false;
		if (getUrl() != null ? !getUrl().equals(issue.getUrl()) : issue.getUrl() != null)
			return false;
		if (getStatus() != null ? !getStatus().equals(issue.getStatus()) : issue.getStatus() != null) return false;
		return getResolver() != null ? getResolver().equals(issue.getResolver()) : issue.getResolver() == null;
	}

	@Override
	public int hashCode() {
		int result = id != null ? id.hashCode() : 0;
		result = 31 * result + (getUrl() != null ? getUrl().hashCode() : 0);
		result = 31 * result + (getStatus() != null ? getStatus().hashCode() : 0);
		result = 31 * result + (getResolver() != null ? getResolver().hashCode() : 0);
		return result;
	}

	@Override
	public String toString() {
		return "Issue{" +
				"id=" + id +
				", url='" + url + '\'' +
				", status=" + status +
				", resolver='" + resolver + "'" +
			'}';
	}
}
