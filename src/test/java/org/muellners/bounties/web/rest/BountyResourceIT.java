package org.muellners.bounties.web.rest;

import org.muellners.bounties.RedisTestContainerExtension;
import org.muellners.bounties.BountiesApp;
import org.muellners.bounties.config.TestSecurityConfiguration;
import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.repository.BountyRepository;
import org.muellners.bounties.repository.search.BountySearchRepository;
import org.muellners.bounties.service.BountyService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.muellners.bounties.domain.enumeration.Status;
import org.muellners.bounties.domain.enumeration.Experience;
import org.muellners.bounties.domain.enumeration.Type;
import org.muellners.bounties.domain.enumeration.Category;
/**
 * Integration tests for the {@link BountyResource} REST controller.
 */
@SpringBootTest(classes = { BountiesApp.class, TestSecurityConfiguration.class })
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class BountyResourceIT {

    private static final Status DEFAULT_STATUS = Status.OPEN;
    private static final Status UPDATED_STATUS = Status.INVALID;

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final Experience DEFAULT_EXPERIENCE = Experience.BEGINNER;
    private static final Experience UPDATED_EXPERIENCE = Experience.INTERMEDIATE;

    private static final Integer DEFAULT_COMMITMENT = 1;
    private static final Integer UPDATED_COMMITMENT = 2;

    private static final Type DEFAULT_TYPE = Type.BUG;
    private static final Type UPDATED_TYPE = Type.FEATURE;

    private static final Category DEFAULT_CATEGORY = Category.FRONT_END;
    private static final Category UPDATED_CATEGORY = Category.BACKEND;

    private static final String DEFAULT_KEYWORDS = "AAAAAAAAAA";
    private static final String UPDATED_KEYWORDS = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PERMISSION = false;
    private static final Boolean UPDATED_PERMISSION = true;

    private static final LocalDate DEFAULT_EXPIRES = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRES = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private BountyRepository bountyRepository;

    @Autowired
    private BountyService bountyService;

    /**
     * This repository is mocked in the org.muellners.bounties.repository.search test package.
     *
     * @see org.muellners.bounties.repository.search.BountySearchRepositoryMockConfiguration
     */
    @Autowired
    private BountySearchRepository mockBountySearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBountyMockMvc;

    private Bounty bounty;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bounty createEntity(EntityManager em) {
        Bounty bounty = new Bounty()
            .status(DEFAULT_STATUS)
            .url(DEFAULT_URL)
            .amount(DEFAULT_AMOUNT)
            .experience(DEFAULT_EXPERIENCE)
            .commitment(DEFAULT_COMMITMENT)
            .type(DEFAULT_TYPE)
            .category(DEFAULT_CATEGORY)
            .keywords(DEFAULT_KEYWORDS)
            .permission(DEFAULT_PERMISSION)
            .expires(DEFAULT_EXPIRES);
        return bounty;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bounty createUpdatedEntity(EntityManager em) {
        Bounty bounty = new Bounty()
            .status(UPDATED_STATUS)
            .url(UPDATED_URL)
            .amount(UPDATED_AMOUNT)
            .experience(UPDATED_EXPERIENCE)
            .commitment(UPDATED_COMMITMENT)
            .type(UPDATED_TYPE)
            .category(UPDATED_CATEGORY)
            .keywords(UPDATED_KEYWORDS)
            .permission(UPDATED_PERMISSION)
            .expires(UPDATED_EXPIRES);
        return bounty;
    }

    @BeforeEach
    public void initTest() {
        bounty = createEntity(em);
    }

    @Test
    @Transactional
    public void createBounty() throws Exception {
        int databaseSizeBeforeCreate = bountyRepository.findAll().size();
        // Create the Bounty
        restBountyMockMvc.perform(post("/api/bounty").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bounty)))
            .andExpect(status().isCreated());

        // Validate the Bounty in the database
        List<Bounty> bountyList = bountyRepository.findAll();
        assertThat(bountyList).hasSize(databaseSizeBeforeCreate + 1);
        Bounty testBounty = bountyList.get(bountyList.size() - 1);
        assertThat(testBounty.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testBounty.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testBounty.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testBounty.getExperience()).isEqualTo(DEFAULT_EXPERIENCE);
        assertThat(testBounty.getCommitment()).isEqualTo(DEFAULT_COMMITMENT);
        assertThat(testBounty.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testBounty.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testBounty.getKeywords()).isEqualTo(DEFAULT_KEYWORDS);
        assertThat(testBounty.isPermission()).isEqualTo(DEFAULT_PERMISSION);
        assertThat(testBounty.getExpires()).isEqualTo(DEFAULT_EXPIRES);

        // Validate the Bounty in Elasticsearch
        verify(mockBountySearchRepository, times(1)).save(testBounty);
    }

    @Test
    @Transactional
    public void createBountyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bountyRepository.findAll().size();

        // Create the Bounty with an existing ID
        bounty.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBountyMockMvc.perform(post("/api/bounties").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bounty)))
            .andExpect(status().isBadRequest());

        // Validate the Bounty in the database
        List<Bounty> bountyList = bountyRepository.findAll();
        assertThat(bountyList).hasSize(databaseSizeBeforeCreate);

        // Validate the Bounty in Elasticsearch
        verify(mockBountySearchRepository, times(0)).save(bounty);
    }


    @Test
    @Transactional
    public void getAllBounty() throws Exception {
        // Initialize the database
        bountyRepository.saveAndFlush(bounty);

        // Get all the bountyList
        restBountyMockMvc.perform(get("/api/bounties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bounty.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].experience").value(hasItem(DEFAULT_EXPERIENCE.toString())))
            .andExpect(jsonPath("$.[*].commitment").value(hasItem(DEFAULT_COMMITMENT)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].keywords").value(hasItem(DEFAULT_KEYWORDS)))
            .andExpect(jsonPath("$.[*].permission").value(hasItem(DEFAULT_PERMISSION.booleanValue())))
            .andExpect(jsonPath("$.[*].expires").value(hasItem(DEFAULT_EXPIRES.toString())));
    }
    
    @Test
    @Transactional
    public void getBounty() throws Exception {
        // Initialize the database
        bountyRepository.saveAndFlush(bounty);

        // Get the bounty
        restBountyMockMvc.perform(get("/api/bounties/{id}", bounty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bounty.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.experience").value(DEFAULT_EXPERIENCE.toString()))
            .andExpect(jsonPath("$.commitment").value(DEFAULT_COMMITMENT))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.keywords").value(DEFAULT_KEYWORDS))
            .andExpect(jsonPath("$.permission").value(DEFAULT_PERMISSION.booleanValue()))
            .andExpect(jsonPath("$.expires").value(DEFAULT_EXPIRES.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBounty() throws Exception {
        // Get the bounty
        restBountyMockMvc.perform(get("/api/bounties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBounty() throws Exception {
        // Initialize the database
        bountyService.save(bounty);

        int databaseSizeBeforeUpdate = bountyRepository.findAll().size();

        // Update the bounty
        Bounty updatedBounty = bountyRepository.findById(bounty.getId()).get();
        // Disconnect from session so that the updates on updatedBounty are not directly saved in db
        em.detach(updatedBounty);
        updatedBounty
            .status(UPDATED_STATUS)
            .url(UPDATED_URL)
            .amount(UPDATED_AMOUNT)
            .experience(UPDATED_EXPERIENCE)
            .commitment(UPDATED_COMMITMENT)
            .type(UPDATED_TYPE)
            .category(UPDATED_CATEGORY)
            .keywords(UPDATED_KEYWORDS)
            .permission(UPDATED_PERMISSION)
            .expires(UPDATED_EXPIRES);

        restBountyMockMvc.perform(put("/api/bounties").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBounty)))
            .andExpect(status().isOk());

        // Validate the Bounty in the database
        List<Bounty> bountyList = bountyRepository.findAll();
        assertThat(bountyList).hasSize(databaseSizeBeforeUpdate);
        Bounty testBounty = bountyList.get(bountyList.size() - 1);
        assertThat(testBounty.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testBounty.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testBounty.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testBounty.getExperience()).isEqualTo(UPDATED_EXPERIENCE);
        assertThat(testBounty.getCommitment()).isEqualTo(UPDATED_COMMITMENT);
        assertThat(testBounty.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBounty.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testBounty.getKeywords()).isEqualTo(UPDATED_KEYWORDS);
        assertThat(testBounty.isPermission()).isEqualTo(UPDATED_PERMISSION);
        assertThat(testBounty.getExpires()).isEqualTo(UPDATED_EXPIRES);

        // Validate the Bounty in Elasticsearch
        verify(mockBountySearchRepository, times(2)).save(testBounty);
    }

    @Test
    @Transactional
    public void updateNonExistingBounty() throws Exception {
        int databaseSizeBeforeUpdate = bountyRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBountyMockMvc.perform(put("/api/bounties").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bounty)))
            .andExpect(status().isBadRequest());

        // Validate the Bounty in the database
        List<Bounty> bountyList = bountyRepository.findAll();
        assertThat(bountyList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Bounty in Elasticsearch
        verify(mockBountySearchRepository, times(0)).save(bounty);
    }

    @Test
    @Transactional
    public void deleteBounty() throws Exception {
        // Initialize the database
        bountyService.save(bounty);

        int databaseSizeBeforeDelete = bountyRepository.findAll().size();

        // Delete the bounty
        restBountyMockMvc.perform(delete("/api/bounties/{id}", bounty.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bounty> bountyList = bountyRepository.findAll();
        assertThat(bountyList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Bounty in Elasticsearch
        verify(mockBountySearchRepository, times(1)).deleteById(bounty.getId());
    }

    @Test
    @Transactional
    public void searchBounty() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        bountyService.save(bounty);
        when(mockBountySearchRepository.search(queryStringQuery("id:" + bounty.getId())))
            .thenReturn(Collections.singletonList(bounty));

        // Search the bounty
        restBountyMockMvc.perform(get("/api/_search/bounties?query=id:" + bounty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bounty.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].experience").value(hasItem(DEFAULT_EXPERIENCE.toString())))
            .andExpect(jsonPath("$.[*].commitment").value(hasItem(DEFAULT_COMMITMENT)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].keywords").value(hasItem(DEFAULT_KEYWORDS)))
            .andExpect(jsonPath("$.[*].permission").value(hasItem(DEFAULT_PERMISSION.booleanValue())))
            .andExpect(jsonPath("$.[*].expires").value(hasItem(DEFAULT_EXPIRES.toString())));
    }
}
