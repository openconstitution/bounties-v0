package org.muellners.bounties.web.rest;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;
import org.muellners.bounties.domain.Issue;
import org.muellners.bounties.repository.IssueRepository;
import org.muellners.bounties.repository.search.IssueSearchRepository;
import org.muellners.bounties.service.IssueService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class IssueHelper {

  Logger log = LoggerFactory.getLogger(IssueHelper.class);

  private IssueRepository issueRepository;
  private IssueSearchRepository issueSearchRepository;
  private final IssueService issueService;

  public IssueHelper() {
    this.issueService =
        new IssueService(issueRepository, issueSearchRepository);
  }

  public Issue createIssue(final String issueLink) {

    final Issue issue = new Issue();
    if (issueLink.contains("jira")) {
      HttpResponse<JsonNode> jsonNode = Unirest.get(issueLink).asJson();

      JSONObject issueObj = jsonNode.getBody().getObject();

      issue.setIssueId(issueObj.getString("id"));
      issue.setUrl(issueObj.getString("self"));
      issue.setDescription(issueObj.getString("fields.description"));
    }
    return issueService.save(issue);
  }
}