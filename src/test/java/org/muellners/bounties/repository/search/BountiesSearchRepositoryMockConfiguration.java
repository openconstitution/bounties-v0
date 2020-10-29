package org.muellners.bounties.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link BountiesSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class BountiesSearchRepositoryMockConfiguration {

    @MockBean
    private BountiesSearchRepository mockBountiesSearchRepository;

}
