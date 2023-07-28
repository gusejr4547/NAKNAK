package com.net.fisher.fish.entity;

import com.net.fisher.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "fish_bowls")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FishBowls { // 누구의 어항에 무슨 물고기가 들어있는지 체크하는 Junction Table
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fishbowl_id")
    private long fishBowlId;

    @ManyToOne
    @JoinColumn
    private Fish fish;

    @ManyToOne
    @JoinColumn
    private Member member;

    @Column(name = "size")
    private double size;
}
