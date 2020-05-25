package org.muellners.bounties.service;

import org.muellners.bounties.domain.Funding;
import org.muellners.bounties.repository.FundingRepository;
import org.muellners.bounties.repository.search.FundingSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Funding}.
 */
@Service
@Transactional
public class FundingService {

    private final Logger log = LoggerFactory.getLogger(FundingService.class);

    private final FundingRepository fundingRepository;

    private final FundingSearchRepository fundingSearchRepository;

    public FundingService(FundingRepository fundingRepository, FundingSearchRepository fundingSearchRepository) {
        this.fundingRepository = fundingRepository;
        this.fundingSearchRepository = fundingSearchRepository;
    }

    /**
     * Save a funding.
     *
     * @param funding the entity to save.
     * @return the persisted entity.
     */
    public Funding save(Funding funding) {
        log.debug("Request to save Funding : {}", funding);
        Funding result = fundingRepository.save(funding);
        fundingSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the fundings.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Funding> findAll() {
        log.debug("Request to get all Fundings");
        return fundingRepository.findAll();
    }


    /**
     * Get one funding by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Funding> findOne(Long id) {
        log.debug("Request to get Funding : {}", id);
        return fundingRepository.findById(id);
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
    public List<Funding> search(String query) {
        log.debug("Request to search Fundings for query {}", query);
        return StreamSupport
            .stream(fundingSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
