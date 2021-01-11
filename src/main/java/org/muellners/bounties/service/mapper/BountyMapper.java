package org.muellners.bounties.service.mapper;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.service.OptionService;
import org.muellners.bounties.service.dto.BountyDTO;
import org.springframework.stereotype.Service;

/**
 * Mapper for the entity {@link Bounty} and its DTO called {@link BountyDTO}.
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as MapStruct
 * support is still in beta, and requires a manual step with an IDE.
 */
@Service
public class BountyMapper {

    private final FundingMapper fundingMapper;

    private final OptionService optionService;

    public BountyMapper(final FundingMapper fundingMapper, final OptionService optionService) {
        this.fundingMapper = fundingMapper;
        this.optionService = optionService;
    }

    public List<BountyDTO> bountiesToBountyDTOs(final List<Bounty> bounties) {
        return bounties.stream()
            .filter(Objects::nonNull)
            .map(this::bountyToBountyDTO)
            .collect(Collectors.toList());
    }
    
    public BountyDTO bountyToBountyDTO(final Bounty bounty) {
        final BountyDTO bountyDTO = new BountyDTO(bounty);
        bountyDTO.setFundings(bounty.getFundings().stream()
                        .map(funding -> fundingMapper.fundingToFundingDTO(funding))
                        .collect(Collectors.toSet()));
        return bountyDTO;
    }

    public List<Bounty> bountyDTOsToBounties(final List<BountyDTO> bountyDTOs) {
        return bountyDTOs.stream()
            .filter(Objects::nonNull)
            .map(this::bountyDTOToBounty)
            .collect(Collectors.toList());
    }

    public Bounty bountyDTOToBounty(final BountyDTO bountyDTO) {
        if (bountyDTO == null) {
            return null;
        } else {
            Bounty bounty = new Bounty();
            bounty.setId(bountyDTO.getId());
            bounty.setStatus(optionService.findOneByKey(bountyDTO.getStatus()));
            bounty.setIssueUrl(bountyDTO.getIssueUrl());
            bounty.setSummary(bountyDTO.getSummary());
            bounty.setAmount(bountyDTO.getAmount());
            bounty.setCommitment(bountyDTO.getCommitment());
            bounty.setType(optionService.findOneByKey(bountyDTO.getType()));
            bounty.setCategory(optionService.findOneByKey(bountyDTO.getCategory()));
            bounty.setExperience(optionService.findOneByKey(bountyDTO.getExperience()));
            bounty.setKeywords(bountyDTO.getKeywords());
            bounty.setPermission(bountyDTO.getPermission());
            bounty.setExpiryDate(bountyDTO.getExpiryDate());
            bounty.setFundings(bountyDTO.getFundings().stream()
                    .map(fundingDTO -> fundingMapper.fundingDTOToFunding(fundingDTO))
                    .collect(Collectors.toSet()));
            return bounty;
        }
    }

}