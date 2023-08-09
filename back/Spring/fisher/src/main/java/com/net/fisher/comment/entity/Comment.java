package com.net.fisher.comment.entity;

import com.net.fisher.member.entity.Member;
import com.net.fisher.post.entity.Post;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "comments")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Setter
@ToString
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private long commentId;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name="registered_at",updatable = false)
    @CreatedDate
    private LocalDateTime registeredAt;

    @Column(name="modified_at")
    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    @Setter
    @BatchSize(size = 100)
    Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memeber_id")
    @Setter
    @BatchSize(size = 100)
    Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mention_member_id")
    private Member mentionMember;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    @Setter
    private Comment parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY,
    cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> child;
}
