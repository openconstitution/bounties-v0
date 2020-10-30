package org.muellners.bounties.repository.search;

import org.muellners.bounties.domain.Bounty;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Bounty} entity.
 */
public interface BountySearchRepository
    extends ElasticsearchRepository<Bounty, Long> {}
