package org.muellners.bounties.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.muellners.bounties.web.rest.TestUtil;

public class BountiesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bounties.class);
        Bounties bounties1 = new Bounties();
        bounties1.setId(1L);
        Bounties bounties2 = new Bounties();
        bounties2.setId(bounties1.getId());
        assertThat(bounties1).isEqualTo(bounties2);
        bounties2.setId(2L);
        assertThat(bounties1).isNotEqualTo(bounties2);
        bounties1.setId(null);
        assertThat(bounties1).isNotEqualTo(bounties2);
    }
}
