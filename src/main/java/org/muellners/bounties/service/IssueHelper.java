package org.muellners.bounties.service;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONObject;
import org.muellners.bounties.domain.Issue;
import org.muellners.bounties.service.dto.IssueDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IssueHelper {

  Logger log = LoggerFactory.getLogger(IssueHelper.class);

  private final IssueService issueService;

  @Autowired
  public IssueHelper(IssueService issueService) {
    this.issueService = issueService;
  }

  public IssueDTO createIssue(final String issueLink) {

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
