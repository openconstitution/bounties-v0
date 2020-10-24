package org.muellners.bounties.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.muellners.bounties.security.AuthoritiesConstants;
import org.muellners.bounties.service.BountyService;
import org.muellners.bounties.service.FundingService;
import org.muellners.bounties.service.dto.BountyDTO;
import org.muellners.bounties.service.dto.FundingDTO;
import org.muellners.bounties.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * REST controller for managing {@link org.muellners.bounties.domain.Bounty}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BountyResource {

  private final Logger log = LoggerFactory.getLogger(BountyResource.class);

  private static final String ENTITY_NAME = "bounty";

  @Value("${jhipster.clientApp.name}") private String applicationName;

  private final BountyService bountyService;

  private final FundingService fundingService;

  public BountyResource(final BountyService bountyService,
                        final FundingService fundingService) {
    this.bountyService = bountyService;
    this.fundingService = fundingService;
  }

  /**
   * {@code POST  /bounties} : Create a new bounty.
   *
   * @param bountyDTO the bounty to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and
   *     with
   *         body the new bounty, or with status {@code 400 (Bad Request)} if
   * the bounty has already an ID.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping("/bounties")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
  public ResponseEntity<BountyDTO>
  createBounty(@RequestBody final BountyDTO bountyDTO)
      throws URISyntaxException {
    log.debug("REST request to save Bounty : {}", bountyDTO);
    if (bountyDTO.getId() != null) {
      throw new BadRequestAlertException(
          "A new bounty cannot already have an ID", ENTITY_NAME, "idexists");
    }
    final BountyDTO result = bountyService.save(bountyDTO);
    return ResponseEntity.created(new URI("/api/bounties/" + result.getId()))
        .headers(HeaderUtil.createEntityCreationAlert(
            applicationName, true, ENTITY_NAME, result.getId().toString()))
        .body(result);
  }

  /**
   * {@code POST  /bounties/:id/fundings} : Add funds to bounty.
   *
   * @param fundingDTO the fund to add to the bounty.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and
   *     with
   *         body the new bounty, or with status {@code 400 (Bad Request)} if
   * the bounty has already an ID.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping("/bounties/{id}/fundings")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
  public ResponseEntity<BountyDTO>
  addFunding(@PathVariable final Long id,
             @RequestBody final FundingDTO fundingDTO)
      throws URISyntaxException {
    log.debug("REST request to add funding to Bounty : {}", fundingDTO);
    if (fundingDTO.getId() != null) {
      throw new BadRequestAlertException("A new fund cannot already have an ID",
                                         "funding", "idexists");
    }
    final BountyDTO bountyDTO = bountyService.findOne(id);
    bountyDTO.addFundings(fundingDTO);
    final BountyDTO result = bountyService.save(bountyDTO);
    return ResponseEntity.created(new URI("/api/bounties/" + result.getId()))
        .headers(HeaderUtil.createEntityCreationAlert(
            applicationName, true, ENTITY_NAME, result.getId().toString()))
        .body(result);
  }

  /**
   * {@code PUT  /bounties} : Updates an existing bounty.
   *
   * @param bountyDTO the bounty to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
   *     body
   *         the updated bounty, or with status {@code 400 (Bad Request)} if the
   *         bounty is not valid, or with status
   *         {@code 500 (Internal Server Error)} if the bounty couldn't be
   *         updated.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PutMapping("/bounties")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
  public ResponseEntity<BountyDTO>
  updateBounty(@RequestBody final BountyDTO bountyDTO)
      throws URISyntaxException {
    log.debug("REST request to update Bounty : {}", bountyDTO);
    if (bountyDTO.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    final BountyDTO result = bountyService.save(bountyDTO);
    return ResponseEntity.ok()
        .headers(HeaderUtil.createEntityUpdateAlert(
            applicationName, true, ENTITY_NAME, bountyDTO.getId().toString()))
        .body(result);
  }

  /**
   * {@code GET  /bounties/all} : get all the bounties.
   *
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the
   *     list
   *         of bounties in body.
   */
  @GetMapping("/bounties/all")
  public ResponseEntity<List<BountyDTO>> getAllBounties() {
    log.debug("REST request to get all Bounties");
    return ResponseEntity.ok().body(bountyService.findAll());
  }

  /**
   * {@code GET  /bounties} : get all the bounties per page.
   *
   * @param pageable the pagination information.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the
   *     list of bounties in body.
   */
  @GetMapping("/bounties")
  public ResponseEntity<List<BountyDTO>>
  getAllBountiesPageable(Pageable pageable) {
    log.debug("REST request to get a page of Bounty");
    Page<BountyDTO> page = bountyService.findAll(pageable);
    HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(
        ServletUriComponentsBuilder.fromCurrentRequest(), page);
    return ResponseEntity.ok().headers(headers).body(page.getContent());
  }

  /**
   * {@code GET  /bounties/:id} : get the "id" bounty.
   *
   * @param id the id of the bounty to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
   *     body
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
        .headers(HeaderUtil.createEntityDeletionAlert(
            applicationName, true, ENTITY_NAME, id.toString()))
        .build();
  }

  /**
   * {@code DELETE  /bounties/:id/fundings} : Remove funds to bounty.
   *
   * @param fundingDTO the fund to add to the bounty.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and
   *     with
   *         body the new bounty, or with status {@code 400 (Bad Request)} if
   * the bounty has already an ID.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @DeleteMapping("/bounties/{id}/fundings")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
  public ResponseEntity<BountyDTO>
  removeFunding(@PathVariable final Long id,
                @RequestBody final FundingDTO fundingDTO)
      throws URISyntaxException {
    log.debug("REST request to remove funding from Bounty : {}", fundingDTO);
    if (fundingDTO.getId() != null) {
      throw new BadRequestAlertException("Invalid id", "funding", "idexists");
    }
    final BountyDTO bountyDTO = bountyService.findOne(id);
    bountyDTO.removeFundings(fundingDTO);
    fundingService.delete(fundingDTO.getId());
    final BountyDTO result = bountyService.save(bountyDTO);
    return ResponseEntity.created(new URI("/api/bounties/" + result.getId()))
        .headers(HeaderUtil.createEntityCreationAlert(
            applicationName, true, ENTITY_NAME, result.getId().toString()))
        .body(result);
  }

  /**
   * {@code SEARCH  /_search/bounties?query=:query} : search for the bounty
   * corresponding to the query.
   *
   * @param query the query of the bounty search.
   * @return the result of the search.
   */
  @GetMapping("/_search/bounties")
  public ResponseEntity<List<BountyDTO>>
  searchBounties(@RequestParam final String query) {
    log.debug("REST request to search Bounties for query {}", query);
    return ResponseEntity.ok().body(bountyService.search(query));
  }
}
