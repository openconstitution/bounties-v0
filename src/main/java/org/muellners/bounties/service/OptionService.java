package org.muellners.bounties.service;

import org.muellners.bounties.domain.Option;
import org.muellners.bounties.service.dto.OptionDTO;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Service Implementation for managing {@link Option}.
 */
public interface OptionService {

	/**
	 * Save an option.
	 *
	 * @param optionDTO the entity to save.
	 * @return the persisted entity.
	 */
	OptionDTO save(final OptionDTO optionDTO);

	/**
	 * Get one bounty by id.
	 *
	 * @param id the id of the entity.
	 * @return the entity.
	 */
	@Transactional(readOnly = true)
	OptionDTO findOne(Long id);

	/**
	 * Get one bounty by id.
	 *
	 * @param key the id of the entity.
	 * @return the entity.
	 */
	@Transactional(readOnly = true)
	Option findOneByKey(String key);

	/**
	 * Fetch Information about the issue based on the link provided.
	 * @param link the link to parse
	 * @return description from the link.
	 */

	/**
	 * Get all the options.
	 *
	 * @return the list of entities.
	 */
	@Transactional(readOnly = true)
	List<Option> findOptionsByName(final String name);

	/**
	 * Fetch Information about the issue based on the link provided.
	 * @param link the link to parse
	 * @return description from the link.
	 */

	/**
	 * Get all the options.
	 *
	 * @return the list of entities.
	 */
	@Transactional(readOnly = true)
	List<OptionDTO> findAll();

	/**
	 * Delete the option by id.
	 *
	 * @param id the id of the entity.
	 */
	void delete(Long id);

	/**
	 * Search for the option corresponding to the query.
	 *
	 * @param query the query of the search.
	 *
	 * @return the list of entities.
	 */
	List<OptionDTO> search(String query);
}
