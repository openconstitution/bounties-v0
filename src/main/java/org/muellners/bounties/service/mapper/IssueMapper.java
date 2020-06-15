package org.muellners.bounties.service.mapper;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.muellners.bounties.domain.Issue;
import org.muellners.bounties.service.dto.IssueDTO;
import org.springframework.stereotype.Service;

/**
 * Mapper for the entity {@link Issue} and its DTO called {@link IssueDTO}.
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as
 * MapStruct support is still in beta, and requires a manual step with an IDE.
 */
@Service
public class IssueMapper {

  public List<IssueDTO> issuesToIssueDTOs(List<Issue> issue) {
    return issue.stream()
        .filter(Objects::nonNull)
        .map(this::issueToIssueDTO)
        .collect(Collectors.toList());
  }

  public IssueDTO issueToIssueDTO(Issue issue) { return new IssueDTO(issue); }

  public List<Issue> issueDTOsToIssues(List<IssueDTO> issueDTOs) {
    return issueDTOs.stream()
        .filter(Objects::nonNull)
        .map(this::issueDTOToIssue)
        .collect(Collectors.toList());
  }

  public Issue issueDTOToIssue(IssueDTO issueDTO) {
    if (issueDTO == null) {
      return null;
    } else {
      Issue issue = new Issue();
      issue.setId(issueDTO.getId());
      issue.setIssueId(issueDTO.getIssueId());
      issue.setUrl(issueDTO.getUrl());
      issue.setDescription(issueDTO.getDescription());
      return issue;
    }
  }
}