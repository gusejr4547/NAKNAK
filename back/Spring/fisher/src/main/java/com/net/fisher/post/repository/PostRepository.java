package com.net.fisher.post.repository;

import com.net.fisher.post.entity.Post;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE posts c SET c.views = c.views+1 WHERE c.postId = :postId")
    void upCountByPostId(long postId);

    @Query(value = "SELECT c FROM posts c WHERE c.member.memberId = :memberId")
    Page<Post> findPostByMemberIdFromPage(Pageable pageable, long memberId);
}
