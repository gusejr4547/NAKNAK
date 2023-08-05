package com.net.fisher.member.repository;

import com.net.fisher.member.entity.MemberStatus;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface MemberStatusRepository extends JpaRepository<MemberStatus,Long> {
    MemberStatus findMemberStatusByMember_MemberId(long memberId);

    @Query("UPDATE member_status c SET c.isNewBie = :isNewbie WHERE c.member.memberId = :memberId")
    @Transactional
    @Modifying
    int setStatusForIsNewbie(long memberId, int isNewbie);
}
