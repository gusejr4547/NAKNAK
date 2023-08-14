package com.example.fisherlogserver.challenge.repository;


import com.example.fisherlogserver.challenge.entity.ChallengeCheck;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ChallengeCheckRepository extends JpaRepository<ChallengeCheck,Long> {
    @Query("select c FROM challenge_checks c WHERE c.memberId = :memberId AND c.challenge.challengeId = :challengeId")
    Optional<ChallengeCheck> findChallengeCheckByMemberIdAndChallengeId(long challengeId, long memberId);



    @Modifying
    @Transactional
    @Query(value = "INSERT INTO challenge_checks (member_id,challenge_id) VALUES (:memberId, :challengeId)",nativeQuery = true)
    void insertChallengeCheck(long memberId, long challengeId);
}
