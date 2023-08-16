package com.net.fisher.member.repository;

import com.net.fisher.member.entity.MemberStatus;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;
=======
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
import org.springframework.data.jpa.repository.Query;

public interface MemberStatusRepository extends JpaRepository<MemberStatus,Long> {
    MemberStatus findMemberStatusByMember_MemberId(long memberId);
<<<<<<< HEAD
=======

    @Query("UPDATE member_status c SET c.isNewBie = :isNewbie WHERE c.member.memberId = :memberId")
    @Transactional
    @Modifying
    int setStatusForIsNewbie(long memberId, int isNewbie);

    @Query("UPDATE member_status c SET c.tutorialProgress = :tutorialProgress WHERE c.member.memberId = :memberId")
    @Transactional
    @Modifying
    int setStatusForTutorialProgress(long memberId, int tutorialProgress);

    @Query("SELECT c.isNewBie FROM member_status c WHERE c.member.memberId = :memberId")
    int getIsNewbie(long memberId);

    @Query("SELECT c.tutorialProgress FROM member_status c WHERE c.member.memberId = :memberId")
    int getTutorialProgress(long memberId);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
}
