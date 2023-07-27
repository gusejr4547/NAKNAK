package com.net.fisher.post.entity;

import com.net.fisher.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity(name = "likes")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@ToString
public class Like {
    @Id
    @Column(name="like_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long likeId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id",nullable = true)
    @Setter
    private Post post;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id",nullable = true)
    @Setter
    private Member member;
}

