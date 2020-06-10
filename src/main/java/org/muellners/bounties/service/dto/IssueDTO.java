package org.muellners.bounties.service.dto;

import org.muellners.bounties.domain.Issue;

public class IssueDTO {

    private Long id;

    private String issueId;

    private String url;

    private String description;

    public IssueDTO() {
        // Empty
    }

    public IssueDTO(Issue issue) {
        this.id = issue.getId();
        this.issueId = issue.getIssueId();
        this.url = issue.getUrl();
        this.description = issue.getDescription();
    }

    public Long getId() {
        return this.id;
    }

    public String getIssueId() {
        return this.issueId;
    }

    public String getUrl() {
        return this.url;
    }

    public String getDescription() {
        return this.description;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public void setIssueId(String issueId) {
        this.issueId = issueId;
	}

	public void setUrl(String url) {
        this.url = url;
	}

	public void setDescription(String description) {
        this.description = description;
	}

    @Override
    public String toString() {
        return "Issue{" +
            "id=" + this.id +
            ", issueId='" + this.issueId + "'" +
            ", url='" + this.url + "\n'" +
            ", description='" + this.description + "'" +
            "}";
    }

}
