package org.muellners.bounties.repository.search;

import org.muellners.bounties.domain.Bounties;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Bounties} entity.
 */
public interface BountiesSearchRepository extends ElasticsearchRepository<Bounties, Long> {
}
