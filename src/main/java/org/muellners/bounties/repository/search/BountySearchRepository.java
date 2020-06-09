package org.muellners.bounties.repository.search;

import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.service.dto.BountiesDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link BountiesDTO} entity.
 */
public interface BountySearchRepository extends ElasticsearchRepository<BountiesDTO, Long> {
}
