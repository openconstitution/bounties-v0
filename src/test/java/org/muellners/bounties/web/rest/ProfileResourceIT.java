package org.muellners.bounties.web.rest;

import org.muellners.bounties.RedisTestContainerExtension;
import org.muellners.bounties.BountiesApp;
import org.muellners.bounties.config.TestSecurityConfiguration;
import org.muellners.bounties.domain.Profile;
import org.muellners.bounties.repository.ProfileRepository;
import org.muellners.bounties.repository.search.ProfileSearchRepository;

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
 * Integration tests for the {@link ProfileResource} REST controller.
 */
@SpringBootTest(classes = { BountiesApp.class, TestSecurityConfiguration.class })
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class ProfileResourceIT {

    private static final Integer DEFAULT_VOTES = 1;
    private static final Integer UPDATED_VOTES = 2;

    private static final String DEFAULT_PROFILELINK = "AAAAAAAAAA";
    private static final String UPDATED_PROFILELINK = "BBBBBBBBBB";

    private static final String DEFAULT_ABOUT = "AAAAAAAAAA";
    private static final String UPDATED_ABOUT = "BBBBBBBBBB";

    private static final String DEFAULT_WALLETADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_WALLETADDRESS = "BBBBBBBBBB";

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    @Autowired
    private ProfileRepository profileRepository;

    /**
     * This repository is mocked in the org.muellners.bounties.repository.search test package.
     *
     * @see org.muellners.bounties.repository.search.ProfileSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProfileSearchRepository mockProfileSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfileMockMvc;

    private Profile profile;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profile createEntity(EntityManager em) {
        Profile profile = new Profile()
            .votes(DEFAULT_VOTES)
            .profilelink(DEFAULT_PROFILELINK)
            .about(DEFAULT_ABOUT)
            .walletaddress(DEFAULT_WALLETADDRESS)
            .userId(DEFAULT_USER_ID);
        return profile;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profile createUpdatedEntity(EntityManager em) {
        Profile profile = new Profile()
            .votes(UPDATED_VOTES)
            .profilelink(UPDATED_PROFILELINK)
            .about(UPDATED_ABOUT)
            .walletaddress(UPDATED_WALLETADDRESS)
            .userId(UPDATED_USER_ID);
        return profile;
    }

    @BeforeEach
    public void initTest() {
        profile = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfile() throws Exception {
        int databaseSizeBeforeCreate = profileRepository.findAll().size();
        // Create the Profile
        restProfileMockMvc.perform(post("/api/profiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isCreated());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeCreate + 1);
        Profile testProfile = profileList.get(profileList.size() - 1);
        assertThat(testProfile.getVotes()).isEqualTo(DEFAULT_VOTES);
        assertThat(testProfile.getProfilelink()).isEqualTo(DEFAULT_PROFILELINK);
        assertThat(testProfile.getAbout()).isEqualTo(DEFAULT_ABOUT);
        assertThat(testProfile.getWalletaddress()).isEqualTo(DEFAULT_WALLETADDRESS);
        assertThat(testProfile.getUserId()).isEqualTo(DEFAULT_USER_ID);

        // Validate the Profile in Elasticsearch
        verify(mockProfileSearchRepository, times(1)).save(testProfile);
    }

    @Test
    @Transactional
    public void createProfileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profileRepository.findAll().size();

        // Create the Profile with an existing ID
        profile.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfileMockMvc.perform(post("/api/profiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isBadRequest());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeCreate);

        // Validate the Profile in Elasticsearch
        verify(mockProfileSearchRepository, times(0)).save(profile);
    }


    @Test
    @Transactional
    public void getAllProfiles() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get all the profileList
        restProfileMockMvc.perform(get("/api/profiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profile.getId().intValue())))
            .andExpect(jsonPath("$.[*].votes").value(hasItem(DEFAULT_VOTES)))
            .andExpect(jsonPath("$.[*].profilelink").value(hasItem(DEFAULT_PROFILELINK)))
            .andExpect(jsonPath("$.[*].about").value(hasItem(DEFAULT_ABOUT)))
            .andExpect(jsonPath("$.[*].walletaddress").value(hasItem(DEFAULT_WALLETADDRESS)))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getProfile() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Get the profile
        restProfileMockMvc.perform(get("/api/profiles/{id}", profile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profile.getId().intValue()))
            .andExpect(jsonPath("$.votes").value(DEFAULT_VOTES))
            .andExpect(jsonPath("$.profilelink").value(DEFAULT_PROFILELINK))
            .andExpect(jsonPath("$.about").value(DEFAULT_ABOUT))
            .andExpect(jsonPath("$.walletaddress").value(DEFAULT_WALLETADDRESS))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingProfile() throws Exception {
        // Get the profile
        restProfileMockMvc.perform(get("/api/profiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfile() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        int databaseSizeBeforeUpdate = profileRepository.findAll().size();

        // Update the profile
        Profile updatedProfile = profileRepository.findById(profile.getId()).get();
        // Disconnect from session so that the updates on updatedProfile are not directly saved in db
        em.detach(updatedProfile);
        updatedProfile
            .votes(UPDATED_VOTES)
            .profilelink(UPDATED_PROFILELINK)
            .about(UPDATED_ABOUT)
            .walletaddress(UPDATED_WALLETADDRESS)
            .userId(UPDATED_USER_ID);

        restProfileMockMvc.perform(put("/api/profiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfile)))
            .andExpect(status().isOk());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
        Profile testProfile = profileList.get(profileList.size() - 1);
        assertThat(testProfile.getVotes()).isEqualTo(UPDATED_VOTES);
        assertThat(testProfile.getProfilelink()).isEqualTo(UPDATED_PROFILELINK);
        assertThat(testProfile.getAbout()).isEqualTo(UPDATED_ABOUT);
        assertThat(testProfile.getWalletaddress()).isEqualTo(UPDATED_WALLETADDRESS);
        assertThat(testProfile.getUserId()).isEqualTo(UPDATED_USER_ID);

        // Validate the Profile in Elasticsearch
        verify(mockProfileSearchRepository, times(1)).save(testProfile);
    }

    @Test
    @Transactional
    public void updateNonExistingProfile() throws Exception {
        int databaseSizeBeforeUpdate = profileRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfileMockMvc.perform(put("/api/profiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isBadRequest());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Profile in Elasticsearch
        verify(mockProfileSearchRepository, times(0)).save(profile);
    }

    @Test
    @Transactional
    public void deleteProfile() throws Exception {
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        int databaseSizeBeforeDelete = profileRepository.findAll().size();

        // Delete the profile
        restProfileMockMvc.perform(delete("/api/profiles/{id}", profile.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Profile in Elasticsearch
        verify(mockProfileSearchRepository, times(1)).deleteById(profile.getId());
    }

    @Test
    @Transactional
    public void searchProfile() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        profileRepository.saveAndFlush(profile);
        when(mockProfileSearchRepository.search(queryStringQuery("id:" + profile.getId())))
            .thenReturn(Collections.singletonList(profile));

        // Search the profile
        restProfileMockMvc.perform(get("/api/_search/profiles?query=id:" + profile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profile.getId().intValue())))
            .andExpect(jsonPath("$.[*].votes").value(hasItem(DEFAULT_VOTES)))
            .andExpect(jsonPath("$.[*].profilelink").value(hasItem(DEFAULT_PROFILELINK)))
            .andExpect(jsonPath("$.[*].about").value(hasItem(DEFAULT_ABOUT)))
            .andExpect(jsonPath("$.[*].walletaddress").value(hasItem(DEFAULT_WALLETADDRESS)))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())));
    }
}
