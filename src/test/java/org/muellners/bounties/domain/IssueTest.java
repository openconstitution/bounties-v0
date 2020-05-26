package org.muellners.bounties.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.muellners.bounties.web.rest.TestUtil;

public class IssueTest {
    
    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Issue.class);
        Issue issue1 = new Issue();
        issue1.setId(1L);
        Issue issue2 = new Issue();
        issue2.setId(issue1.getId());
        assertThat(issue1).isEqualTo(issue2);
        issue2.setId(2L);
        assertThat(issue1).isNotEqualTo(issue2);
        issue1.setId(null);
        assertThat(issue1).isNotEqualTo(issue2);
    }
}