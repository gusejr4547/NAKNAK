package com.net.fisher.post.entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity(name = "post_images")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class PostImage {

    @Id
    @Column(name = "file_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long fileId;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private long fileSize;

    @Column(nullable = false)
    private String fileContentType;

    @Column(nullable = false)
    private String fileUrl;

    @Column(nullable = false)
    @CreatedDate
    private LocalDateTime modifiedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id",nullable = true)
    @Setter
    private Post post;


}