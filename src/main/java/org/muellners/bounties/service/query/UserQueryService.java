package org.muellners.bounties.service.query;

import io.github.jhipster.service.QueryService;
import org.muellners.bounties.domain.Profile_;
import org.muellners.bounties.domain.User;
import org.muellners.bounties.domain.User_;
import org.muellners.bounties.repository.UserRepository;
import org.muellners.bounties.service.criteria.UserCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.JoinType;
import java.util.List;

/**
 * Service for executing complex queries for [Option] entities in the database.
 * The main input is a [OptionCriteria] which gets converted to [Specification],
 * in a way that all the filters must apply.
 * It returns a [MutableList] of [Option] or a [Page] of [Option] which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class UserQueryService extends QueryService<User> {

	private final Logger log = LoggerFactory.getLogger(UserQueryService.class);

	private UserRepository userRepository;

	public UserQueryService(final UserRepository userRepository) {
		this.userRepository = userRepository;
	}


	/**
	 * Return a [MutableList] of [Option] which matches the criteria from the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the matching entities.
	 */
	@Transactional(readOnly = true)
	public List<User> findByCriteria(UserCriteria criteria) {
		log.debug("find by criteria : {}", criteria);
		Specification<User> specification = createSpecification(criteria);
		return userRepository.findAll(specification);
	}

	/**
	 * Return a [Page] of [Option] which matches the criteria from the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @param page The page, which should be returned.
	 * @return the matching entities.
	 */
	@Transactional(readOnly = true)
	public Page<User> findByCriteria(UserCriteria criteria, Pageable page) {
		log.debug("find by criteria : {}, page: {}", criteria, page);
		Specification<User> specification = createSpecification(criteria);
		return userRepository.findAll(specification, page);
	}

	/**
	 * Return the number of matching entities in the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the number of matching entities.
	 */
	@Transactional(readOnly = true)
	public Long countByCriteria(UserCriteria criteria) {
		log.debug("count by criteria : {}", criteria);
		Specification<User> specification = createSpecification(criteria);
		return userRepository.count(specification);
	}

	public List<User> search(String query) {
		// TODO
		return null;
	}

	/**
	 * Function to convert [OptionCriteria] to a [Specification].
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the matching [Specification] of the entity.
	 */
	protected Specification<User> createSpecification(UserCriteria criteria) {
		Specification<User> specification = Specification.where(null);
		if (criteria != null) {
			if (criteria.getLogin() != null) {
				specification = specification.and(buildStringSpecification(criteria.getLogin(), User_.login));
			}
			if (criteria.getFirstName() != null) {
				specification = specification.and(buildStringSpecification(criteria.getFirstName(), User_.firstName));
			}
			if (criteria.getLastName() != null) {
				specification = specification.and(buildStringSpecification(criteria.getLastName(), User_.lastName));
			}
			if (criteria.getEmail() != null) {
				specification = specification.and(buildStringSpecification(criteria.getEmail(), User_.email));
			}
			if (criteria.getId() != null) {
				specification = specification.and(buildSpecification(criteria.getProfileId(),
						(root) -> root.join(User_.profile, JoinType.LEFT).get(Profile_.id)));
			}
		}
		return specification;
	}

}
