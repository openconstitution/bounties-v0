package org.muellners.bounties.service;

import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.domain.enumeration.Status;
import org.muellners.bounties.service.dto.BountyDTO;
import org.muellners.bounties.service.dto.FundDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
/**
 * Service Implementation for managing {@link Bounty}.
 */
public interface BountyService {

	/**
	 * Save a bounty.
	 *
	 * @param bountyDTO the entity to save.
	 * @return the persisted entity.
	 */
	BountyDTO save(final BountyDTO bountyDTO);

	/**
	 * Fetch Information about the issue based on the link provided.
	 * @param link the link to parse
	 * @return description from the link.
	 */

	/**
	 * Get all the bounty.
	 *
	 * @return the list of entities.
	 */
	@Transactional(readOnly = true)
	List<BountyDTO> findAll();

	/**
	 * Get all the bounty per page.
	 *
	 * @return the list of entities.
	 */
	@Transactional(readOnly = true)
	Page<BountyDTO> findAll(Pageable pageable);

	/**
	 * Get all the bounty by user by status.
	 *
	 * @return the list of entities.
	 */
	@Transactional(readOnly = true)
	List<BountyDTO> findAllByUserByStatus(Status status, String hunterLogin);

	/**
	 * Get one bounty by id.
	 *
	 * @param id the id of the entity.
	 * @return the entity.
	 */
	@Transactional(readOnly = true)
	BountyDTO findOne(Long id);

	/**
	 * Add funds to one bounty by id.
	 *
	 * @param id the id of the bounty.
	 * @param funds the funds to be added to the bounty
	 * @return the entity.
	 */
	@Transactional(readOnly = true)
	BountyDTO addFunds(final Long id, final List<FundDTO> funds);

	/**
	 * Remove funds to one bounty by id.
	 *
	 * @param id the id of the bounty.
	 * @param funds the funds to be removed from the bounty
	 * @return the entity.
	 */
	@Transactional(readOnly = true)
	BountyDTO removeFunds(final Long id, final List<FundDTO> funds);

	/**
	 * Delete the bounty by id.
	 *
	 * @param id the id of the entity.
	 */
	void delete(Long id);

	/**
	 * Search for the bounty corresponding to the query.
	 *
	 * @param query the query of the search.
	 * @return the list of entities.
	 */
	@Transactional(readOnly = true)
	List<BountyDTO> search(String query);
}
