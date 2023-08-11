package com.net.fisher.fishinghole.repository;

import com.net.fisher.fishinghole.entity.FishingHole;
import com.net.fisher.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FishingHoleRepository extends JpaRepository<FishingHole,Long> {
    long countBy();

    @Query("SELECT f FROM fishing_holes f JOIN FETCH favorite_points p ON f.fishingHoleId = p.fishingHole.fishingHoleId WHERE p.member = :member")
    List<FishingHole> findFishingHolesOfMember(Member member);
}
