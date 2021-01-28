package org.muellners.bounties.service.impl;

import org.muellners.bounties.domain.Option;
import org.muellners.bounties.repository.OptionRepository;
import org.muellners.bounties.service.OptionService;
import org.muellners.bounties.service.dto.OptionDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Transactional
public class OptionServiceImpl implements OptionService {

	private final Logger log = LoggerFactory.getLogger(OptionServiceImpl.class);

	private final OptionRepository optionRepository;

	public OptionServiceImpl(final OptionRepository optionRepository) {
		this.optionRepository = optionRepository;
	}

	@Override
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

	@Override
	@Transactional(readOnly = true)
	public OptionDTO findOne(Long id) {
		log.debug("Request to get an option : {}", id);
		final Optional<Option> option = optionRepository.findById(id);
		return new OptionDTO(option.orElseThrow(IllegalArgumentException::new));
	}

	@Override
	@Transactional(readOnly = true)
	public Option findOneByKey(String key) {
		log.debug("Request to get an option : {}", key);
		final Optional<Option> option = optionRepository.findByKey(key);
		return option.orElseThrow(IllegalArgumentException::new);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Option> findOptionsByName(final String name) {
		log.debug("Request to get all Options by name: {}", name);
		return optionRepository.findByName(name);
	}

	@Override
	@Transactional(readOnly = true)
	public List<OptionDTO> findAll() {
		log.debug("Request to get all Options");
		return optionRepository.findAll()
				.stream()
				.map(OptionDTO::new)
				.collect(Collectors.toList());
	}

	@Override
	public void delete(Long id) {
		log.debug("Request to delete option : {}", id);
		optionRepository.deleteById(id);
	}

	@Override
	public List<OptionDTO> search(String query) {
		log.debug("Request to search options with query : {}", query);
//		return StreamSupport
//				.stream(optionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
//				.map(OptionDTO::new)
//				.collect(Collectors.toList());
		return null;
	}
}
