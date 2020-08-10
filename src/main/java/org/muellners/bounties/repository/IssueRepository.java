package org.muellners.bounties.repository;

import org.muellners.bounties.domain.Issue;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Issue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
}
