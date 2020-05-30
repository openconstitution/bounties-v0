package org.muellners.bounties.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "issue")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.
Document(indexName = "issue")
public class Issue extends AbstractAuditingEntity implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

  @Column(name = "issue_id") private String issueId;

  @Column(name = "url") private String url;

  @Column(name = "description") private String description;

  @OneToOne @MapsId @JsonBackReference private Bounties bounties;

  public Long getId() { return this.id; }

  public void setId(Long id) { this.id = id; }

  public Long getIssueId() { return this.id; }

  public void setIssueId(String issueId) { this.issueId = issueId; }

  public String getUrl() { return this.url; }

  public void setUrl(String url) { this.url = url; }

  public String getDescription() { return this.description; }

  public void setDescription(String description) {
    this.description = description;
  }

  public Bounties getBounties() { return bounties; }

  public void setBounties(Bounties bounties) { this.bounties = bounties; }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Issue)) {
      return false;
    }
    return id != null && id.equals(((Issue)o).id);
  }

  @Override
  public int hashCode() {
    return 31;
  }

  @Override
  public String toString() {
    return "Issue{"
        + "id=" + getId() + ", issueId='" + getIssueId() + "'"
        + ", url='" + getUrl() + "'"
        + ", description='" + getDescription() + "'"
        + "}";
  }
}
