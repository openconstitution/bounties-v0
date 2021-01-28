package org.muellners.bounties.service;

import org.muellners.bounties.domain.Fund;
import org.muellners.bounties.service.dto.FundDTO;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Service Implementation for managing {@link Fund}.
 */
public interface FundService {

	/**
	 * Save a fund.
	 *
	 * @param fundDTO the entity to save.
	 * @return the persisted entity.
	 */
	FundDTO save(final FundDTO fundDTO);

	/**
	 * Get all the funds.
	 *
	 * @return the list of entities.
	 */
	@Transactional(readOnly = true)
	List<FundDTO> findAll();

	/**
	 * Get one fund by id.
	 *
	 * @param id the id of the entity.
	 * @return the entity.
	 */
	@Transactional(readOnly = true)
	FundDTO findOne(Long id);

	/**
	 * Delete the fund by id.
	 *
	 * @param id the id of the entity.
	 */
	void delete(Long id);

	/**
	 * Search for the fund corresponding to the query.
	 *
	 * @param query the query of the search.
	 * @return the list of entities.
	 */
	@Transactional(readOnly = true)
	List<FundDTO> search(String query);

}
