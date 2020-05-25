package org.muellners.bounties.service;

import org.muellners.bounties.domain.Bounties;
import org.muellners.bounties.repository.BountiesRepository;
import org.muellners.bounties.repository.search.BountiesSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.PreUpdate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Bounties}.
 */
@Service
@Transactional
public class BountiesService {

    private final Logger log = LoggerFactory.getLogger(BountiesService.class);

    private final BountiesRepository bountiesRepository;

    private final BountiesSearchRepository bountiesSearchRepository;

    public BountiesService(BountiesRepository bountiesRepository, BountiesSearchRepository bountiesSearchRepository) {
        this.bountiesRepository = bountiesRepository;
        this.bountiesSearchRepository = bountiesSearchRepository;
    }

    /**
     * Save a bounties.
     *
     * @param bounties the entity to save.
     * @return the persisted entity.
     */
    public Bounties save(Bounties bounties) {
        log.debug("Request to save Bounties : {}", bounties);
        Bounties result = bountiesRepository.save(bounties);
        bountiesSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the bounties.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Bounties> findAll() {
        log.debug("Request to get all Bounties");
        return bountiesRepository.findAll();
    }


    /**
     * Get one bounties by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Bounties> findOne(Long id) {
        log.debug("Request to get Bounties : {}", id);
        return bountiesRepository.findById(id);
    }

    /**
     * Delete the bounties by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Bounties : {}", id);

        bountiesRepository.deleteById(id);
        bountiesSearchRepository.deleteById(id);
    }

    /**
     * Search for the bounties corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Bounties> search(String query) {
        log.debug("Request to search Bounties for query {}", query);
        return StreamSupport
            .stream(bountiesSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
