package com.net.fisher.fish.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity(name = "fishes")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Fish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fish_id")
    private long fishId;

    @Column
    private String name;

    @Column
    private String code;

    @Column(name = "info",columnDefinition = "LONGTEXT")
    private String info;

    @Column(name = "image_url")
    private String imgUrl;
    // 도감에서의 물고기 사진은 static 하다
}
