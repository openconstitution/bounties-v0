package org.muellners.bounties.web.rest;

import org.muellners.bounties.RedisTestContainerExtension;
import org.muellners.bounties.BountiesApp;
import org.muellners.bounties.config.TestSecurityConfiguration;
import org.muellners.bounties.domain.Bounties;
import org.muellners.bounties.repository.BountiesRepository;
import org.muellners.bounties.repository.search.BountiesSearchRepository;

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
import java.math.BigDecimal;
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
 * Integration tests for the {@link BountiesResource} REST controller.
 */
@SpringBootTest(classes = { BountiesApp.class, TestSecurityConfiguration.class })
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class BountiesResourceIT {

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    @Autowired
    private BountiesRepository bountiesRepository;

    /**
     * This repository is mocked in the org.muellners.bounties.repository.search test package.
     *
     * @see org.muellners.bounties.repository.search.BountiesSearchRepositoryMockConfiguration
     */
    @Autowired
    private BountiesSearchRepository mockBountiesSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBountiesMockMvc;

    private Bounties bounties;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bounties createEntity(EntityManager em) {
        Bounties bounties = new Bounties()
            .status(DEFAULT_STATUS)
            .url(DEFAULT_URL)
            .amount(DEFAULT_AMOUNT)
            .type(DEFAULT_TYPE)
            .category(DEFAULT_CATEGORY);
        return bounties;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bounties createUpdatedEntity(EntityManager em) {
        Bounties bounties = new Bounties()
            .status(UPDATED_STATUS)
            .url(UPDATED_URL)
            .amount(UPDATED_AMOUNT)
            .type(UPDATED_TYPE)
            .category(UPDATED_CATEGORY);
        return bounties;
    }

    @BeforeEach
    public void initTest() {
        bounties = createEntity(em);
    }

    @Test
    @Transactional
    public void createBounties() throws Exception {
        int databaseSizeBeforeCreate = bountiesRepository.findAll().size();
        // Create the Bounties
        restBountiesMockMvc.perform(post("/api/bounties").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bounties)))
            .andExpect(status().isCreated());

        // Validate the Bounties in the database
        List<Bounties> bountiesList = bountiesRepository.findAll();
        assertThat(bountiesList).hasSize(databaseSizeBeforeCreate + 1);
        Bounties testBounties = bountiesList.get(bountiesList.size() - 1);
        assertThat(testBounties.isStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testBounties.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testBounties.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testBounties.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testBounties.getCategory()).isEqualTo(DEFAULT_CATEGORY);

        // Validate the Bounties in Elasticsearch
        verify(mockBountiesSearchRepository, times(1)).save(testBounties);
    }

    @Test
    @Transactional
    public void createBountiesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bountiesRepository.findAll().size();

        // Create the Bounties with an existing ID
        bounties.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBountiesMockMvc.perform(post("/api/bounties").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bounties)))
            .andExpect(status().isBadRequest());

        // Validate the Bounties in the database
        List<Bounties> bountiesList = bountiesRepository.findAll();
        assertThat(bountiesList).hasSize(databaseSizeBeforeCreate);

        // Validate the Bounties in Elasticsearch
        verify(mockBountiesSearchRepository, times(0)).save(bounties);
    }


    @Test
    @Transactional
    public void getAllBounties() throws Exception {
        // Initialize the database
        bountiesRepository.saveAndFlush(bounties);

        // Get all the bountiesList
        restBountiesMockMvc.perform(get("/api/bounties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bounties.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)));
    }
    
    @Test
    @Transactional
    public void getBounties() throws Exception {
        // Initialize the database
        bountiesRepository.saveAndFlush(bounties);

        // Get the bounties
        restBountiesMockMvc.perform(get("/api/bounties/{id}", bounties.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bounties.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY));
    }
    @Test
    @Transactional
    public void getNonExistingBounties() throws Exception {
        // Get the bounties
        restBountiesMockMvc.perform(get("/api/bounties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBounties() throws Exception {
        // Initialize the database
        bountiesRepository.saveAndFlush(bounties);

        int databaseSizeBeforeUpdate = bountiesRepository.findAll().size();

        // Update the bounties
        Bounties updatedBounties = bountiesRepository.findById(bounties.getId()).get();
        // Disconnect from session so that the updates on updatedBounties are not directly saved in db
        em.detach(updatedBounties);
        updatedBounties
            .status(UPDATED_STATUS)
            .url(UPDATED_URL)
            .amount(UPDATED_AMOUNT)
            .type(UPDATED_TYPE)
            .category(UPDATED_CATEGORY);

        restBountiesMockMvc.perform(put("/api/bounties").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBounties)))
            .andExpect(status().isOk());

        // Validate the Bounties in the database
        List<Bounties> bountiesList = bountiesRepository.findAll();
        assertThat(bountiesList).hasSize(databaseSizeBeforeUpdate);
        Bounties testBounties = bountiesList.get(bountiesList.size() - 1);
        assertThat(testBounties.isStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testBounties.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testBounties.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testBounties.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBounties.getCategory()).isEqualTo(UPDATED_CATEGORY);

        // Validate the Bounties in Elasticsearch
        verify(mockBountiesSearchRepository, times(1)).save(testBounties);
    }

    @Test
    @Transactional
    public void updateNonExistingBounties() throws Exception {
        int databaseSizeBeforeUpdate = bountiesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBountiesMockMvc.perform(put("/api/bounties").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bounties)))
            .andExpect(status().isBadRequest());

        // Validate the Bounties in the database
        List<Bounties> bountiesList = bountiesRepository.findAll();
        assertThat(bountiesList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Bounties in Elasticsearch
        verify(mockBountiesSearchRepository, times(0)).save(bounties);
    }

    @Test
    @Transactional
    public void deleteBounties() throws Exception {
        // Initialize the database
        bountiesRepository.saveAndFlush(bounties);

        int databaseSizeBeforeDelete = bountiesRepository.findAll().size();

        // Delete the bounties
        restBountiesMockMvc.perform(delete("/api/bounties/{id}", bounties.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bounties> bountiesList = bountiesRepository.findAll();
        assertThat(bountiesList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Bounties in Elasticsearch
        verify(mockBountiesSearchRepository, times(1)).deleteById(bounties.getId());
    }

    @Test
    @Transactional
    public void searchBounties() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        bountiesRepository.saveAndFlush(bounties);
        when(mockBountiesSearchRepository.search(queryStringQuery("id:" + bounties.getId())))
            .thenReturn(Collections.singletonList(bounties));

        // Search the bounties
        restBountiesMockMvc.perform(get("/api/_search/bounties?query=id:" + bounties.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bounties.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)));
    }
}
