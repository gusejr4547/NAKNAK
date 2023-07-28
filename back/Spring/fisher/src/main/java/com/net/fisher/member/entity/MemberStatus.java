package com.net.fisher.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity(name = "member_status")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberStatus{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_status_id")
    private long memberStatusId;

    @OneToOne
    @JoinColumn(name = "member_id")
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
