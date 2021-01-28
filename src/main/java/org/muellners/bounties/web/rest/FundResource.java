package org.muellners.bounties.web.rest;

import org.muellners.bounties.domain.Fund;
import org.muellners.bounties.repository.FundRepository;
import org.muellners.bounties.service.criteria.FundCriteria;
import org.muellners.bounties.service.dto.FundDTO;
import org.muellners.bounties.service.query.FundQueryService;
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
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link Fund}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FundResource {

    private final Logger log = LoggerFactory.getLogger(FundResource.class);

    private static final String ENTITY_NAME = "fund";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FundRepository fundRepository;
    private final FundQueryService fundQueryService;

    public FundResource(final FundRepository fundRepository, final FundQueryService fundQueryService) {
        this.fundRepository = fundRepository;
        this.fundQueryService = fundQueryService;
    }

    /**
     * {@code POST  /funds} : Create a new fund.
     *
     * @param fund the fund to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fund, or with status {@code 400 (Bad Request)} if the fund has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/funds")
    public ResponseEntity<Fund> createFund(@RequestBody Fund fund) throws URISyntaxException {
        log.debug("REST request to save Fund : {}", fund);
        if (fund.getId() != null) {
            throw new BadRequestAlertException("A new fund cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fund result = fundRepository.save(fund);
        return ResponseEntity.created(new URI("/api/fundings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /funds} : Updates an existing fund.
     *
     * @param fund the fund to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fund,
     * or with status {@code 400 (Bad Request)} if the fund is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fund couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/funds")
    public ResponseEntity<Fund> updateFund(@RequestBody Fund fund) throws URISyntaxException {
        log.debug("REST request to update Fund : {}", fund);
        if (fund.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fund result = fundRepository.save(fund);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, fund.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fundings} : get all the fundings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fundings in body.
     */
    @GetMapping("/funds")
    public Collection<FundDTO> getAllFunds(@RequestParam("criteria") FundCriteria fundCriteria) {
        log.debug("REST request to get all Funds: {}", fundCriteria);
        return fundQueryService.findByCriteria(fundCriteria);
    }

    /**
     * `GET  /funds/count}` : count all the funds.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the [ResponseEntity] with status `200 (OK)` and the count in body.
     */
    @GetMapping("/funds/count")
    public ResponseEntity<Long> countOptions(@RequestParam("criteria") FundCriteria criteria) {
        log.debug("REST request to count Funds by criteria: {}", criteria);
        return ResponseEntity.ok().body(fundQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /fundings/:id} : get the "id" funding.
     *
     * @param id the id of the funding to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the funding, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/funds/{id}")
    public ResponseEntity<Fund> getFund(@PathVariable Long id) {
        log.debug("REST request to get Fund : {}", id);
        Optional<Fund> funding = fundRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(funding);
    }

    /**
     * {@code DELETE  /fundings/:id} : delete the "id" funding.
     *
     * @param id the id of the funding to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/funds/{id}")
    public ResponseEntity<Void> deleteFund(@PathVariable Long id) {
        log.debug("REST request to delete Fund : {}", id);
        fundRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/fundings?q=:query} : search for the funding corresponding
     * to the query.
     *
     * @param query the query of the funding search.
     * @return the result of the search.
     */
    @GetMapping("/_search/funds")
    public ResponseEntity<List<Fund>> searchFunds(@RequestParam("q") String query) {
        log.debug("REST request to search Funds for query {}", query);
        return ResponseEntity.ok().body(fundQueryService.search(query));
    }
}
