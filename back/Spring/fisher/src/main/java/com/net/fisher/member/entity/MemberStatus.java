package com.net.fisher.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "member_status")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberStatus {
    @Id
    @OneToOne
    private Member member;

    @Column(name = "point")
    private int point;

    @Column(name = "exp")
    private long exp;

    @Column(name = "level")
    private int level;

    @Column(name = "is_newbee")
    private boolean isNewBee;

    @Column(name = "tutorial_progress")
    private int tutorialProgress;


}
