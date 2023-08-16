package com.net.fisher.fish.entity;

import jakarta.persistence.*;
<<<<<<< HEAD
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
=======
import lombok.*;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity(name = "fishes")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
<<<<<<< HEAD
=======
@ToString
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
