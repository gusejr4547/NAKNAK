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
    @Column(name = "fishing_hole_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long fishingHoleId;


}
