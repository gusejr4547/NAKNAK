package com.net.fisher.post.repository;

import com.net.fisher.post.entity.PostTag;
import com.net.fisher.post.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostTagRepository extends JpaRepository<PostTag, Long> {

    @Query(value = "SELECT t FROM tags t JOIN FETCH PostTag c WHERE c.post.postId = :postId")
    List<Tag> findAllTagByPostId(long postId);
}
