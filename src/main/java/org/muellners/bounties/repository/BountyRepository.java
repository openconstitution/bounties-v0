package org.muellners.bounties.repository;

import org.muellners.bounties.domain.Bounty;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Bounty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BountyRepository extends JpaRepository<Bounty, Long> {
}
