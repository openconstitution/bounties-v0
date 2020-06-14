package org.muellners.bounties.service.mapper;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
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

    public List<BountyDTO> bountiesToBountyDTOs(final List<Bounty> bounties) {
        return bounties.stream()
            .filter(Objects::nonNull)
            .map(this::bountyToBountyDTO)
            .collect(Collectors.toList());
    }
    
    public BountyDTO bountyToBountyDTO(Bounty bounty) {
        return new BountyDTO(bounty);
    }

	public BountyDTO bountyToBountyDTO(Optional<Bounty> bounty) {
        return new BountyDTO(bounty.orElse(null));
	}

    public List<Bounty> bountyDTOsToBounties(final List<BountyDTO> bountyDTOs) {
        return bountyDTOs.stream()
            .filter(Objects::nonNull)
            .map(this::bountyDTOTOBounty)
            .collect(Collectors.toList());
    }

    public Bounty bountyDTOTOBounty(BountyDTO bountyDTO) {
        if (bountyDTO == null) {
            return null;
        } else {
            Bounty bounty = new Bounty();
            bounty.setId(bountyDTO.getId());
            bounty.setStatus(bountyDTO.getStatus());
            bounty.setUrl(bountyDTO.getUrl());
            bounty.setAmount(bountyDTO.getAmount());
            bounty.setExperience(bountyDTO.getExperience());
            bounty.setCommitment(bountyDTO.getCommitment());
            bounty.setType(bountyDTO.getType());
            bounty.setCategory(bountyDTO.getCategory());
            bounty.setKeywords(bountyDTO.getKeywords());
            bounty.setPermission(bountyDTO.getPermission());
            bounty.setExpires(bountyDTO.getExpires());
            bounty.setFundings(bountyDTO.getFunding());
            bounty.setIssue(bountyDTO.getIssue());
            return bounty;
        }
    }

}