package org.muellners.bounties.service;

import org.muellners.bounties.domain.Option;
import org.muellners.bounties.repository.OptionRepository;
import org.muellners.bounties.service.dto.OptionDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Option}.
 */
@Service
@Transactional
public class OptionService {

	private final Logger log = LoggerFactory.getLogger(OptionService.class);

	private final OptionRepository optionRepository;

	public OptionService(OptionRepository optionRepository) {
		this.optionRepository = optionRepository;
	}

	/**
	 * Save an option.
	 *
	 * @param optionDTO the entity to save.
	 * @return the persisted entity.
	 */
	public OptionDTO save(final OptionDTO optionDTO) {
		log.debug("Request to save an option : {}", optionDTO);

		final Option option = new Option()
				.name(optionDTO.getName())
				.key(optionDTO.getKey())
				.value(optionDTO.getValue());

		log.debug("Updated option : {}", option);
		Option result = optionRepository.save(option);
		return new OptionDTO(result);
	}

	/**
	 * Get one bounty by id.
	 *
	 * @param id the id of the entity.
	 * @return the entity.
	 */
	@Transactional(readOnly = true)
	public OptionDTO findOne(Long id) {
		log.debug("Request to get an option : {}", id);
		final Optional<Option> option = optionRepository.findById(id);
		return new OptionDTO(option.orElseThrow(IllegalArgumentException::new));
	}

	/**
	 * Get one bounty by id.
	 *
	 * @param key the id of the entity.
	 * @return the entity.
	 */
	@Transactional(readOnly = true)
	public Option findOneByKey(String key) {
		log.debug("Request to get an option : {}", key);
		final Optional<Option> option = optionRepository.findByKey(key);
		return option.orElseThrow(IllegalArgumentException::new);
	}

	/**
	 * Fetch Information about the issue based on the link provided.
	 * @param link the link to parse
	 * @return description from the link.
	 */

	/**
	 * Get all the options.
	 *
	 * @return the list of entities.
	 */
	@Transactional(readOnly = true)
	public List<Option> findOptionsByName(final String name) {
		log.debug("Request to get all Options by name: {}", name);
		return optionRepository.findByName(name);
	}

	/**
	 * Fetch Information about the issue based on the link provided.
	 * @param link the link to parse
	 * @return description from the link.
	 */

	/**
	 * Get all the options.
	 *
	 * @return the list of entities.
	 */
	@Transactional(readOnly = true)
	public List<OptionDTO> findAll() {
		log.debug("Request to get all Options");
		return optionRepository.findAll()
				.stream()
				.map(option -> new OptionDTO(option))
				.collect(Collectors.toList());
	}

	/**
	 * Delete the option by id.
	 *
	 * @param id the id of the entity.
	 */
	public void delete(Long id) {
		log.debug("Request to delete option : {}", id);
		optionRepository.deleteById(id);
	}

}
