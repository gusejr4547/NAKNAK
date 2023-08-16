package com.net.fisher.member.repository;

import com.net.fisher.member.entity.Follow;
import com.net.fisher.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

<<<<<<< HEAD
=======
import java.util.List;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow,Long> {
    @Query("SELECT c FROM follows c WHERE c.member.memberId = :fromId AND c.followMember.memberId = :toId")
    Optional<Follow> findFollowFromToId(long fromId, long toId);
<<<<<<< HEAD
=======

    @Query(value = "select f.followMember.memberId from follows f where f.member.memberId = :memberId")
    Optional<List<Long>> findFollowMemberIdByMember_MemberId(long memberId);

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
}
