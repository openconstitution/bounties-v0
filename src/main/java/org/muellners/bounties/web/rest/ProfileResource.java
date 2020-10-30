package org.muellners.bounties.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.*;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.muellners.bounties.domain.Profile;
import org.muellners.bounties.repository.ProfileRepository;
import org.muellners.bounties.repository.search.ProfileSearchRepository;
import org.muellners.bounties.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link org.muellners.bounties.domain.Profile}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfileResource {

  private final Logger log = LoggerFactory.getLogger(ProfileResource.class);

  private static final String ENTITY_NAME = "profile";

  @Value("${jhipster.clientApp.name}") private String applicationName;

  private final ProfileRepository profileRepository;

  private final ProfileSearchRepository profileSearchRepository;

  public ProfileResource(ProfileRepository profileRepository,
                         ProfileSearchRepository profileSearchRepository) {
    this.profileRepository = profileRepository;
    this.profileSearchRepository = profileSearchRepository;
  }

  /**
   * {@code POST  /profiles} : Create a new profile.
   *
   * @param profile the profile to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and
   *     with body the new profile, or with status {@code 400 (Bad Request)} if
   *     the profile has already an ID.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping("/profiles")
  public ResponseEntity<Profile> createProfile(@RequestBody Profile profile)
      throws URISyntaxException {
    log.debug("REST request to save Profile : {}", profile);
    if (profile.getId() != null) {
      throw new BadRequestAlertException(
          "A new profile cannot already have an ID", ENTITY_NAME, "idexists");
    }
    Profile result = profileRepository.save(profile);
    profileSearchRepository.save(result);
    return ResponseEntity.created(new URI("/api/profiles/" + result.getId()))
        .headers(HeaderUtil.createEntityCreationAlert(
            applicationName, false, ENTITY_NAME, result.getId().toString()))
        .body(result);
  }

  /**
   * {@code PUT  /profiles} : Updates an existing profile.
   *
   * @param profile the profile to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
   *     body the updated profile,
   * or with status {@code 400 (Bad Request)} if the profile is not valid,
   * or with status {@code 500 (Internal Server Error)} if the profile couldn't
   * be updated.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PutMapping("/profiles")
  public ResponseEntity<Profile> updateProfile(@RequestBody Profile profile)
      throws URISyntaxException {
    log.debug("REST request to update Profile : {}", profile);
    if (profile.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    Profile result = profileRepository.save(profile);
    profileSearchRepository.save(result);
    return ResponseEntity.ok()
        .headers(HeaderUtil.createEntityUpdateAlert(
            applicationName, false, ENTITY_NAME, profile.getId().toString()))
        .body(result);
  }

  /**
   * {@code GET  /profiles} : get all the profiles.
   *
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the
   *     list of profiles in body.
   */
  @GetMapping("/profiles")
  public List<Profile> getAllProfiles() {
    log.debug("REST request to get all Profiles");
    return profileRepository.findAll();
  }

  /**
   * {@code GET  /profiles/:id} : get the "id" profile.
   *
   * @param id the id of the profile to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with
   *     body the profile, or with status {@code 404 (Not Found)}.
   */
  @GetMapping("/profiles/{id}")
  public ResponseEntity<Profile> getProfile(@PathVariable Long id) {
    log.debug("REST request to get Profile : {}", id);
    Optional<Profile> profile = profileRepository.findById(id);
    return ResponseUtil.wrapOrNotFound(profile);
  }

  /**
   * {@code DELETE  /profiles/:id} : delete the "id" profile.
   *
   * @param id the id of the profile to delete.
   * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
   */
  @DeleteMapping("/profiles/{id}")
  public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
    log.debug("REST request to delete Profile : {}", id);
    profileRepository.deleteById(id);
    profileSearchRepository.deleteById(id);
    return ResponseEntity.noContent()
        .headers(HeaderUtil.createEntityDeletionAlert(
            applicationName, false, ENTITY_NAME, id.toString()))
        .build();
  }

  /**
   * {@code SEARCH  /_search/profiles?query=:query} : search for the profile
   * corresponding to the query.
   *
   * @param query the query of the profile search.
   * @return the result of the search.
   */
  @GetMapping("/_search/profiles")
  public List<Profile> searchProfiles(@RequestParam String query) {
    log.debug("REST request to search Profiles for query {}", query);
    return StreamSupport
        .stream(profileSearchRepository.search(queryStringQuery(query))
                    .spliterator(),
                false)
        .collect(Collectors.toList());
  }
}
