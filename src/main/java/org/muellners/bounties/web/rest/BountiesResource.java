package org.muellners.bounties.web.rest;

import org.muellners.bounties.domain.Bounties;
import org.muellners.bounties.service.BountiesService;
import org.muellners.bounties.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link org.muellners.bounties.domain.Bounties}.
 */
@RestController
@RequestMapping("/api")
public class BountiesResource {

    private final Logger log = LoggerFactory.getLogger(BountiesResource.class);

    private static final String ENTITY_NAME = "bounties";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BountiesService bountiesService;

    public BountiesResource(BountiesService bountiesService) {
        this.bountiesService = bountiesService;
    }

    /**
     * {@code POST  /bounties} : Create a new bounties.
     *
     * @param bounties the bounties to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bounties, or with status {@code 400 (Bad Request)} if the bounties has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bounties")
    public ResponseEntity<Bounties> createBounties(@RequestBody Bounties bounties) throws URISyntaxException {
        log.debug("REST request to save Bounties : {}", bounties);
        if (bounties.getId() != null) {
            throw new BadRequestAlertException("A new bounties cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bounties result = bountiesService.save(bounties);
        return ResponseEntity.created(new URI("/api/bounties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bounties} : Updates an existing bounties.
     *
     * @param bounties the bounties to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bounties,
     * or with status {@code 400 (Bad Request)} if the bounties is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bounties couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bounties")
    public ResponseEntity<Bounties> updateBounties(@RequestBody Bounties bounties) throws URISyntaxException {
        log.debug("REST request to update Bounties : {}", bounties);
        if (bounties.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bounties result = bountiesService.save(bounties);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bounties.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bounties} : get all the bounties.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bounties in body.
     */
    @GetMapping("/bounties")
    public List<Bounties> getAllBounties() {
        log.debug("REST request to get all Bounties");
        return bountiesService.findAll();
    }

    /**
     * {@code GET  /bounties/:id} : get the "id" bounties.
     *
     * @param id the id of the bounties to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bounties, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bounties/{id}")
    public ResponseEntity<Bounties> getBounties(@PathVariable Long id) {
        log.debug("REST request to get Bounties : {}", id);
        Optional<Bounties> bounties = bountiesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bounties);
    }

    /**
     * {@code DELETE  /bounties/:id} : delete the "id" bounties.
     *
     * @param id the id of the bounties to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bounties/{id}")
    public ResponseEntity<Void> deleteBounties(@PathVariable Long id) {
        log.debug("REST request to delete Bounties : {}", id);
        bountiesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/bounties?query=:query} : search for the bounties corresponding
     * to the query.
     *
     * @param query the query of the bounties search.
     * @return the result of the search.
     */
    @GetMapping("/_search/bounties")
    public List<Bounties> searchBounties(@RequestParam String query) {
        log.debug("REST request to search Bounties for query {}", query);
        return bountiesService.search(query);
    }
}
