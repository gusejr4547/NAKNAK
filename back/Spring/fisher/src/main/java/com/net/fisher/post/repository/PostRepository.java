package com.net.fisher.post.repository;

import com.net.fisher.post.dto.TagDto;
import com.net.fisher.post.entity.Post;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE posts c SET c.views = c.views+1 WHERE c.postId = :postId")
    void upCountByPostId(long postId);

    @Query(value = "SELECT c FROM posts c WHERE c.member.memberId = :memberId")
    Page<Post> findPostByMemberIdFromPage(Pageable pageable, long memberId);


    @Query(value = "select * from posts p where p.member_id in ( select f.follow_member_id from follows f where f.member_id = :memberId ) AND p.registered_at <= :time",
            countQuery = "select * from posts p where p.member_id in ( select f.follow_member_id from follows f where f.member_id = :memberId ) AND p.registered_at <= :time",
            nativeQuery = true)
    Page<Post> findPostByFollowing(Pageable pageable, @Param("memberId") long memberId, @Param("time") LocalDateTime time);


//    @Query(value="")
//    List<TagDto.Info> countTagByMemberId(long memberId);
}
