package com.net.fisher.post.repository;

import com.net.fisher.post.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.Select;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    @Query(value = "SELECT c FROM likes c WHERE c.member.memberId = :memberId AND c.post.postId = :postId")
    Optional<Like> findByMemberIdAndPostId(long memberId, long postId);

    @Query(value = "SELECT c FROM likes c WHERE c.post.postId = :postId")
    List<Like> findAllByPostId(long postId);

    long countByPost_PostId(long postId);
}
