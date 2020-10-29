package org.muellners.bounties.web.rest;

import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.repository.BountyRepository;
import org.muellners.bounties.repository.search.BountySearchRepository;
import org.muellners.bounties.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link org.muellners.bounties.domain.Bounty}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BountyResource {

    private final Logger log = LoggerFactory.getLogger(BountyResource.class);

    private static final String ENTITY_NAME = "bounty";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BountyRepository bountyRepository;

    private final BountySearchRepository bountySearchRepository;

    public BountyResource(BountyRepository bountyRepository, BountySearchRepository bountySearchRepository) {
        this.bountyRepository = bountyRepository;
        this.bountySearchRepository = bountySearchRepository;
    }

    /**
     * {@code POST  /bounties} : Create a new bounty.
     *
     * @param bounty the bounty to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bounty, or with status {@code 400 (Bad Request)} if the bounty has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bounties")
    public ResponseEntity<Bounty> createBounty(@RequestBody Bounty bounty) throws URISyntaxException {
        log.debug("REST request to save Bounty : {}", bounty);
        if (bounty.getId() != null) {
            throw new BadRequestAlertException("A new bounty cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bounty result = bountyRepository.save(bounty);
        bountySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/bounties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bounties} : Updates an existing bounty.
     *
     * @param bounty the bounty to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bounty,
     * or with status {@code 400 (Bad Request)} if the bounty is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bounty couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bounties")
    public ResponseEntity<Bounty> updateBounty(@RequestBody Bounty bounty) throws URISyntaxException {
        log.debug("REST request to update Bounty : {}", bounty);
        if (bounty.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bounty result = bountyRepository.save(bounty);
        bountySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bounty.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bounties} : get all the bounties.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bounties in body.
     */
    @GetMapping("/bounties")
    public List<Bounty> getAllBounties() {
        log.debug("REST request to get all Bounties");
        return bountyRepository.findAll();
    }

    /**
     * {@code GET  /bounties/:id} : get the "id" bounty.
     *
     * @param id the id of the bounty to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bounty, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bounties/{id}")
    public ResponseEntity<Bounty> getBounty(@PathVariable Long id) {
        log.debug("REST request to get Bounty : {}", id);
        Optional<Bounty> bounty = bountyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bounty);
    }

    /**
     * {@code DELETE  /bounties/:id} : delete the "id" bounty.
     *
     * @param id the id of the bounty to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bounties/{id}")
    public ResponseEntity<Void> deleteBounty(@PathVariable Long id) {
        log.debug("REST request to delete Bounty : {}", id);
        bountyRepository.deleteById(id);
        bountySearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/bounties?query=:query} : search for the bounty corresponding
     * to the query.
     *
     * @param query the query of the bounty search.
     * @return the result of the search.
     */
    @GetMapping("/_search/bounties")
    public List<Bounty> searchBounties(@RequestParam String query) {
        log.debug("REST request to search Bounties for query {}", query);
        return StreamSupport
            .stream(bountySearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
