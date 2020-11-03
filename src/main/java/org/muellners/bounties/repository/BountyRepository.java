package org.muellners.bounties.repository;

import org.muellners.bounties.domain.Bounty;
import org.muellners.bounties.domain.User;
import org.muellners.bounties.domain.enumeration.Status;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Bounty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BountyRepository extends JpaRepository<Bounty, Long> {
	List<Bounty> findByStatusAndHunter(Status status, User hunter);
}
