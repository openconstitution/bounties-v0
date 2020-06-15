package org.muellners.bounties.service;

import static org.elasticsearch.index.query.QueryBuilders.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import javax.persistence.PreUpdate;
import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.repository.BountyRepository;
import org.muellners.bounties.repository.search.BountySearchRepository;
import org.muellners.bounties.security.SecurityUtils;
import org.muellners.bounties.service.dto.BountyDTO;
import org.muellners.bounties.service.mapper.BountyMapper;
import org.muellners.bounties.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Bounty}.
 */
@Service
@Transactional
public class BountyService {

  private final Logger log = LoggerFactory.getLogger(BountyService.class);

  private final BountyRepository bountyRepository;

  private final BountySearchRepository bountySearchRepository;

  private final IssueHelper issueHelper;

  @Autowired private final BountyMapper bountyMapper;

  public BountyService(BountyRepository bountyRepository,
                       BountySearchRepository bountySearchRepository,
                       IssueHelper issueHelper, BountyMapper bountyMapper) {
    this.bountyRepository = bountyRepository;
    this.bountySearchRepository = bountySearchRepository;
    this.issueHelper = issueHelper;
    this.bountyMapper = bountyMapper;
  }

  /**
   * Save a bounty.
   *
   * @param bounty the entity to save.
   * @return the persisted entity.
   */
  public BountyDTO save(final BountyDTO bountyDTO) {
    log.debug("Request to save Bounty : {}", bountyDTO);
    // Before we go and save the url from git/bitbucket/jira/or anything else
    issueHelper.createIssue(bountyDTO.getUrl());
    final Bounty bounty = bountyMapper.bountyDTOToBounty(bountyDTO);
    Bounty result = bountyRepository.save(bounty);
    bountySearchRepository.save(result);
    return bountyMapper.bountyToBountyDTO(result);
  }

  /**
   * Fetch Information about the issue based on the link provided.
   * @param link the link to parse
   * @return description from the link.
   */

  /**
   * Get all the bounty.
   *
   * @return the list of entities.
   */
  @Transactional(readOnly = true)
  public List<BountyDTO> findAll() {
    log.debug("Request to get all Bounty");
    return bountyMapper.bountiesToBountyDTOs(bountyRepository.findAll());
  }

  /**
   * Get one bounty by id.
   *
   * @param id the id of the entity.
   * @return the entity.
   */
  @Transactional(readOnly = true)
  public BountyDTO findOne(Long id) {
    log.debug("Request to get Bounty : {}", id);
    final Optional<Bounty> bounty = bountyRepository.findById(id);
    return bountyMapper.bountyToBountyDTO(bounty.orElse(null));
  }

  /**
   * Delete the bounty by id.
   *
   * @param id the id of the entity.
   */
  public void delete(Long id) {
    log.debug("Request to delete Bounty : {}", id);

    bountyRepository.deleteById(id);
    bountySearchRepository.deleteById(id);
  }

  /**
   * Search for the bounty corresponding to the query.
   *
   * @param query the query of the search.
   * @return the list of entities.
   */
  @Transactional(readOnly = true)
  public List<BountyDTO> search(String query) {
    log.debug("Request to search Bounty for query {}", query);
    final List<Bounty> bounties =
        StreamSupport
            .stream(bountySearchRepository.search(queryStringQuery(query))
                        .spliterator(),
                    false)
            .collect(Collectors.toList());
    return bountyMapper.bountiesToBountyDTOs(bounties);
  }
}
