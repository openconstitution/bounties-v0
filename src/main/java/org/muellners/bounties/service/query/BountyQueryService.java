package org.muellners.bounties.service.query;

import io.github.jhipster.service.QueryService;
import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.domain.BountyKeyword_;
import org.muellners.bounties.domain.Bounty_;
import org.muellners.bounties.domain.Issue_;
import org.muellners.bounties.domain.Option_;
import org.muellners.bounties.repository.BountyRepository;
import org.muellners.bounties.service.criteria.BountyCriteria;
import org.muellners.bounties.service.dto.BountyDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.JoinType;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for executing complex queries for [Option] entities in the database.
 * The main input is a [OptionCriteria] which gets converted to [Specification],
 * in a way that all the filters must apply.
 * It returns a [MutableList] of [Option] or a [Page] of [Option] which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class BountyQueryService extends QueryService<Bounty> {

	private final Logger log = LoggerFactory.getLogger(BountyQueryService.class);

	private BountyRepository bountyRepository;

	public BountyQueryService(final BountyRepository bountyRepository) {
		this.bountyRepository = bountyRepository;
	}


	/**
	 * Return a [MutableList] of [Option] which matches the criteria from the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the matching entities.
	 */
	@Transactional(readOnly = true)
	public List<BountyDTO> findByCriteria(BountyCriteria criteria) {
		log.debug("find by criteria : {}", criteria);
		Specification<Bounty> specification = createSpecification(criteria);
		return bountyRepository.findAll(specification).stream()
				.map(BountyDTO::new)
				.collect(Collectors.toList());
	}

	/**
	 * Return a [Page] of [Option] which matches the criteria from the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @param page The page, which should be returned.
	 * @return the matching entities.
	 */
	@Transactional(readOnly = true)
	public Page<Bounty> findByCriteria(BountyCriteria criteria, Pageable page) {
		log.debug("find by criteria : {}, page: {}", criteria, page);
		Specification<Bounty> specification = createSpecification(criteria);
		return bountyRepository.findAll(specification, page);
	}

	/**
	 * Return the number of matching entities in the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the number of matching entities.
	 */
	@Transactional(readOnly = true)
	public Long countByCriteria(BountyCriteria criteria) {
		log.debug("count by criteria : {}", criteria);
		Specification<Bounty> specification = createSpecification(criteria);
		return bountyRepository.count(specification);
	}

	public List<Bounty> search(String query) {
		// TODO
		return null;
	}

	/**
	 * Function to convert [OptionCriteria] to a [Specification].
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the matching [Specification] of the entity.
	 */
	protected Specification<Bounty> createSpecification(BountyCriteria criteria) {
		Specification<Bounty> specification = Specification.where(null);
		if (criteria != null) {
			if (criteria.getId() != null) {
				specification = specification.and(buildRangeSpecification(criteria.getId(), Bounty_.id));
			}
			if (criteria.getSummary() != null) {
				specification = specification.and(buildStringSpecification(criteria.getSummary(), Bounty_.summary));
			}
			if (criteria.getDescription() != null) {
				specification = specification.and(buildStringSpecification(criteria.getDescription(), Bounty_.description));
			}
			if (criteria.getAmount() != null) {
				specification = specification.and(buildRangeSpecification(criteria.getAmount(), Bounty_.amount));
			}
			if (criteria.getIssueId() != null) {
				specification = specification.and(buildSpecification(criteria.getIssueId(),
						(root) -> root.join(Bounty_.issue, JoinType.LEFT).get(Issue_.id)));
			}
			if (criteria.getStatusId() != null) {
				specification = specification.and(buildSpecification(criteria.getStatusId(),
						(root) -> root.join(Bounty_.status, JoinType.LEFT).get(Option_.id)));
			}
			if (criteria.getCategoryId() != null) {
				specification = specification.and(buildSpecification(criteria.getCategoryId(),
						(root) -> root.join(Bounty_.category, JoinType.LEFT).get(Option_.id)));
			}
			if (criteria.getTypeId() != null) {
				specification = specification.and(buildSpecification(criteria.getTypeId(),
						(root) -> root.join(Bounty_.type, JoinType.LEFT).get(Option_.id)));
			}
			if (criteria.getExperienceId() != null) {
				specification = specification.and(buildSpecification(criteria.getExperienceId(),
						(root) -> root.join(Bounty_.experience, JoinType.LEFT).get(Option_.id)));
			}
			if (criteria.getCommitmentId() != null) {
				specification = specification.and(buildSpecification(criteria.getCommitmentId(),
						(root) -> root.join(Bounty_.commitment, JoinType.LEFT).get(Option_.id)));
			}
			if (criteria.getPermission() != null) {
				specification = specification.and(buildSpecification(criteria.getPermission(), Bounty_.permission));
			}
			if (criteria.getExpiryDate() != null) {
				specification = specification.and(buildRangeSpecification(criteria.getExpiryDate(), Bounty_.expiryDate));
			}
			if (criteria.getKeywordsId() != null) {
				specification = specification.and(buildSpecification(criteria.getKeywordsId(),
						(root) -> root.join(Bounty_.keywords, JoinType.RIGHT).get(String.valueOf(BountyKeyword_.id))));
			}
			if (criteria.getHunterId() != null) {
				specification = specification.and(buildRangeSpecification(criteria.getHunterId(), Bounty_.id));
			}
			if (criteria.getFundsId() != null) {
				specification = specification.and(buildRangeSpecification(criteria.getFundsId(), Bounty_.id));
			}
		}
		return specification;
	}

}
