package org.muellners.bounties.repository.search;

import org.muellners.bounties.domain.Issue;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface IssueSearchRepository extends ElasticsearchRepository<Issue, Long> {
    
}