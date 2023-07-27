package com.net.fisher.achievement.entity;

import com.net.fisher.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "achieve_check")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AchieveCheck { // 어떤 유저가 어떤 업적을 완료했는지 체크하는 Junction Table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "achieve_check_id")
    private long achieveCheckId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "achievement_id")
    private Achievement achievement;
}
