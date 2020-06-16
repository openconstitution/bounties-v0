package org.muellners.bounties.service.mapper;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.muellners.bounties.domain.Funding;
import org.muellners.bounties.service.dto.FundingDTO;
import org.springframework.stereotype.Service;

/**
 * Mapper for the entity {@link Funding} and its DTO called {@link FundingDTO}.
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as
 * MapStruct support is still in beta, and requires a manual step with an IDE.
 */
@Service
public class FundingMapper {

    public List<FundingDTO> fundingsToFundingDTOs(List<Funding> fundings) {
        return fundings.stream()
            .filter(Objects::nonNull)
            .map(this::fundingToFundingDTO)
            .collect(Collectors.toList());
    }

    public FundingDTO fundingToFundingDTO(Funding funding) {
        return new FundingDTO(funding);
    }

    public List<Funding> fundingDTOsToFundings(List<FundingDTO> fundingDTOs) {
        return fundingDTOs.stream()
            .filter(Objects::nonNull)
            .map(this::fundingDTOToFunding)
            .collect(Collectors.toList());
    }

    public Funding fundingDTOToFunding(FundingDTO fundingDTO) {
        if (fundingDTO == null) {
            return null;
        } else {
            Funding funding = new Funding();
            funding.setId(fundingDTO.getId());
            funding.setAmount(fundingDTO.getAmount());
            funding.setMode(fundingDTO.getMode());
            funding.setPaymentAuth(fundingDTO.getPaymentAuth());
            funding.setBounty(fundingDTO.getBounty());
            return funding;
        }
    }
    
}