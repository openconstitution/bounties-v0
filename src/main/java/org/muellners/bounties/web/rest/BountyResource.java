package org.muellners.bounties.web.rest;

import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.security.AuthoritiesConstants;
import org.muellners.bounties.service.BountyService;
import org.muellners.bounties.service.FundService;
import org.muellners.bounties.service.criteria.BountyCriteria;
import org.muellners.bounties.service.criteria.OptionCriteria;
import org.muellners.bounties.service.dto.BountyDTO;
import org.muellners.bounties.service.dto.FundDTO;
import org.muellners.bounties.service.query.BountyQueryService;
import org.muellners.bounties.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

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

    private final BountyService bountyService;
    private BountyQueryService bountyQueryService;
    private final FundService fundService;

    public BountyResource(final BountyService bountyService,
                          final BountyQueryService bountyQueryService,
                          final FundService fundService) {
        this.bountyService = bountyService;
        this.fundService = fundService;
    }

    /**
     * {@code POST  /bounties} : Create a new bounty.
     *
     * @param bountyDTO the bounty to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new bounty, or with status {@code 400 (Bad Request)} if the
     *         bounty has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bounties")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<BountyDTO> createBounty(@RequestBody final BountyDTO bountyDTO) throws URISyntaxException {
        log.debug("REST request to save Bounty : {}", bountyDTO);
        if (bountyDTO.getId() != null) {
            throw new BadRequestAlertException("A new bounty cannot already have an ID", ENTITY_NAME, "idexists");
        }
        final BountyDTO result = bountyService.save(bountyDTO);
        return ResponseEntity
                .created(new URI("/api/bounties/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code POST  /bounties/:id/funds} : Add/Remove funds from bounty.
     *
     * @param funds the fund to add/remove from bounty.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new bounty, or with status {@code 400 (Bad Request)} if the
     *         bounty has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bounties/{id}/funds")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<BountyDTO> manageFunds(@PathVariable final Long id,
                                                 @RequestParam final String action,
                                                 @RequestBody final List<FundDTO> funds) throws URISyntaxException {
        log.debug("REST request to manage funds for Bounty : {}", id);

        if (funds.isEmpty()) {
            throw new BadRequestAlertException("There are no funds to manage", "fund", "nofunds");
        }

        BountyDTO bountyDTO = null;

        if (action.equalsIgnoreCase("add")) {
            funds.stream().map(fund -> {
                if (fund.getId() != null) {
                    throw new BadRequestAlertException("A new fund cannot already have an ID", "fund", "idexists");
                }
                return null;
            });
            bountyDTO = bountyService.addFunds(id, funds);
        } else if (action.equalsIgnoreCase("remove")) {
            funds.stream().map(fund -> {
                if (fund.getId() == null) {
                    throw new BadRequestAlertException("Cannot remove funds that are not attached to a bounty", "fund", "idexists");
                }
                return null;
            });
            bountyDTO = bountyService.removeFunds(id, funds);
        } else {
            throw new BadRequestAlertException("Action: " + action + " is not supported", "bounty", "unknownAction");
        }
        return ResponseEntity
                .created(new URI("/api/bounties/" + bountyDTO.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, true, ENTITY_NAME, bountyDTO.getId().toString()))
                .body(bountyDTO);
    }

    /**
     * {@code PUT  /bounties} : Updates an existing bounty.
     *
     * @param bountyDTO the bounty to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated bounty, or with status {@code 400 (Bad Request)} if the
     *         bounty is not valid, or with status
     *         {@code 500 (Internal Server Error)} if the bounty couldn't be
     *         updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bounties")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<BountyDTO> updateBounty(@RequestBody final BountyDTO bountyDTO) {
        log.debug("REST request to update Bounty : {}", bountyDTO);
        if (bountyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        final BountyDTO result = bountyService.save(bountyDTO);
        return ResponseEntity.ok().headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bountyDTO.getId().toString()))
                .body(result);
    }

	/**
	 * {@code GET  /bounties} : get all the bounties per page.
	 *
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bounties in body.
	 */
	@GetMapping("/bounties")
	public ResponseEntity<List<BountyDTO>> getAllBounties(@RequestParam(name = "criteria", required = false) BountyCriteria criteria) {
        log.debug("REST request to get all Bounties by criteria: {}", criteria);
        List<BountyDTO> bountyDTOS = bountyQueryService.findByCriteria(criteria);
        HttpHeaders headers = HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, String.valueOf(bountyDTOS));
        return ResponseEntity.ok().headers(headers).body(bountyDTOS);
	}

    /**
     * `GET  /bounties/count}` : count all the bounties.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the [ResponseEntity] with status `200 (OK)` and the count in body.
     */
    @GetMapping("/bounties/count")
    public ResponseEntity<Long> countOptions(@RequestParam(name = "criteria", required = false) BountyCriteria criteria) {
        log.debug("REST request to count Bounties by criteria: {}", criteria);
        return ResponseEntity.ok().body(bountyQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /bounties/:id} : get the "id" bounty.
     *
     * @param id the id of the bounty to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the bounty, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bounties/{id}")
    public ResponseEntity<BountyDTO> getBounty(@PathVariable final Long id) {
        log.debug("REST request to get Bounty : {}", id);
        final BountyDTO bountyDTO = bountyService.findOne(id);
        return ResponseEntity.ok().body(bountyDTO);
    }

    /**
     * {@code DELETE  /bounties/:id} : delete the "id" bounty.
     *
     * @param id the id of the bounty to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bounties/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<Void> deleteBounty(@PathVariable final Long id) {
        log.debug("REST request to delete Bounty : {}", id);
        bountyService.delete(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }

    /**
     * {@code SEARCH  /_search/bounties?q=:query} : search for the bounty
     * corresponding to the query.
     *
     * @param query the query of the bounty search.
     * @return the result of the search.
     */
    @GetMapping("/_search/bounties")
    public ResponseEntity<List<Bounty>> searchBounties(@RequestParam("q") final String query) {
        log.debug("REST request to search Bounties for query {}", query);
        return ResponseEntity.ok().body(bountyQueryService.search(query));
    }
}
