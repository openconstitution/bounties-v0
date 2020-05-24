package org.muellners.bounties.repository;

import org.muellners.bounties.domain.Bounties;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Bounties entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BountiesRepository extends JpaRepository<Bounties, Long> {

    @Query("select b from Bounties b where b.createdBy = ?#{T(org.muellners.bounties.security.SecurityUtils).currentUserLoginString}")
    List<Bounties> findAllByUser();
}
