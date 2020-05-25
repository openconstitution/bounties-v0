package org.muellners.bounties.web.rest;

import org.muellners.bounties.domain.Funding;
import org.muellners.bounties.service.FundingService;
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
 * REST controller for managing {@link org.muellners.bounties.domain.Funding}.
 */
@RestController
@RequestMapping("/api")
public class FundingResource {

    private final Logger log = LoggerFactory.getLogger(FundingResource.class);

    private static final String ENTITY_NAME = "funding";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FundingService fundingService;

    public FundingResource(FundingService fundingService) {
        this.fundingService = fundingService;
    }

    /**
     * {@code POST  /fundings} : Create a new funding.
     *
     * @param funding the funding to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new funding, or with status {@code 400 (Bad Request)} if the funding has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fundings")
    public ResponseEntity<Funding> createFunding(@RequestBody Funding funding) throws URISyntaxException {
        log.debug("REST request to save Funding : {}", funding);
        if (funding.getId() != null) {
            throw new BadRequestAlertException("A new funding cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Funding result = fundingService.save(funding);
        return ResponseEntity.created(new URI("/api/fundings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fundings} : Updates an existing funding.
     *
     * @param funding the funding to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated funding,
     * or with status {@code 400 (Bad Request)} if the funding is not valid,
     * or with status {@code 500 (Internal Server Error)} if the funding couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fundings")
    public ResponseEntity<Funding> updateFunding(@RequestBody Funding funding) throws URISyntaxException {
        log.debug("REST request to update Funding : {}", funding);
        if (funding.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Funding result = fundingService.save(funding);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, funding.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fundings} : get all the fundings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fundings in body.
     */
    @GetMapping("/fundings")
    public List<Funding> getAllFundings() {
        log.debug("REST request to get all Fundings");
        return fundingService.findAll();
    }

    /**
     * {@code GET  /fundings/:id} : get the "id" funding.
     *
     * @param id the id of the funding to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the funding, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fundings/{id}")
    public ResponseEntity<Funding> getFunding(@PathVariable Long id) {
        log.debug("REST request to get Funding : {}", id);
        Optional<Funding> funding = fundingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(funding);
    }

    /**
     * {@code DELETE  /fundings/:id} : delete the "id" funding.
     *
     * @param id the id of the funding to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fundings/{id}")
    public ResponseEntity<Void> deleteFunding(@PathVariable Long id) {
        log.debug("REST request to delete Funding : {}", id);

        fundingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/fundings?query=:query} : search for the funding corresponding
     * to the query.
     *
     * @param query the query of the funding search.
     * @return the result of the search.
     */
    @GetMapping("/_search/fundings")
    public List<Funding> searchFundings(@RequestParam String query) {
        log.debug("REST request to search Fundings for query {}", query);
        return fundingService.search(query);
    }
}
