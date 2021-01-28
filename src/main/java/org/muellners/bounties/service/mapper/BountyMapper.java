package org.muellners.bounties.service.mapper;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.domain.Issue;
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

    private final FundMapper fundMapper;

    private final OptionService optionService;

    public BountyMapper(final FundMapper fundMapper, final OptionService optionService) {
        this.fundMapper = fundMapper;
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
        bountyDTO.setFunds(bounty.getFunds().stream()
                        .map(fundMapper::fundToFundDTO)
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
            bounty.setSummary(bountyDTO.getSummary());
            bounty.setDescription(bountyDTO.getDescription());
            bounty.setIssue(new Issue().url(bountyDTO.getIssueUrl()));
            bounty.setAmount(bountyDTO.getAmount());
            bounty.setStatus(optionService.findOneByKey(bountyDTO.getStatusKey()));
            bounty.setCommitment(optionService.findOneByKey(bountyDTO.getCommitmentKey()));
            bounty.setType(optionService.findOneByKey(bountyDTO.getTypeKey()));
            bounty.setCategory(optionService.findOneByKey(bountyDTO.getCategoryKey()));
            bounty.setExperience(optionService.findOneByKey(bountyDTO.getExperienceKey()));
//            bounty.setKeywords(bountyDTO.getKeywords());
            bounty.setPermission(bountyDTO.getPermission());
            bounty.setExpiryDate(bountyDTO.getExpiryDate());
            bounty.setFunds(bountyDTO.getFunds().stream()
                    .map(fundMapper::fundDTOToFund)
                    .collect(Collectors.toSet()));
            return bounty;
        }
    }

}