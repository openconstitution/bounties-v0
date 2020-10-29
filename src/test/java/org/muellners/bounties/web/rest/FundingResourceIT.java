package org.muellners.bounties.web.rest;

import org.muellners.bounties.RedisTestContainerExtension;
import org.muellners.bounties.BountiesApp;
import org.muellners.bounties.config.TestSecurityConfiguration;
import org.muellners.bounties.domain.Funding;
import org.muellners.bounties.repository.FundingRepository;
import org.muellners.bounties.repository.search.FundingSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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
 * Integration tests for the {@link FundingResource} REST controller.
 */
@SpringBootTest(classes = { BountiesApp.class, TestSecurityConfiguration.class })
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class FundingResourceIT {

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final String DEFAULT_MODE = "AAAAAAAAAA";
    private static final String UPDATED_MODE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PAYMENT_AUTH = false;
    private static final Boolean UPDATED_PAYMENT_AUTH = true;

    @Autowired
    private FundingRepository fundingRepository;

    /**
     * This repository is mocked in the org.muellners.bounties.repository.search test package.
     *
     * @see org.muellners.bounties.repository.search.FundingSearchRepositoryMockConfiguration
     */
    @Autowired
    private FundingSearchRepository mockFundingSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFundingMockMvc;

    private Funding funding;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Funding createEntity(EntityManager em) {
        Funding funding = new Funding()
            .amount(DEFAULT_AMOUNT)
            .mode(DEFAULT_MODE)
            .paymentAuth(DEFAULT_PAYMENT_AUTH);
        return funding;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Funding createUpdatedEntity(EntityManager em) {
        Funding funding = new Funding()
            .amount(UPDATED_AMOUNT)
            .mode(UPDATED_MODE)
            .paymentAuth(UPDATED_PAYMENT_AUTH);
        return funding;
    }

    @BeforeEach
    public void initTest() {
        funding = createEntity(em);
    }

    @Test
    @Transactional
    public void createFunding() throws Exception {
        int databaseSizeBeforeCreate = fundingRepository.findAll().size();
        // Create the Funding
        restFundingMockMvc.perform(post("/api/fundings").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(funding)))
            .andExpect(status().isCreated());

        // Validate the Funding in the database
        List<Funding> fundingList = fundingRepository.findAll();
        assertThat(fundingList).hasSize(databaseSizeBeforeCreate + 1);
        Funding testFunding = fundingList.get(fundingList.size() - 1);
        assertThat(testFunding.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testFunding.getMode()).isEqualTo(DEFAULT_MODE);
        assertThat(testFunding.isPaymentAuth()).isEqualTo(DEFAULT_PAYMENT_AUTH);

        // Validate the Funding in Elasticsearch
        verify(mockFundingSearchRepository, times(1)).save(testFunding);
    }

    @Test
    @Transactional
    public void createFundingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fundingRepository.findAll().size();

        // Create the Funding with an existing ID
        funding.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFundingMockMvc.perform(post("/api/fundings").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(funding)))
            .andExpect(status().isBadRequest());

        // Validate the Funding in the database
        List<Funding> fundingList = fundingRepository.findAll();
        assertThat(fundingList).hasSize(databaseSizeBeforeCreate);

        // Validate the Funding in Elasticsearch
        verify(mockFundingSearchRepository, times(0)).save(funding);
    }


    @Test
    @Transactional
    public void getAllFundings() throws Exception {
        // Initialize the database
        fundingRepository.saveAndFlush(funding);

        // Get all the fundingList
        restFundingMockMvc.perform(get("/api/fundings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(funding.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].mode").value(hasItem(DEFAULT_MODE)))
            .andExpect(jsonPath("$.[*].paymentAuth").value(hasItem(DEFAULT_PAYMENT_AUTH.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getFunding() throws Exception {
        // Initialize the database
        fundingRepository.saveAndFlush(funding);

        // Get the funding
        restFundingMockMvc.perform(get("/api/fundings/{id}", funding.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(funding.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.mode").value(DEFAULT_MODE))
            .andExpect(jsonPath("$.paymentAuth").value(DEFAULT_PAYMENT_AUTH.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingFunding() throws Exception {
        // Get the funding
        restFundingMockMvc.perform(get("/api/fundings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFunding() throws Exception {
        // Initialize the database
        fundingRepository.saveAndFlush(funding);

        int databaseSizeBeforeUpdate = fundingRepository.findAll().size();

        // Update the funding
        Funding updatedFunding = fundingRepository.findById(funding.getId()).get();
        // Disconnect from session so that the updates on updatedFunding are not directly saved in db
        em.detach(updatedFunding);
        updatedFunding
            .amount(UPDATED_AMOUNT)
            .mode(UPDATED_MODE)
            .paymentAuth(UPDATED_PAYMENT_AUTH);

        restFundingMockMvc.perform(put("/api/fundings").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFunding)))
            .andExpect(status().isOk());

        // Validate the Funding in the database
        List<Funding> fundingList = fundingRepository.findAll();
        assertThat(fundingList).hasSize(databaseSizeBeforeUpdate);
        Funding testFunding = fundingList.get(fundingList.size() - 1);
        assertThat(testFunding.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testFunding.getMode()).isEqualTo(UPDATED_MODE);
        assertThat(testFunding.isPaymentAuth()).isEqualTo(UPDATED_PAYMENT_AUTH);

        // Validate the Funding in Elasticsearch
        verify(mockFundingSearchRepository, times(1)).save(testFunding);
    }

    @Test
    @Transactional
    public void updateNonExistingFunding() throws Exception {
        int databaseSizeBeforeUpdate = fundingRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFundingMockMvc.perform(put("/api/fundings").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(funding)))
            .andExpect(status().isBadRequest());

        // Validate the Funding in the database
        List<Funding> fundingList = fundingRepository.findAll();
        assertThat(fundingList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Funding in Elasticsearch
        verify(mockFundingSearchRepository, times(0)).save(funding);
    }

    @Test
    @Transactional
    public void deleteFunding() throws Exception {
        // Initialize the database
        fundingRepository.saveAndFlush(funding);

        int databaseSizeBeforeDelete = fundingRepository.findAll().size();

        // Delete the funding
        restFundingMockMvc.perform(delete("/api/fundings/{id}", funding.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Funding> fundingList = fundingRepository.findAll();
        assertThat(fundingList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Funding in Elasticsearch
        verify(mockFundingSearchRepository, times(1)).deleteById(funding.getId());
    }

    @Test
    @Transactional
    public void searchFunding() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        fundingRepository.saveAndFlush(funding);
        when(mockFundingSearchRepository.search(queryStringQuery("id:" + funding.getId())))
            .thenReturn(Collections.singletonList(funding));

        // Search the funding
        restFundingMockMvc.perform(get("/api/_search/fundings?query=id:" + funding.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(funding.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].mode").value(hasItem(DEFAULT_MODE)))
            .andExpect(jsonPath("$.[*].paymentAuth").value(hasItem(DEFAULT_PAYMENT_AUTH.booleanValue())));
    }
}
