package com.example.fisherlogserver.challenge.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "challenges")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Challenge {
    @Id
    @Column(name = "challenge_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long challengeId;

    @Column(name = "numbering")
    private String numbering; // 001

    @Column(name = "title")
    private String title;

    @Column(name = "task")
    private String task;

    @Column(name = "content")
    private String content;
}
