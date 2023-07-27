package com.net.fisher.member.repository;

import com.net.fisher.member.entity.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberStatusRepository extends JpaRepository<MemberStatus,Long> {
    MemberStatus findMemberStatusByMember_MemberId(long memberId);
}
