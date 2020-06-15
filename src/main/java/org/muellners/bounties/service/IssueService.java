package org.muellners.bounties.service;

import static org.elasticsearch.index.query.QueryBuilders.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.muellners.bounties.domain.Issue;
import org.muellners.bounties.repository.IssueRepository;
import org.muellners.bounties.repository.search.IssueSearchRepository;
import org.muellners.bounties.service.dto.IssueDTO;
import org.muellners.bounties.service.mapper.IssueMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class IssueService {

  private final Logger log = LoggerFactory.getLogger(IssueService.class);

  private final IssueRepository issueRepository;

  private final IssueSearchRepository issueSearchRepository;

  @Autowired private final IssueMapper issueMapper;

  public IssueService(IssueRepository issueRepository,
                      IssueSearchRepository issueSearchRepository,
                      IssueMapper issueMapper) {
    this.issueRepository = issueRepository;
    this.issueSearchRepository = issueSearchRepository;
    this.issueMapper = issueMapper;
  }

  /**
   * Save an issue.
   *
   * @param issue the entity to save.
   * @return the persisted entity.
   */
  public IssueDTO save(Issue issue) {
    log.debug("Request to save Issue : {}", issue);
    final Issue result = issueRepository.save(issue);
    return issueMapper.issueToIssueDTO(issueSearchRepository.save(result));
  }

  /**
   * Get all issues.
   *
   * @return the list of entities.
   */
  @Transactional(readOnly = true)
  public List<IssueDTO> findAll() {
    log.debug("Request to get all Issues");
    return issueMapper.issuesToIssueDTOs(issueRepository.findAll());
  }

  /**
   * Get one Issue by id.
   *
   * @param id the id of the entity.
   * @return the entity.
   */
  @Transactional(readOnly = true)
  public IssueDTO findOne(Long id) {
    log.debug("Request to get Issue : {}", id);
    final Optional<Issue> issue = issueRepository.findById(id);
    return issueMapper.issueToIssueDTO(issue.orElse(null));
  }

  /**
   * Delete the funding by id.
   *
   * @param id the id of the entity.
   */
  public void delete(Long id) {
    log.debug("Request to delete Issue : {}", id);
    issueRepository.deleteById(id);
    issueSearchRepository.deleteById(id);
  }

  /**
   * Search for the funding corresponding to the query.
   *
   * @param query the query of the search.
   * @return the list of entities.
   */
  @Transactional(readOnly = true)
  public List<IssueDTO> search(String query) {
    log.debug("Request to seach Issue for query {}", query);
    final List<Issue> issues =
        StreamSupport
            .stream(issueSearchRepository.search(queryStringQuery(query))
                        .spliterator(),
                    false)
            .collect(Collectors.toList());
    return issueMapper.issuesToIssueDTOs(issues);
  }
}
