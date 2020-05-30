package org.muellners.bounties.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.muellners.bounties.web.rest.TestUtil;

public class BountyTest {

  @Test
  public void equalsVerifier() throws Exception {
    TestUtil.equalsVerifier(Bounty.class);
    Bounty bounty1 = new Bounty();
    bounty1.setId(1L);
    Bounty bounty2 = new Bounty();
    bounty2.setId(bounty1.getId());
    assertThat(bounty1).isEqualTo(bounty2);
    bounty2.setId(2L);
    assertThat(bounty1).isNotEqualTo(bounty2);
    bounty1.setId(null);
    assertThat(bounty1).isNotEqualTo(bounty2);
  }
}
