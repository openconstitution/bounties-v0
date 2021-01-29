package org.muellners.bounties.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.muellners.bounties.domain.Option;
import org.muellners.bounties.service.OptionService;
import org.muellners.bounties.service.criteria.OptionCriteria;
import org.muellners.bounties.service.dto.OptionDTO;
import org.muellners.bounties.service.query.OptionQueryService;
import org.muellners.bounties.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing [cm.pwork.schoolman.domain.Option].
 */
@RestController
@RequestMapping("/api")
public class OptionResource {

	private Logger log = LoggerFactory.getLogger(OptionResource.class);

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private static final String ENTITY_NAME = "option";

	private OptionService optionService;
	private OptionQueryService optionQueryService;

	public OptionResource(final OptionService optionService,
	                      final OptionQueryService optionQueryService) {
		this.optionService = optionService;
		this.optionQueryService = optionQueryService;
	}

	/**
	 * `POST  /options` : Create a new option.
	 *
	 * @param option the option to create.
	 * @return the [ResponseEntity] with status `201 (Created)` and with body the new option, or with status `400 (Bad Request)` if the option has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/options")
	public ResponseEntity<OptionDTO> createOption(@Valid @RequestBody OptionDTO option) throws URISyntaxException {
		log.debug("REST request to save Option : {}", option);
		if (option.getId() != null) {
			throw new BadRequestAlertException(
					"A new option cannot already have an ID",
					ENTITY_NAME, "idexists"
			);
		}
		final OptionDTO result = optionService.save(option);
		return ResponseEntity.created(new URI("/api/options/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * `PUT  /options` : Updates an existing option.
	 *
	 * @param option the option to update.
	 * @return the [ResponseEntity] with status `200 (OK)` and with body the updated option,
	 * or with status `400 (Bad Request)` if the option is not valid,
	 * or with status `500 (Internal Server Error)` if the option couldn't be updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/options")
	public ResponseEntity<OptionDTO> updateOption(@Valid @RequestBody OptionDTO option) {
		log.debug("REST request to update Option : {}", option);
		if (option.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		final OptionDTO result = optionService.save(option);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, option.getId().toString()))
				.body(result);
	}
	/**
	 * `GET  /options` : get all the options.
	 *

	 * @param criteria the criteria which the requested entities should match.
	 * @return the [ResponseEntity] with status `200 (OK)` and the list of options in body.
	 */
	@GetMapping("/options")
	public ResponseEntity<List<OptionDTO>> getAllOptions(@RequestParam(name = "criteria", required = false) OptionCriteria criteria) {
		log.debug("REST request to get Options by criteria: {}", criteria);
		final List<OptionDTO> entityList = optionQueryService.findByCriteria(criteria);
		return ResponseEntity.ok().body(entityList);
	}

	/**
	 * `GET  /options/count}` : count all the options.
	 *
	 * @param criteria the criteria which the requested entities should match.
	 * @return the [ResponseEntity] with status `200 (OK)` and the count in body.
	 */
	@GetMapping("/options/count")
	public ResponseEntity<Long> countOptions(@RequestParam(name = "criteria", required = false) OptionCriteria criteria) {
		log.debug("REST request to count Options by criteria: {}", criteria);
		return ResponseEntity.ok().body(optionQueryService.countByCriteria(criteria));
	}

	/**
	 * `GET  /options/:id` : get the "id" option.
	 *
	 * @param id the id of the option to retrieve.
	 * @return the [ResponseEntity] with status `200 (OK)` and with body the option, or with status `404 (Not Found)`.
	 */
	@GetMapping("/options/{id}")
	ResponseEntity<OptionDTO> getOption(@PathVariable Long id) {
		log.debug("REST request to get Option : {}", id);
		final OptionDTO option = optionService.findOne(id);
		return ResponseUtil.wrapOrNotFound(Optional.of(option));
	}
	/**
	 *  `DELETE  /options/:id` : delete the "id" option.
	 *
	 * @param id the id of the option to delete.
	 * @return the [ResponseEntity] with status `204 (NO_CONTENT)`.
	 */
	@DeleteMapping("/options/{id}")
	public ResponseEntity<Void> deleteOption(@PathVariable Long id) {
		log.debug("REST request to delete Option : {}", id);

		optionService.delete(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
	}

	/**
	 * `SEARCH  /_search/options?q=:query` : search for the option corresponding
	 * to the query.
	 *
	 * @param query the query of the option search.
	 * @return the result of the search.
	 */
	@GetMapping("/_search/options")
	public ResponseEntity<List<Option>> searchOptions(@RequestParam("q") String query) {
		log.debug("REST request to search Options for query {}", query);
		return ResponseEntity.ok().body(optionQueryService.search(query));
	}

}
