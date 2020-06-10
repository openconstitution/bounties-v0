package org.muellners.bounties.repository.search;

import org.muellners.bounties.service.dto.FundingDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Funding} entity.
 */
public interface FundingSearchRepository extends ElasticsearchRepository<FundingDTO, Long> {
}
