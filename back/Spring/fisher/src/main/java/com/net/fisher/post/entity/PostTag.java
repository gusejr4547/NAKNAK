package com.net.fisher.post.entity;

<<<<<<< HEAD
=======
import com.fasterxml.jackson.annotation.JsonBackReference;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_tag_id")
    private long postTagId;


    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public PostTag(Post post, Tag tag){
        this.post = post;
        this.tag = tag;
    }
}
