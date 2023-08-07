package com.net.fisher.fish.repository;

import com.net.fisher.fish.entity.FishBowls;
import com.net.fisher.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FishBowlsRepository extends JpaRepository<FishBowls,Long> {
    List<FishBowls> findByMember(Member member);
}
