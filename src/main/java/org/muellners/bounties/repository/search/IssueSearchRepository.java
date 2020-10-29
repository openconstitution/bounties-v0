package org.muellners.bounties.repository.search;

import org.muellners.bounties.domain.Issue;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Issue} entity.
 */
public interface IssueSearchRepository extends ElasticsearchRepository<Issue, Long> {
}
