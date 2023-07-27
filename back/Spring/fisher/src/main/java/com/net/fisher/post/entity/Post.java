package com.net.fisher.post.entity;

import com.net.fisher.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity(name = "posts")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Setter
@ToString
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private long postId;

    @Column(name = "content",columnDefinition = "LONGTEXT")
    private String content;


    @Column(name="registered_at",updatable = false)
    @CreatedDate
    private LocalDateTime registeredAt;

    @Column(name="modified_at")
    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @Column(name = "views",updatable = false)
    private int views;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false, name = "member_id")
    private Member member;

}
