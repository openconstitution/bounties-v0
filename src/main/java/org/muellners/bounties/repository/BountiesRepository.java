package org.muellners.bounties.repository;

import org.muellners.bounties.domain.Bounties;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Bounties entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BountiesRepository extends JpaRepository<Bounties, Long> {
}
