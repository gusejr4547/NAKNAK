package com.net.fisher.challenge.repository;

import com.net.fisher.challenge.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge,Long> {
    long countBy();
}
