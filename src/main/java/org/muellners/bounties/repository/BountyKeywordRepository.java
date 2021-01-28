package org.muellners.bounties.repository;

import org.muellners.bounties.domain.BountyKeyword;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the BountyKeyword entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BountyKeywordRepository extends JpaRepository<BountyKeyword, Long>, JpaSpecificationExecutor<BountyKeyword> {
}
