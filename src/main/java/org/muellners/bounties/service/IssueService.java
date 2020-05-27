package org.muellners.bounties.service;

import static org.elasticsearch.index.query.QueryBuilders.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.muellners.bounties.domain.Issue;
import org.muellners.bounties.repository.IssueRepository;
import org.muellners.bounties.repository.search.IssueSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class IssueService {

  private final Logger log = LoggerFactory.getLogger(IssueService.class);

  private final IssueRepository issueRepository;

  private final IssueSearchRepository issueSearchRepository;

  public IssueService(IssueRepository issueRepository,
                      IssueSearchRepository issueSearchRepository) {
    this.issueRepository = issueRepository;
    this.issueSearchRepository = issueSearchRepository;
  }

  /**
   * Save an issue.
   *
   * @param issue the entity to save.
   * @return the persisted entity.
   */
  public Issue save(Issue issue) {
    log.debug("Request to save Issue : {}", issue);
    Issue result = issueRepository.save(issue);
    issueSearchRepository.save(result);
    return result;
  }

  /**
   * Get all issues.
   *
   * @return the list of entities.
   */
  @Transactional(readOnly = true)
  public List<Issue> findAll() {
    log.debug("Request to get all Issues");
    return issueRepository.findAll();
  }

  /**
   * Get one Issue by id.
   *
   * @param id the id of the entity.
   * @return the entity.
   */
  @Transactional(readOnly = true)
  public Optional<Issue> findOne(Long id) {
    log.debug("Request to get Issue : {}", id);
    return issueRepository.findById(id);
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
  public List<Issue> search(String query) {
    log.debug("Request to seach Issue for query {}", query);
    return StreamSupport
        .stream(
            issueSearchRepository.search(queryStringQuery(query)).spliterator(),
            false)
        .collect(Collectors.toList());
  }
}