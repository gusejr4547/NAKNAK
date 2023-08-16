package com.net.fisher.challenge.repository;

import com.net.fisher.challenge.entity.Challenge;
import com.net.fisher.fish.entity.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge,Long> {
    long countBy();




}
