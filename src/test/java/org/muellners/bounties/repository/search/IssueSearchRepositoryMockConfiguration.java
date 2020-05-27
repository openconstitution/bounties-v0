package org.muellners.bounties.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class IssueSearchRepositoryMockConfiguration {

  @MockBean private IssueSearchRepository mockIssueSearchRepository;
}
