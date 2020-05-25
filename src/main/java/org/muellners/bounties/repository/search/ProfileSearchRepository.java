package org.muellners.bounties.repository.search;

import org.muellners.bounties.domain.Profile;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Profile} entity.
 */
public interface ProfileSearchRepository extends ElasticsearchRepository<Profile, Long> {
}
