package com.net.fisher.achievement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "achieves")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Achievement {
    @Id
    @Column(name = "achievement_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long achievementId;

    @Column(name = "numbering")
    private String numbering; // 001

    @Column(name = "title")
    private String title;

    @Column(name = "condition")
    private String condition;

    @Column(name = "content")
    private String content;
}
