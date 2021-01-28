package org.muellners.bounties.service.query;

import io.github.jhipster.service.QueryService;
import org.muellners.bounties.domain.Fund;
import org.muellners.bounties.domain.Fund_;
import org.muellners.bounties.repository.FundRepository;
import org.muellners.bounties.service.criteria.FundCriteria;
import org.muellners.bounties.service.dto.FundDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
public class FundQueryService extends QueryService<Fund> {

	private final Logger log = LoggerFactory.getLogger(FundQueryService.class);

	private final FundRepository fundRepository;

	public FundQueryService(final FundRepository fundRepository) {
		this.fundRepository = fundRepository;
	}


	/**
	 * Return a [MutableList] of [Option] which matches the criteria from the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the matching entities.
	 */
	@Transactional(readOnly = true)
	public List<FundDTO> findByCriteria(FundCriteria criteria) {
		log.debug("find by criteria : {}", criteria);
		Specification<Fund> specification = createSpecification(criteria);
		return fundRepository.findAll(specification).stream()
				.map(FundDTO::new)
				.collect(Collectors.toList());
	}

	/**
	 * Return a [Page] of [Option] which matches the criteria from the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @param page The page, which should be returned.
	 * @return the matching entities.
	 */
	@Transactional(readOnly = true)
	public Page<Fund> findByCriteria(FundCriteria criteria, Pageable page) {
		log.debug("find by criteria : {}, page: {}", criteria, page);
		Specification<Fund> specification = createSpecification(criteria);
		return fundRepository.findAll(specification, page);
	}

	/**
	 * Return the number of matching entities in the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the number of matching entities.
	 */
	@Transactional(readOnly = true)
	public Long countByCriteria(FundCriteria criteria) {
		log.debug("count by criteria : {}", criteria);
		Specification<Fund> specification = createSpecification(criteria);
		return this.fundRepository.count(specification);
	}

	public List<Fund> search(String query) {
		// TODO
		return null;
	}

	/**
	 * Function to convert [OptionCriteria] to a [Specification].
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the matching [Specification] of the entity.
	 */
	protected Specification<Fund> createSpecification(FundCriteria criteria) {
		Specification<Fund> specification = Specification.where(null);
		if (criteria != null) {
			if (criteria.getId() != null) {
				specification = specification.and(buildRangeSpecification(criteria.getId(), Fund_.id));
			}
			if (criteria.getAmount() != null) {
				specification = specification.and(buildRangeSpecification(criteria.getAmount(), Fund_.amount));
			}
			if (criteria.getMode() != null) {
				specification = specification.and(buildStringSpecification(criteria.getMode(), Fund_.mode));
			}
			if (criteria.getPaymentIntentId() != null) {
				specification = specification.and(buildStringSpecification(criteria.getPaymentIntentId(), Fund_.paymentIntentId));
			}
			if (criteria.getPaymentAuth() != null) {
				specification = specification.and(buildSpecification(criteria.getPaymentAuth(), Fund_.paymentAuth));
			}
		}
		return specification;
	}

}
