package org.muellners.bounties.service.impl;

import org.muellners.bounties.domain.Fund;
import org.muellners.bounties.repository.FundRepository;
import org.muellners.bounties.service.FundService;
import org.muellners.bounties.service.dto.FundDTO;
import org.muellners.bounties.service.mapper.FundMapper;
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
public class FundServiceImpl implements FundService {

    private final Logger log = LoggerFactory.getLogger(FundServiceImpl.class);

    private final FundRepository fundRepository;
    private final FundMapper fundMapper;

    public FundServiceImpl(FundRepository fundRepository,
                           FundMapper fundMapper) {
        this.fundRepository = fundRepository;
        this.fundMapper = fundMapper;
    }

    @Override
    public FundDTO save(final FundDTO fundDTO) {
        log.debug("Request to save Fund : {}", fundDTO);
        final Fund fund = fundMapper.fundDTOToFund(fundDTO);
        Fund result = fundRepository.save(fund);
        return fundMapper.fundToFundDTO(result);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FundDTO> findAll() {
        log.debug("Request to get all Funds");
        return fundMapper.fundsToFundDTOs(fundRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public FundDTO findOne(Long id) {
        log.debug("Request to get Fund : {}", id);
        final Optional<Fund> fund = fundRepository.findById(id);
        return fundMapper.fundToFundDTO(fund.orElse(null));
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Fund : {}", id);

        fundRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FundDTO> search(String query) {
        log.debug("Request to search Funds for query {}", query);
//        final List<Fund> funds = StreamSupport
//            .stream(fundSearchRepository.search(queryStringQuery(query)).spliterator(), false)
//            .collect(Collectors.toList());
//        return fundMapper.fundsToFundDTOs(funds);
        return null;
    }
}
