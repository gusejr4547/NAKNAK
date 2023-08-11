package com.net.fisher.fishinghole.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "fishing_holes")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FishingHole {
    @Id
    @Column(name = "fishing_hole_id",unique = true)
    private long fishingHoleId;

    @Column(name = "title")
    private String title;

    @Column(name = "latitude") //위도
    private double latitude;

    @Column(name = "longitude") //경도
    private double longitude;
}
