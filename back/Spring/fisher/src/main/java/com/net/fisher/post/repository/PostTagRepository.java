package com.net.fisher.post.repository;

import com.net.fisher.post.dto.TagDto;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.PostTag;
import com.net.fisher.post.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostTagRepository extends JpaRepository<PostTag, Long> {

    @Query(value = "SELECT t FROM tags t JOIN FETCH PostTag c ON t.tagId = c.tag.tagId WHERE c.post.postId = :postId")
    List<Tag> findAllTagByPostId(long postId);

    void deleteByTagAndPost_PostId(Tag tag, long postId);

    void deleteByTagAndPost(Tag tag, Post post);

    List<PostTag> findAllByPost_PostId(long postId);

}

