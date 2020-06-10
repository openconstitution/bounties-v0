package org.muellners.bounties.repository.search;

import org.muellners.bounties.service.dto.IssueDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface IssueSearchRepository extends ElasticsearchRepository<IssueDTO, Long> {

}
