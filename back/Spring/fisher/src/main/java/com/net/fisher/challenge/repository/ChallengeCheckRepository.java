package com.net.fisher.challenge.repository;

import com.net.fisher.challenge.entity.Challenge;
import com.net.fisher.challenge.entity.ChallengeCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChallengeCheckRepository extends JpaRepository<ChallengeCheck,Long> {
    @Query(value = "SELECT c FROM challenge_checks c JOIN FETCH c.challenge WHERE c.member.memberId = :memberId")
    List<ChallengeCheck> findChallengeChecksByMemberId(long memberId);
}
