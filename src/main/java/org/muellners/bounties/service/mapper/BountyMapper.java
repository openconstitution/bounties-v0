package org.muellners.bounties.service.mapper;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.muellners.bounties.domain.Bounty;
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

    public BountyMapper(final FundingMapper fundingMapper) {
        this.fundingMapper = fundingMapper;
    }

    public List<BountyDTO> bountiesToBountyDTOs(final List<Bounty> bounties) {
        return bounties.stream()
            .filter(Objects::nonNull)
            .map(this::bountyToBountyDTO)
            .collect(Collectors.toList());
    }
    
    public BountyDTO bountyToBountyDTO(final Bounty bounty) {
        final BountyDTO bountyDTO = new BountyDTO(bounty);
        bountyDTO.setFundings(
                bounty.getFundings().stream().map(funding -> {
                    return fundingMapper.fundingToFundingDTO(funding);
                }).collect(Collectors.toSet()));
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
            bounty.setStatus(bountyDTO.getStatus());
            bounty.setIssueUrl(bountyDTO.getIssueUrl());
            bounty.setSummary(bountyDTO.getSummary());
            bounty.setAmount(bountyDTO.getAmount());
            bounty.setExperience(bountyDTO.getExperience());
            bounty.setCommitment(bountyDTO.getCommitment());
            bounty.setType(bountyDTO.getType());
            bounty.setCategory(bountyDTO.getCategory());
            bounty.setKeywords(bountyDTO.getKeywords());
            bounty.setPermission(bountyDTO.getPermission());
            bounty.setExpiryDate(bountyDTO.getExpiryDate());
            bounty.setFundings(bountyDTO.getFundings().stream().map(fundingDTO -> {
                return fundingMapper.fundingDTOToFunding(fundingDTO);
            }).collect(Collectors.toSet()));
            return bounty;
        }
    }

}