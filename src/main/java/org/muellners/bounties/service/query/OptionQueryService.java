package org.muellners.bounties.service.query;

import io.github.jhipster.service.QueryService;
import org.muellners.bounties.domain.Option;
import org.muellners.bounties.domain.Option_;
import org.muellners.bounties.repository.OptionRepository;
import org.muellners.bounties.service.criteria.OptionCriteria;
import org.muellners.bounties.service.dto.OptionDTO;
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
public class OptionQueryService extends QueryService<Option> {

	private final Logger log = LoggerFactory.getLogger(OptionQueryService.class);

	private OptionRepository optionRepository;

	public OptionQueryService(final OptionRepository optionRepository) {
		this.optionRepository = optionRepository;
	}


	/**
	 * Return a [MutableList] of [Option] which matches the criteria from the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the matching entities.
	 */
	@Transactional(readOnly = true)
	public List<OptionDTO> findByCriteria(OptionCriteria criteria) {
		log.debug("find by criteria : {}", criteria);
		Specification<Option> specification = createSpecification(criteria);
		return optionRepository.findAll(specification).stream()
				.map(OptionDTO::new)
				.collect(Collectors.toList());
	}

	/**
	 * Return a [Page] of [Option] which matches the criteria from the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @param page The page, which should be returned.
	 * @return the matching entities.
	 */
	@Transactional(readOnly = true)
	public Page<Option> findByCriteria(OptionCriteria criteria, Pageable page) {
		log.debug("find by criteria : {}, page: {}", criteria, page);
		Specification<Option> specification = createSpecification(criteria);
		return optionRepository.findAll(specification, page);
	}

	/**
	 * Return the number of matching entities in the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the number of matching entities.
	 */
	@Transactional(readOnly = true)
	public Long countByCriteria(OptionCriteria criteria) {
		log.debug("count by criteria : {}", criteria);
		Specification<Option> specification = createSpecification(criteria);
		return optionRepository.count(specification);
	}

	public List<Option> search(String query) {
		// TODO
		return null;
	}

	/**
	 * Function to convert [OptionCriteria] to a [Specification].
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the matching [Specification] of the entity.
	 */
	protected Specification<Option> createSpecification(OptionCriteria criteria) {
		Specification<Option> specification = Specification.where(null);
		if (criteria != null) {
			if (criteria.getId() != null) {
				specification = specification.and(buildRangeSpecification(criteria.getId(), Option_.id));
			}
			if (criteria.getName() != null) {
				specification = specification.and(buildStringSpecification(criteria.getName(), Option_.name));
			}
			if (criteria.getKey() != null) {
				specification = specification.and(buildStringSpecification(criteria.getKey(), Option_.key));
			}
			if (criteria.getValue() != null) {
				specification = specification.and(buildStringSpecification(criteria.getValue(), Option_.value));
			}
		}
		return specification;
	}

}
