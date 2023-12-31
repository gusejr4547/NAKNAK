package com.net.fisher.member.repository;

import com.net.fisher.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {

    Optional<Member> findByEmail(String email);

    @Query("SELECT m FROM members m JOIN follows f ON f.followMember.memberId = m.memberId WHERE f.member.memberId = :memberId ORDER BY f.followId DESC")
    Page<Member> findMembersFromFollowerId(long memberId, Pageable pageable);

    @Query("SELECT m FROM members m JOIN follows f ON f.member.memberId = m.memberId WHERE f.followMember.memberId = :memberId ORDER BY f.followId DESC")
    Page<Member> findMembersFromFollowerIdFollowing(long memberId, Pageable pageable);
}
