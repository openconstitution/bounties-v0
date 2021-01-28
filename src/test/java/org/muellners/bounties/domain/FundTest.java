package org.muellners.bounties.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.muellners.bounties.web.rest.TestUtil;

public class FundTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fund.class);
        Fund fund1 = new Fund();
        fund1.setId(1L);
        Fund fund2 = new Fund();
        fund2.setId(fund1.getId());
        assertThat(fund1).isEqualTo(fund2);
        fund2.setId(2L);
        assertThat(fund1).isNotEqualTo(fund2);
        fund1.setId(null);
        assertThat(fund1).isNotEqualTo(fund2);
    }
}
