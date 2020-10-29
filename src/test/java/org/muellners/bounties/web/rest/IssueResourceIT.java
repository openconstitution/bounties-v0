package org.muellners.bounties.web.rest;

import org.muellners.bounties.RedisTestContainerExtension;
import org.muellners.bounties.BountiesApp;
import org.muellners.bounties.config.TestSecurityConfiguration;
import org.muellners.bounties.domain.Issue;
import org.muellners.bounties.repository.IssueRepository;
import org.muellners.bounties.repository.search.IssueSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link IssueResource} REST controller.
 */
@SpringBootTest(classes = { BountiesApp.class, TestSecurityConfiguration.class })
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class IssueResourceIT {

    private static final String DEFAULT_ISSUE_ID = "AAAAAAAAAA";
    private static final String UPDATED_ISSUE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private IssueRepository issueRepository;

    /**
     * This repository is mocked in the org.muellners.bounties.repository.search test package.
     *
     * @see org.muellners.bounties.repository.search.IssueSearchRepositoryMockConfiguration
     */
    @Autowired
    private IssueSearchRepository mockIssueSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIssueMockMvc;

    private Issue issue;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Issue createEntity(EntityManager em) {
        Issue issue = new Issue()
            .issueId(DEFAULT_ISSUE_ID)
            .url(DEFAULT_URL)
            .description(DEFAULT_DESCRIPTION);
        return issue;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Issue createUpdatedEntity(EntityManager em) {
        Issue issue = new Issue()
            .issueId(UPDATED_ISSUE_ID)
            .url(UPDATED_URL)
            .description(UPDATED_DESCRIPTION);
        return issue;
    }

    @BeforeEach
    public void initTest() {
        issue = createEntity(em);
    }

    @Test
    @Transactional
    public void createIssue() throws Exception {
        int databaseSizeBeforeCreate = issueRepository.findAll().size();
        // Create the Issue
        restIssueMockMvc.perform(post("/api/issues").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(issue)))
            .andExpect(status().isCreated());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeCreate + 1);
        Issue testIssue = issueList.get(issueList.size() - 1);
        assertThat(testIssue.getIssueId()).isEqualTo(DEFAULT_ISSUE_ID);
        assertThat(testIssue.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testIssue.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the Issue in Elasticsearch
        verify(mockIssueSearchRepository, times(1)).save(testIssue);
    }

    @Test
    @Transactional
    public void createIssueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = issueRepository.findAll().size();

        // Create the Issue with an existing ID
        issue.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIssueMockMvc.perform(post("/api/issues").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(issue)))
            .andExpect(status().isBadRequest());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeCreate);

        // Validate the Issue in Elasticsearch
        verify(mockIssueSearchRepository, times(0)).save(issue);
    }


    @Test
    @Transactional
    public void getAllIssues() throws Exception {
        // Initialize the database
        issueRepository.saveAndFlush(issue);

        // Get all the issueList
        restIssueMockMvc.perform(get("/api/issues?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(issue.getId().intValue())))
            .andExpect(jsonPath("$.[*].issueId").value(hasItem(DEFAULT_ISSUE_ID)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getIssue() throws Exception {
        // Initialize the database
        issueRepository.saveAndFlush(issue);

        // Get the issue
        restIssueMockMvc.perform(get("/api/issues/{id}", issue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(issue.getId().intValue()))
            .andExpect(jsonPath("$.issueId").value(DEFAULT_ISSUE_ID))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingIssue() throws Exception {
        // Get the issue
        restIssueMockMvc.perform(get("/api/issues/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIssue() throws Exception {
        // Initialize the database
        issueRepository.saveAndFlush(issue);

        int databaseSizeBeforeUpdate = issueRepository.findAll().size();

        // Update the issue
        Issue updatedIssue = issueRepository.findById(issue.getId()).get();
        // Disconnect from session so that the updates on updatedIssue are not directly saved in db
        em.detach(updatedIssue);
        updatedIssue
            .issueId(UPDATED_ISSUE_ID)
            .url(UPDATED_URL)
            .description(UPDATED_DESCRIPTION);

        restIssueMockMvc.perform(put("/api/issues").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedIssue)))
            .andExpect(status().isOk());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeUpdate);
        Issue testIssue = issueList.get(issueList.size() - 1);
        assertThat(testIssue.getIssueId()).isEqualTo(UPDATED_ISSUE_ID);
        assertThat(testIssue.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testIssue.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the Issue in Elasticsearch
        verify(mockIssueSearchRepository, times(1)).save(testIssue);
    }

    @Test
    @Transactional
    public void updateNonExistingIssue() throws Exception {
        int databaseSizeBeforeUpdate = issueRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIssueMockMvc.perform(put("/api/issues").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(issue)))
            .andExpect(status().isBadRequest());

        // Validate the Issue in the database
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Issue in Elasticsearch
        verify(mockIssueSearchRepository, times(0)).save(issue);
    }

    @Test
    @Transactional
    public void deleteIssue() throws Exception {
        // Initialize the database
        issueRepository.saveAndFlush(issue);

        int databaseSizeBeforeDelete = issueRepository.findAll().size();

        // Delete the issue
        restIssueMockMvc.perform(delete("/api/issues/{id}", issue.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Issue> issueList = issueRepository.findAll();
        assertThat(issueList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Issue in Elasticsearch
        verify(mockIssueSearchRepository, times(1)).deleteById(issue.getId());
    }

    @Test
    @Transactional
    public void searchIssue() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        issueRepository.saveAndFlush(issue);
        when(mockIssueSearchRepository.search(queryStringQuery("id:" + issue.getId())))
            .thenReturn(Collections.singletonList(issue));

        // Search the issue
        restIssueMockMvc.perform(get("/api/_search/issues?query=id:" + issue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(issue.getId().intValue())))
            .andExpect(jsonPath("$.[*].issueId").value(hasItem(DEFAULT_ISSUE_ID)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
}
