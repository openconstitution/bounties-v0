package org.muellners.bounties.service.query;

import io.github.jhipster.service.QueryService;
import org.muellners.bounties.domain.Profile;
import org.muellners.bounties.domain.Profile_;
import org.muellners.bounties.repository.ProfileRepository;
import org.muellners.bounties.service.criteria.ProfileCriteria;
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
public class ProfileQueryService extends QueryService<Profile> {

	private final Logger log = LoggerFactory.getLogger(ProfileQueryService.class);

	private ProfileRepository profileRepository;

	public ProfileQueryService(final ProfileRepository profileRepository) {
		this.profileRepository = profileRepository;
	}


	/**
	 * Return a [MutableList] of [Option] which matches the criteria from the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the matching entities.
	 */
	@Transactional(readOnly = true)
	public List<Profile> findByCriteria(ProfileCriteria criteria) {
		log.debug("find by criteria : {}", criteria);
		Specification<Profile> specification = createSpecification(criteria);
		return profileRepository.findAll(specification);
	}

	/**
	 * Return a [Page] of [Option] which matches the criteria from the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @param page The page, which should be returned.
	 * @return the matching entities.
	 */
	@Transactional(readOnly = true)
	public Page<Profile> findByCriteria(ProfileCriteria criteria, Pageable page) {
		log.debug("find by criteria : {}, page: {}", criteria, page);
		Specification<Profile> specification = createSpecification(criteria);
		return profileRepository.findAll(specification, page);
	}

	/**
	 * Return the number of matching entities in the database.
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the number of matching entities.
	 */
	@Transactional(readOnly = true)
	public Long countByCriteria(ProfileCriteria criteria) {
		log.debug("count by criteria : {}", criteria);
		Specification<Profile> specification = createSpecification(criteria);
		return profileRepository.count(specification);
	}

	public List<Profile> search(String query) {
		// TODO
		return null;
	}

	/**
	 * Function to convert [OptionCriteria] to a [Specification].
	 * @param criteria The object which holds all the filters, which the entities should match.
	 * @return the matching [Specification] of the entity.
	 */
	protected Specification<Profile> createSpecification(ProfileCriteria criteria) {
		Specification<Profile> specification = Specification.where(null);
		if (criteria != null) {
			if (criteria.getId() != null) {
				specification = specification.and(buildRangeSpecification(criteria.getId(), Profile_.id));
			}
			if (criteria.getVotes() != null) {
				specification = specification.and(buildRangeSpecification(criteria.getVotes(), Profile_.votes));
			}
			if (criteria.getProfileLink() != null) {
				specification = specification.and(buildStringSpecification(criteria.getProfileLink(), Profile_.profileLink));
			}
			if (criteria.getAbout() != null) {
				specification = specification.and(buildStringSpecification(criteria.getAbout(), Profile_.about));
			}
			if (criteria.getGithubEmail() != null) {
				specification = specification.and(buildStringSpecification(criteria.getGithubEmail(), Profile_.githubEmail));
			}
			if (criteria.getGithubOrgName() != null) {
				specification = specification.and(buildStringSpecification(criteria.getGithubOrgName(), Profile_.githubOrgName));
			}
		}
		return specification;
	}

}
