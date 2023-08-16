package com.net.fisher.comment.repository;

import com.net.fisher.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "SELECT c FROM comments c WHERE c.post.postId = :postId AND c.parent = null ")
    Page<Comment> findByPostId(Pageable pageable, long postId);


    Page<Comment> findByPost_PostIdAndParent_CommentId(Pageable pageable, long postId, long commentId);
}
