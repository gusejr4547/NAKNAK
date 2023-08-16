package com.net.fisher.fishinghole.entity;


import com.net.fisher.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "favorite_points")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoritePoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="favorite_point_id")
    private long favoritePointId;

    @ManyToOne
    @JoinColumn
    private Member member;

    @ManyToOne
    @JoinColumn
    private FishingHole fishingHole;

}
