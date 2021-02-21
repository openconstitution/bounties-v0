package org.muellners.bounties.service.impl;

import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.domain.Fund;
import org.muellners.bounties.domain.User;
import org.muellners.bounties.domain.enumeration.Status;
import org.muellners.bounties.repository.BountyRepository;
import org.muellners.bounties.repository.UserRepository;
import org.muellners.bounties.service.BountyService;
import org.muellners.bounties.service.dto.BountyDTO;
import org.muellners.bounties.service.dto.FundDTO;
import org.muellners.bounties.service.mapper.BountyMapper;
import org.muellners.bounties.service.mapper.FundMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class BountyServiceImpl implements BountyService {

    private final Logger log = LoggerFactory.getLogger(BountyService.class);

    private final FundMapper fundMapper;
    private final UserRepository userRepository;
    private final BountyRepository bountyRepository;
    private final BountyMapper bountyMapper;

    public BountyServiceImpl(final FundMapper fundMapper,
                         final BountyMapper bountyMapper,
                         final UserRepository userRepository,
                         final BountyRepository bountyRepository) {
        this.fundMapper = fundMapper;
        this.bountyMapper = bountyMapper;
        this.userRepository = userRepository;
        this.bountyRepository = bountyRepository;
    }

    @Override
    public BountyDTO save(final BountyDTO bountyDTO) {
        log.debug("Request to save Bounty : {}", bountyDTO);
        // Before we go and save the url from git/bitbucket/jira/or anything else
        final Bounty bounty = bountyMapper.toEntity(bountyDTO);
		bounty.setAmount(bounty.getFunds().stream()
				.map(Fund::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add));
		bountyRepository.save(bounty);
        log.debug("Updated Bounty : {}", bounty);
        Bounty result = bountyRepository.save(bounty);
        return bountyMapper.toDTO(result);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BountyDTO> findAll() {
        log.debug("Request to get all Bounty");
        return bountyMapper.toDTOs(bountyRepository.findAll());
    }

    @Override
	@Transactional(readOnly = true)
	public Page<BountyDTO> findAll(Pageable pageable) {
		log.debug("Request to get all Bounty");
		return bountyRepository.findAll(pageable).map(bountyMapper::toDTO);
	}

    @Override
    @Transactional(readOnly = true)
    public List<BountyDTO> findAllByUserByStatus(Status status, String hunterLogin) {
        log.debug("Request to get all Bounties by {} by {}", status, hunterLogin);
        final User hunter = userRepository.findOneByLogin(hunterLogin).orElseThrow(IllegalArgumentException::new);
        return bountyRepository.findByStatusAndHunter(status, hunter).stream()
                .map(bountyMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<BountyDTO> findOne(Long id) {
        log.debug("Request to get Bounty : {}", id);
        final Optional<Bounty> bounty = bountyRepository.findById(id);
		return bounty.map(bountyMapper::toDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public BountyDTO addFunds(final Long id, final List<FundDTO> funds) {
        log.debug("Request to add funds: {} to Bounty : {}", funds, id);
        final Bounty bounty = bountyRepository.findById(id)
                        .orElseThrow(EntityNotFoundException::new);
        funds.stream().map(fund -> bounty.addFunds(this.fundMapper.fundDTOToFund(fund)));
		bounty.setAmount(bounty.getFunds().stream()
				.map(Fund::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add));
        bountyRepository.save(bounty);
        log.debug("Bounty with added funds {}", bounty);
        return bountyMapper.toDTO(bounty);
    }

    @Override
    @Transactional(readOnly = true)
    public BountyDTO removeFunds(final Long id, final List<FundDTO> funds) {
        log.debug("Request to remove funds: {} to Bounty : {}", funds, id);
        final Bounty bounty = bountyRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
        funds.stream().map(fund -> bounty.removeFunds(this.fundMapper.fundDTOToFund(fund)));
		bounty.setAmount(bounty.getFunds().stream()
				.map(Fund::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add));
		bountyRepository.save(bounty);
        log.debug("Bounty with removed funds {}", bounty);
        return bountyMapper.toDTO(bounty);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bounty : {}", id);

        bountyRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BountyDTO> search(String query) {
        log.debug("Request to search Bounty for query {}", query);
//        final List<Bounty> bounties = StreamSupport
//            .stream(bountySearchRepository.search(queryStringQuery(query)).spliterator(), false)
//            .collect(Collectors.toList());
//        return bountyMapper.bountiesToBountyDTOs(bounties);
        return null;
    }
}
