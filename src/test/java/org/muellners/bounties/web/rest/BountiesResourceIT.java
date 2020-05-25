package org.muellners.bounties.web.rest;

import org.muellners.bounties.RedisTestContainerExtension;
import org.muellners.bounties.BountiesApp;
import org.muellners.bounties.config.TestSecurityConfiguration;
import org.muellners.bounties.domain.Bounties;
import org.muellners.bounties.repository.BountiesRepository;
import org.muellners.bounties.repository.search.BountiesSearchRepository;
import org.muellners.bounties.service.BountiesService;

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
 * Integration tests for the {@link BountiesResource} REST controller.
 */
@SpringBootTest(classes = { BountiesApp.class, TestSecurityConfiguration.class })
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class BountiesResourceIT {

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
    private BountiesRepository bountiesRepository;

    @Autowired
    private BountiesService bountiesService;

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
            .experience(DEFAULT_EXPERIENCE)
            .commitment(DEFAULT_COMMITMENT)
            .type(DEFAULT_TYPE)
            .category(DEFAULT_CATEGORY)
            .keywords(DEFAULT_KEYWORDS)
            .permission(DEFAULT_PERMISSION)
            .expires(DEFAULT_EXPIRES);
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
            .experience(UPDATED_EXPERIENCE)
            .commitment(UPDATED_COMMITMENT)
            .type(UPDATED_TYPE)
            .category(UPDATED_CATEGORY)
            .keywords(UPDATED_KEYWORDS)
            .permission(UPDATED_PERMISSION)
            .expires(UPDATED_EXPIRES);
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
        assertThat(testBounties.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testBounties.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testBounties.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testBounties.getExperience()).isEqualTo(DEFAULT_EXPERIENCE);
        assertThat(testBounties.getCommitment()).isEqualTo(DEFAULT_COMMITMENT);
        assertThat(testBounties.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testBounties.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testBounties.getKeywords()).isEqualTo(DEFAULT_KEYWORDS);
        assertThat(testBounties.isPermission()).isEqualTo(DEFAULT_PERMISSION);
        assertThat(testBounties.getExpires()).isEqualTo(DEFAULT_EXPIRES);

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
    public void getBounties() throws Exception {
        // Initialize the database
        bountiesRepository.saveAndFlush(bounties);

        // Get the bounties
        restBountiesMockMvc.perform(get("/api/bounties/{id}", bounties.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bounties.getId().intValue()))
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
    public void getNonExistingBounties() throws Exception {
        // Get the bounties
        restBountiesMockMvc.perform(get("/api/bounties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBounties() throws Exception {
        // Initialize the database
        bountiesService.save(bounties);

        int databaseSizeBeforeUpdate = bountiesRepository.findAll().size();

        // Update the bounties
        Bounties updatedBounties = bountiesRepository.findById(bounties.getId()).get();
        // Disconnect from session so that the updates on updatedBounties are not directly saved in db
        em.detach(updatedBounties);
        updatedBounties
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

        restBountiesMockMvc.perform(put("/api/bounties").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBounties)))
            .andExpect(status().isOk());

        // Validate the Bounties in the database
        List<Bounties> bountiesList = bountiesRepository.findAll();
        assertThat(bountiesList).hasSize(databaseSizeBeforeUpdate);
        Bounties testBounties = bountiesList.get(bountiesList.size() - 1);
        assertThat(testBounties.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testBounties.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testBounties.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testBounties.getExperience()).isEqualTo(UPDATED_EXPERIENCE);
        assertThat(testBounties.getCommitment()).isEqualTo(UPDATED_COMMITMENT);
        assertThat(testBounties.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBounties.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testBounties.getKeywords()).isEqualTo(UPDATED_KEYWORDS);
        assertThat(testBounties.isPermission()).isEqualTo(UPDATED_PERMISSION);
        assertThat(testBounties.getExpires()).isEqualTo(UPDATED_EXPIRES);

        // Validate the Bounties in Elasticsearch
        verify(mockBountiesSearchRepository, times(2)).save(testBounties);
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
        bountiesService.save(bounties);

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
        bountiesService.save(bounties);
        when(mockBountiesSearchRepository.search(queryStringQuery("id:" + bounties.getId())))
            .thenReturn(Collections.singletonList(bounties));

        // Searwch the bounties
        restBountiesMockMvc.perform(get("/api/_search/bounties?query=id:" + bounties.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bounties.getId().intValue())))
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
