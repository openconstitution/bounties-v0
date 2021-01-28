package org.muellners.bounties.repository;

import org.muellners.bounties.domain.Fund;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Fund entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FundRepository extends JpaRepository<Fund, Long>, JpaSpecificationExecutor<Fund> {
}
