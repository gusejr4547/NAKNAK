package com.net.fisher.fish.repository;

import com.net.fisher.fish.entity.FishBowls;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishBowlsRepository extends JpaRepository<FishBowls,Long> {
=======
import com.net.fisher.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FishBowlsRepository extends JpaRepository<FishBowls,Long> {
    List<FishBowls> findByMember(Member member);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
}
