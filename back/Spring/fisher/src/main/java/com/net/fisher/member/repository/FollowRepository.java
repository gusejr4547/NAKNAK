package com.net.fisher.member.repository;

import com.net.fisher.member.entity.Follow;
import com.net.fisher.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow,Long> {
    @Query("SELECT c FROM follows c WHERE c.member.memberId = :fromId AND c.followMember.memberId = :toId")
    Optional<Follow> findFollowFromToId(long fromId, long toId);


}
