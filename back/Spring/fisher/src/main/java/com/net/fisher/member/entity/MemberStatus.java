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

<<<<<<< HEAD
    @Column(name = "is_newbee")
    private int isNewBee;
=======
    @Column(name = "is_newbie")
    private int isNewBie;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

    @Column(name = "tutorial_progress")
    private int tutorialProgress;

<<<<<<< HEAD

=======
    public int setIsNewBie(int isNewBie) {
        return this.isNewBie = isNewBie;
    }
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
}
