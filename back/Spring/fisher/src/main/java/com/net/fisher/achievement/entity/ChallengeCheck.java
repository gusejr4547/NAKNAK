package com.net.fisher.achievement.entity;

import com.net.fisher.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "challenge_checks")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeCheck { // 어떤 유저가 어떤 업적을 완료했는지 체크하는 Junction Table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_check_id")
    private long challengeCheckId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;
}
