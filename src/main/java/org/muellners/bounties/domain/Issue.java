package org.muellners.bounties.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Issue.
 */
@Entity
@Table(name = "issue")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "issue")
public class Issue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "issue_id")
    private String issueId;

    @Column(name = "url")
    private String url;

    @Column(name = "description")
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIssueId() {
        return issueId;
    }

    public Issue issueId(String issueId) {
        this.issueId = issueId;
        return this;
    }

    public void setIssueId(String issueId) {
        this.issueId = issueId;
    }

    public String getUrl() {
        return url;
    }

    public Issue url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public Issue description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Issue)) {
            return false;
        }
        return id != null && id.equals(((Issue) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Issue{" +
            "id=" + getId() +
            ", issueId='" + getIssueId() + "'" +
            ", url='" + getUrl() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
