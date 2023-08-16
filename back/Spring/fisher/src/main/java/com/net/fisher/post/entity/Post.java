package com.net.fisher.post.entity;

<<<<<<< HEAD
import com.net.fisher.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
=======
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.net.fisher.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
<<<<<<< HEAD
=======
import java.util.ArrayList;
import java.util.List;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

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

<<<<<<< HEAD
    @ManyToOne(optional = false)
    @JoinColumn(nullable = false, name = "member_id")
    private Member member;

=======
    @Column(name = "likes")
    @Setter
    private long likes;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false, name = "member_id")
    @BatchSize(size = 100)
    private Member member;

    @OneToMany(mappedBy = "post",cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
    @Setter
    @JsonBackReference
    @BatchSize(size = 100)
    private List<PostTag> postTagList = new ArrayList<>();

    @OneToMany(mappedBy = "post",cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
    @Setter
    @BatchSize(size = 100)
    private List<PostImage> postImageList = new ArrayList<>();

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
}
