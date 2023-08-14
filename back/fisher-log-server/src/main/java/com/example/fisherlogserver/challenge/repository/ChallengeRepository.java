package com.example.fisherlogserver.challenge.repository;


import com.example.fisherlogserver.challenge.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge,Long> {
    long countBy();
}
