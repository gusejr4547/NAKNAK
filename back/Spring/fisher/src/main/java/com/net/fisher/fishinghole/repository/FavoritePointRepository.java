package com.net.fisher.fishinghole.repository;

import com.net.fisher.fishinghole.entity.FavoritePoint;
import com.net.fisher.fishinghole.entity.FishingHole;
import com.net.fisher.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FavoritePointRepository extends JpaRepository<FavoritePoint,Long> {
    @Query("SELECT count(c) FROM favorite_points c WHERE c.member = :member AND c.fishingHole = :fishingHole")
    long findByMemberIdAndFishingHoleId(Member member, FishingHole fishingHole);

    @Query("SELECT c FROM favorite_points c WHERE c.member.memberId = :memberId AND c.fishingHole.fishingHoleId = :fishingHole")
    FavoritePoint findFavoritePointByMemberAndId(long memberId, long fishingHoleId);
}
