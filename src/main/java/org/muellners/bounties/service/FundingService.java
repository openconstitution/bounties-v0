package org.muellners.bounties.service;

import static org.elasticsearch.index.query.QueryBuilders.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.muellners.bounties.domain.Funding;
import org.muellners.bounties.repository.FundingRepository;
import org.muellners.bounties.repository.search.FundingSearchRepository;
import org.muellners.bounties.service.dto.FundingDTO;
import org.muellners.bounties.service.mapper.FundingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Funding}.
 */
@Service
@Transactional
public class FundingService {

  private final Logger log = LoggerFactory.getLogger(FundingService.class);

  private final FundingRepository fundingRepository;

  private final FundingSearchRepository fundingSearchRepository;

  @Autowired private final FundingMapper fundingMapper;

  public FundingService(FundingRepository fundingRepository,
                        FundingSearchRepository fundingSearchRepository,
                        FundingMapper fundingMapper) {
    this.fundingRepository = fundingRepository;
    this.fundingSearchRepository = fundingSearchRepository;
    this.fundingMapper = fundingMapper;
  }

  /**
   * Save a funding.
   *
   * @param funding the entity to save.
   * @return the persisted entity.
   */
  public FundingDTO save(final FundingDTO fundingDTO) {
    log.debug("Request to save Funding : {}", fundingDTO);
    final Funding funding = fundingMapper.fundingDTOToFunding(fundingDTO);
    Funding result = fundingRepository.save(funding);
    fundingSearchRepository.save(result);
    return fundingMapper.fundingToFundingDTO(result);
  }

  /**
   * Get all the fundings.
   *
   * @return the list of entities.
   */
  @Transactional(readOnly = true)
  public List<FundingDTO> findAll() {
    log.debug("Request to get all Fundings");
    return fundingMapper.fundingsToFundingDTOs(fundingRepository.findAll());
  }

  /**
   * Get one funding by id.
   *
   * @param id the id of the entity.
   * @return the entity.
   */
  @Transactional(readOnly = true)
  public FundingDTO findOne(Long id) {
    log.debug("Request to get Funding : {}", id);
    final Optional<Funding> funding = fundingRepository.findById(id);
    return fundingMapper.fundingToFundingDTO(funding.orElse(null));
  }

  /**
   * Delete the funding by id.
   *
   * @param id the id of the entity.
   */
  public void delete(Long id) {
    log.debug("Request to delete Funding : {}", id);

    fundingRepository.deleteById(id);
    fundingSearchRepository.deleteById(id);
  }

  /**
   * Search for the funding corresponding to the query.
   *
   * @param query the query of the search.
   * @return the list of entities.
   */
  @Transactional(readOnly = true)
  public List<FundingDTO> search(String query) {
    log.debug("Request to search Fundings for query {}", query);
    final List<Funding> fundings =
        StreamSupport
            .stream(fundingSearchRepository.search(queryStringQuery(query))
                        .spliterator(),
                    false)
            .collect(Collectors.toList());
    return fundingMapper.fundingsToFundingDTOs(fundings);
  }
}
