package org.muellners.bounties.web.rest;

import org.muellners.bounties.BountiesApp;
import org.muellners.bounties.config.TestSecurityConfiguration;
import org.muellners.bounties.domain.Profile;
import org.muellners.bounties.repository.ProfileRepository;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProfileResource} REST controller.
 */
@SpringBootTest(classes = { BountiesApp.class, TestSecurityConfiguration.class })
@ExtendWith({ MockitoExtension.class })
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

    private static final String DEFAULT_GITHUB_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_GITHUB_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_GITHUB_ORG_NAME = "AAAAAAAAAA";
    private static final String UPDATED_GITHUB_ORG_NAME = "BBBBBBBBBB";

    @Autowired
    private ProfileRepository profileRepository;

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
        return new Profile()
            .votes(DEFAULT_VOTES)
            .profileLink(DEFAULT_PROFILELINK)
            .about(DEFAULT_ABOUT)
            .walletAddress(DEFAULT_WALLETADDRESS)
            .githubEmail(DEFAULT_GITHUB_EMAIL)
            .githubOrgName(DEFAULT_GITHUB_ORG_NAME);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profile createUpdatedEntity(EntityManager em) {
        return new Profile()
            .votes(UPDATED_VOTES)
            .profileLink(UPDATED_PROFILELINK)
            .about(UPDATED_ABOUT)
            .walletAddress(UPDATED_WALLETADDRESS)
            .githubEmail(UPDATED_GITHUB_EMAIL)
            .githubOrgName(UPDATED_GITHUB_ORG_NAME);
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
        assertThat(testProfile.getProfileLink()).isEqualTo(DEFAULT_PROFILELINK);
        assertThat(testProfile.getAbout()).isEqualTo(DEFAULT_ABOUT);
        assertThat(testProfile.getWalletAddress()).isEqualTo(DEFAULT_WALLETADDRESS);
        assertThat(testProfile.getGithubEmail()).isEqualTo(DEFAULT_GITHUB_EMAIL);
        assertThat(testProfile.getGithubOrgName()).isEqualTo(DEFAULT_GITHUB_ORG_NAME);
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
            .andExpect(jsonPath("$.[*].githubEmail").value(hasItem(DEFAULT_GITHUB_EMAIL)))
            .andExpect(jsonPath("$.[*].githubOrgName").value(hasItem(DEFAULT_GITHUB_ORG_NAME)));
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
            .andExpect(jsonPath("$.githubEmail").value(DEFAULT_GITHUB_EMAIL))
            .andExpect(jsonPath("$.githubOrgName").value(DEFAULT_GITHUB_ORG_NAME));
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
            .profileLink(UPDATED_PROFILELINK)
            .about(UPDATED_ABOUT)
            .walletAddress(UPDATED_WALLETADDRESS)
            .githubEmail(UPDATED_GITHUB_EMAIL)
            .githubOrgName(UPDATED_GITHUB_ORG_NAME);

        restProfileMockMvc.perform(put("/api/profiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfile)))
            .andExpect(status().isOk());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
        Profile testProfile = profileList.get(profileList.size() - 1);
        assertThat(testProfile.getVotes()).isEqualTo(UPDATED_VOTES);
        assertThat(testProfile.getProfileLink()).isEqualTo(UPDATED_PROFILELINK);
        assertThat(testProfile.getAbout()).isEqualTo(UPDATED_ABOUT);
        assertThat(testProfile.getWalletAddress()).isEqualTo(UPDATED_WALLETADDRESS);
        assertThat(testProfile.getGithubEmail()).isEqualTo(UPDATED_GITHUB_EMAIL);
        assertThat(testProfile.getGithubOrgName()).isEqualTo(UPDATED_GITHUB_ORG_NAME);
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
    }

    @Test
    @Transactional
    public void searchProfile() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        profileRepository.saveAndFlush(profile);

        // Search the profile
        restProfileMockMvc.perform(get("/api/_search/profiles?query=id:" + profile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profile.getId().intValue())))
            .andExpect(jsonPath("$.[*].votes").value(hasItem(DEFAULT_VOTES)))
            .andExpect(jsonPath("$.[*].profilelink").value(hasItem(DEFAULT_PROFILELINK)))
            .andExpect(jsonPath("$.[*].about").value(hasItem(DEFAULT_ABOUT)))
            .andExpect(jsonPath("$.[*].walletaddress").value(hasItem(DEFAULT_WALLETADDRESS)))
            .andExpect(jsonPath("$.[*].githubEmail").value(hasItem(DEFAULT_GITHUB_EMAIL)))
            .andExpect(jsonPath("$.[*].githubOrgName").value(hasItem(DEFAULT_GITHUB_ORG_NAME)));
    }
}
