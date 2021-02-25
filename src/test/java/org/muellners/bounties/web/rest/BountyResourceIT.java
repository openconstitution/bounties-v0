package org.muellners.bounties.web.rest;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.muellners.bounties.BountiesApp;
import org.muellners.bounties.config.TestSecurityConfiguration;
import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.domain.Fund;
import org.muellners.bounties.domain.Issue;
import org.muellners.bounties.domain.Option;
import org.muellners.bounties.repository.BountyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.muellners.bounties.repository.OptionRepository;
import org.muellners.bounties.service.mapper.BountyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

/**
 * Integration tests for the {@link BountyResource} REST controller.
 */
@SpringBootTest(classes = { BountiesApp.class, TestSecurityConfiguration.class })
@ExtendWith({ MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class BountyResourceIT {

	private static final String DEFAULT_SUMMARY = "A default summary";
	private static final String UPDATED_SUMMARY = "An updated summary";

	private static final String DEFAULT_STATUS = "open";
	private static final String UPDATED_STATUS = "invalid";

	private static final String DEFAULT_URL =
	  "https://jira.apache.org/jira/browse/FINERACT-857";
	private static final String UPDATED_URL =
	  "https://jira.apache.org/jira/browse/FINERACT-857";

	private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
	private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

	private static final String DEFAULT_EXPERIENCE = "beginner";
	private static final String UPDATED_EXPERIENCE = "intermediate";

	private static final String DEFAULT_COMMITMENT = "1";
	private static final String UPDATED_COMMITMENT = "2";

	private static final String DEFAULT_TYPE = "bug";
	private static final String UPDATED_TYPE = "feature";

	private static final String DEFAULT_CATEGORY = "frontend";
	private static final String UPDATED_CATEGORY = "backend";

	@SuppressWarnings("unused")
	private static final String DEFAULT_KEYWORDS = "AAAAAAAAAA";
	@SuppressWarnings("unused")
	private static final String UPDATED_KEYWORDS = "BBBBBBBBBB";

	private static final Boolean DEFAULT_PERMISSION = false;
	private static final Boolean UPDATED_PERMISSION = true;

	private static final LocalDate DEFAULT_EXPIRES = LocalDate.ofEpochDay(0L);
	private static final LocalDate UPDATED_EXPIRES = LocalDate.now(ZoneId.systemDefault());

	@Autowired private BountyRepository bountyRepository;
	@Autowired private OptionRepository optionRepository;
	@Autowired private BountyMapper bountyMapper;

	@Autowired private MockMvc restBountyMockMvc;

	private Bounty bounty;

	/**
	* Create an entity for this test.
	*
	* This is a static method, as tests for other entities might also need it,
	* if they test an entity which requires the current entity.
	 * @param status the status of the bounty
	 * @param experience the experience level required for the bounty
	 * @param commitment the amount of commitment required for the bounty
	 * @param type the type of the bounty
	 * @param category the category of the bounty
	 */
	public static Bounty createEntity(Option status, Option experience,
									  Option commitment, Option type,
									  Option category) {
		final Set<Fund> funds = new HashSet<>();
		funds.add(new Fund().amount(DEFAULT_AMOUNT));
		final Bounty bounty = new Bounty()
				.summary(DEFAULT_SUMMARY)
				.status(status)
				.amount(funds.stream().map(Fund::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add))
				.issue(new Issue().url(DEFAULT_URL).status(status))
				.funds(funds)
				.experience(experience)
				.commitment(commitment)
				.type(type)
				.category(category)
//				.keywords(new Option().name("status").key("open").value("open"))
				.permission(DEFAULT_PERMISSION)
				.expiryDate(DEFAULT_EXPIRES);
		return bounty;
	}

	/**
	* Create an updated entity for this test.
	*
	* This is a static method, as tests for other entities might also need it,
	* if they test an entity which requires the current entity.
	 * @param bounty the old bounty
	 * @param status the status of the bounty
	 * @param experience the experience level required for the bounty
	 * @param commitment the amount of commitment required for the bounty
	 * @param type the type of the bounty
	 * @param category the category of the bounty
	*/
	public static void createUpdatedEntity(Bounty bounty, Option status, Option experience,
										   Option commitment, Option type, Option category) {
		final Set<Fund> funds = new HashSet<>();
		funds.add(new Fund().amount(UPDATED_AMOUNT));
		bounty
			.summary(UPDATED_SUMMARY)
			.status(status)
			.amount(funds.stream().map(Fund::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add))
			.issue(new Issue().url(DEFAULT_URL).status(status))
//			.issue(new Issue().url(UPDATED_URL).status(status))
			.funds(funds)
			.experience(experience)
			.commitment(commitment)
			.type(type)
			.category(category)
//			.keywords(UPDATED_KEYWORDS)
			.permission(UPDATED_PERMISSION)
			.expiryDate(UPDATED_EXPIRES);
	}

	@BeforeEach
	public void initTest() {
		final Option status = optionRepository.save(new Option()
				.name("status")
				.key(DEFAULT_STATUS)
				.value(DEFAULT_STATUS));
		final Option experience = optionRepository.save(new Option()
				.name("experience")
				.key(DEFAULT_EXPERIENCE)
				.value(DEFAULT_EXPERIENCE));
		final Option commitment = optionRepository.save(new Option()
				.name("commitment")
				.key(DEFAULT_COMMITMENT)
				.value(DEFAULT_COMMITMENT));
		final Option type = optionRepository.save(new Option()
				.name("type")
				.key(DEFAULT_TYPE)
				.value(DEFAULT_TYPE));
		final Option category = optionRepository.save(new Option()
				.name("category")
				.key(DEFAULT_CATEGORY)
				.value(DEFAULT_CATEGORY));
		bounty = createEntity(status, experience, commitment, type, category);
	}

	@Test
	@Transactional
	public void createBounty() throws Exception {
		int databaseSizeBeforeCreate = bountyRepository.findAll().size();
		// Create the Bounty
		restBountyMockMvc
			.perform(post("/api/bounties")
						 .with(csrf())
						 .contentType(MediaType.APPLICATION_JSON)
						 .content(TestUtil.convertObjectToJsonBytes(bountyMapper.toDTO(bounty))))
			.andExpect(status().isCreated());

		// Validate the Bounty in the database
		List<Bounty> bountyList = bountyRepository.findAll();
		assertThat(bountyList).hasSize(databaseSizeBeforeCreate + 1);
		Bounty testBounty = bountyList.get(bountyList.size() - 1);
		assertThat(testBounty.getStatus().getKey()).isEqualTo(DEFAULT_STATUS);
		assertThat(testBounty.getIssue().getUrl()).isEqualTo(DEFAULT_URL);
		assertThat(testBounty.getAmount()).isEqualTo(DEFAULT_AMOUNT);
		assertThat(testBounty.getExperience().getKey()).isEqualTo(DEFAULT_EXPERIENCE);
		assertThat(testBounty.getCommitment().getKey()).isEqualTo(DEFAULT_COMMITMENT);
		assertThat(testBounty.getType().getKey()).isEqualTo(DEFAULT_TYPE);
		assertThat(testBounty.getCategory().getKey()).isEqualTo(DEFAULT_CATEGORY);
		//    assertThat(testBounty.getKeywords()).isEqualTo(DEFAULT_KEYWORDS);
		assertThat(testBounty.isPermission()).isEqualTo(DEFAULT_PERMISSION);
		assertThat(testBounty.getExpiryDate()).isEqualTo(DEFAULT_EXPIRES);
	}

	@Test
	@Transactional
	public void createBountyWithExistingId() throws Exception {
		int databaseSizeBeforeCreate = bountyRepository.findAll().size();

		// Create the Bounty with an existing ID
		bounty.setId(1L);

		// An entity with an existing ID cannot be created, so this API call must
		// fail
		restBountyMockMvc
			.perform(post("/api/bounties")
						 .with(csrf())
						 .contentType(MediaType.APPLICATION_JSON)
						 .content(TestUtil.convertObjectToJsonBytes(bountyMapper.toDTO(bounty))))
			.andExpect(status().isBadRequest());

		// Validate the Bounty in the database
		List<Bounty> bountyList = bountyRepository.findAll();
		assertThat(bountyList).hasSize(databaseSizeBeforeCreate);
	}

	@Test
	@Transactional
	public void getAllBounties() throws Exception {
		// Initialize the database
		bountyRepository.saveAndFlush(bounty);

		// Get all the bountyList
		restBountyMockMvc.perform(get("/api/bounties?sort=id,desc"))
			.andExpect(status().isOk())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
			.andExpect(jsonPath("$.[*].id").value(hasItem(bounty.getId().intValue())))
			.andExpect(jsonPath("$.[*].statusKey").value(hasItem(DEFAULT_STATUS)))
			.andExpect(jsonPath("$.[*].issueUrl").value(hasItem(DEFAULT_URL)))
			.andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
			.andExpect(jsonPath("$.[*].experienceKey").value(hasItem(DEFAULT_EXPERIENCE)))
			.andExpect(jsonPath("$.[*].commitmentKey").value(hasItem(DEFAULT_COMMITMENT)))
			.andExpect(jsonPath("$.[*].typeKey").value(hasItem(DEFAULT_TYPE)))
			.andExpect(jsonPath("$.[*].categoryKey").value(hasItem(DEFAULT_CATEGORY)))
//			.andExpect(jsonPath("$.[*].keywords").value(hasItem(DEFAULT_KEYWORDS)))
			.andExpect(jsonPath("$.[*].permission").value(hasItem(DEFAULT_PERMISSION.booleanValue())))
			.andExpect(jsonPath("$.[*].expiryDate")
						   .value(hasItem(DEFAULT_EXPIRES.toString())));
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
			.andExpect(jsonPath("$.statusKey").value(DEFAULT_STATUS))
			.andExpect(jsonPath("$.issueUrl").value(DEFAULT_URL))
			.andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
			.andExpect(jsonPath("$.experienceKey").value(DEFAULT_EXPERIENCE))
			.andExpect(jsonPath("$.commitmentKey").value(DEFAULT_COMMITMENT))
			.andExpect(jsonPath("$.typeKey").value(DEFAULT_TYPE))
			.andExpect(jsonPath("$.categoryKey").value(DEFAULT_CATEGORY))
//			.andExpect(jsonPath("$.keywords").value(DEFAULT_KEYWORDS))
			.andExpect(jsonPath("$.permission").value(DEFAULT_PERMISSION.booleanValue()))
			.andExpect(jsonPath("$.expiryDate").value(DEFAULT_EXPIRES.toString()));
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
		bountyRepository.saveAndFlush(bounty);

		int databaseSizeBeforeUpdate = bountyRepository.findAll().size();

		// Update the bounty
		Bounty updatedBounty = bountyRepository.findById(bounty.getId()).get();

		final Option status = optionRepository.save(new Option()
				.name("status")
				.key(UPDATED_STATUS)
				.value(UPDATED_STATUS));
		final Option experience = optionRepository.save(new Option()
				.name("experience")
				.key(UPDATED_EXPERIENCE)
				.value(UPDATED_EXPERIENCE));
		final Option commitment = optionRepository.save(new Option()
				.name("commitment")
				.key(UPDATED_COMMITMENT)
				.value(UPDATED_COMMITMENT));
		final Option type = optionRepository.save(new Option()
				.name("type")
				.key(UPDATED_TYPE)
				.value(UPDATED_TYPE));
		final Option category = optionRepository.save(new Option()
				.name("category")
				.key(UPDATED_CATEGORY)
				.value(UPDATED_CATEGORY));
		createUpdatedEntity(updatedBounty, status, experience, commitment, type, category);

		restBountyMockMvc
		.perform(put("/api/bounties")
					 .with(csrf())
					 .contentType(MediaType.APPLICATION_JSON)
					 .content(TestUtil.convertObjectToJsonBytes(bountyMapper.toDTO(updatedBounty))))
		.andExpect(status().isOk());

		// Validate the Bounty in the database
//		List<Bounty> bountyList = bountyRepository.findAll();
//		assertThat(bountyList).hasSize(databaseSizeBeforeUpdate);
//		Bounty testBounty = bountyList.get(bountyList.size() - 1);
//		assertThat(testBounty.getStatus().getKey()).isEqualTo(UPDATED_STATUS);
//		assertThat(testBounty.getIssue().getUrl()).isEqualTo(UPDATED_URL);
//		assertThat(testBounty.getAmount()).isEqualTo(UPDATED_AMOUNT);
//		assertThat(testBounty.getExperience().getKey()).isEqualTo(UPDATED_EXPERIENCE);
//		assertThat(testBounty.getCommitment().getKey()).isEqualTo(UPDATED_COMMITMENT);
//		assertThat(testBounty.getType().getKey()).isEqualTo(UPDATED_TYPE);
//		assertThat(testBounty.getCategory().getKey()).isEqualTo(UPDATED_CATEGORY);
//		//    assertThat(testBounty.getKeywords()).isEqualTo(UPDATED_KEYWORDS);
//		assertThat(testBounty.isPermission()).isEqualTo(UPDATED_PERMISSION);
//		assertThat(testBounty.getExpiryDate()).isEqualTo(UPDATED_EXPIRES);
	}

	@Test
	@Transactional
	public void updateNonExistingBounty() throws Exception {
		int databaseSizeBeforeUpdate = bountyRepository.findAll().size();

		// If the entity doesn't have an ID, it will throw BadRequestAlertException
		restBountyMockMvc
			.perform(put("/api/bounties")
						 .with(csrf())
						 .contentType(MediaType.APPLICATION_JSON)
						 .content(TestUtil.convertObjectToJsonBytes(bountyMapper.toDTO(bounty))))
			.andExpect(status().isBadRequest());

		// Validate the Bounty in the database
		List<Bounty> bountyList = bountyRepository.findAll();
		assertThat(bountyList).hasSize(databaseSizeBeforeUpdate);
	}

	@Test
	@Transactional
	public void deleteBounty() throws Exception {
		// Initialize the database
		bountyRepository.saveAndFlush(bounty);

		int databaseSizeBeforeDelete = bountyRepository.findAll().size();

		// Delete the bounty
		restBountyMockMvc
			.perform(delete("/api/bounties/{id}", bounty.getId())
						 .with(csrf())
						 .accept(MediaType.APPLICATION_JSON))
			.andExpect(status().isNoContent());

		// Validate the database contains one less item
		List<Bounty> bountyList = bountyRepository.findAll();
		assertThat(bountyList).hasSize(databaseSizeBeforeDelete - 1);
	}

	@org.junit.jupiter.api.Disabled
	@Test
	@Transactional
	public void searchBounty() throws Exception {
		// Configure the mock search repository
		// Initialize the database
		bountyRepository.saveAndFlush(bounty);

		// Search the bounty
		restBountyMockMvc
			.perform(get("/api/_search/bounties?query=id:" + bounty.getId()))
			.andExpect(status().isOk())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
			.andExpect(jsonPath("$.[*].id").value(hasItem(bounty.getId().intValue())))
			.andExpect(jsonPath("$.[*].statusKey").value(hasItem(DEFAULT_STATUS)))
			.andExpect(jsonPath("$.[*].issueUrl").value(hasItem(DEFAULT_URL)))
			.andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
			.andExpect(jsonPath("$.[*].experienceKey").value(hasItem(DEFAULT_EXPERIENCE)))
			.andExpect(jsonPath("$.[*].commitmentKey").value(hasItem(DEFAULT_COMMITMENT)))
			.andExpect(jsonPath("$.[*].typeKey").value(hasItem(DEFAULT_TYPE)))
			.andExpect(jsonPath("$.[*].categoryKey").value(hasItem(DEFAULT_CATEGORY)))
		//        .andExpect(jsonPath("$.[*].keywords").value(hasItem(DEFAULT_KEYWORDS)))
			.andExpect(jsonPath("$.[*].permission").value(hasItem(DEFAULT_PERMISSION.booleanValue())))
			.andExpect(jsonPath("$.[*].expiryDate").value(hasItem(DEFAULT_EXPIRES.toString())));
	}
}
