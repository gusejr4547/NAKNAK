package com.net.fisher.post.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity(name = "tags")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private long tagId;

    @Column(name = "tag_name",nullable = false)
    private String tagName;

    /*@OneToMany(mappedBy = "board",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @Setter
    private List<BoardTag> boardTags = new ArrayList<>();*/

    public Tag(String tagName){
        this.tagName = tagName;
    }
}
