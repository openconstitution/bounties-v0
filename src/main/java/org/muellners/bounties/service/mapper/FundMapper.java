package org.muellners.bounties.service.mapper;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.muellners.bounties.domain.Fund;
import org.muellners.bounties.service.dto.FundDTO;
import org.springframework.stereotype.Service;

/**
 * Mapper for the entity {@link Fund} and its DTO called {@link FundDTO}.
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as
 * MapStruct support is still in beta, and requires a manual step with an IDE.
 */
@Service
public class FundMapper {

    public List<FundDTO> fundsToFundDTOs(List<Fund> funds) {
        return funds.stream()
            .filter(Objects::nonNull)
            .map(this::fundToFundDTO)
            .collect(Collectors.toList());
    }

    public FundDTO fundToFundDTO(Fund fund) {
        return new FundDTO(fund);
    }

    public List<Fund> fundDTOsToFunds(List<FundDTO> fundDTOS) {
        return fundDTOS.stream()
            .filter(Objects::nonNull)
            .map(this::fundDTOToFund)
            .collect(Collectors.toList());
    }

    public Fund fundDTOToFund(FundDTO fundDTO) {
        if (fundDTO == null) {
            return null;
        } else {
            Fund fund = new Fund();
            fund.setId(fundDTO.getId());
            fund.setAmount(fundDTO.getAmount());
            fund.setMode(fundDTO.getMode());
            fund.setPaymentAuth(fundDTO.getPaymentAuth());
            return fund;
        }
    }
    
}