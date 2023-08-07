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


    @Query(value="select pt.tag.tagId as tagId " +
            "from posts p " +
            "join PostTag pt on p.postId = pt.post.postId " +
            "where  p.member.memberId = :memberId " +
            "group by pt.tag.tagId " +
            "order by count(*) desc")
    List<Long> countTagByMemberId(Pageable pageable, long memberId);


    @Query(value = "select distinct * " +
            "from posts p " +
            "join members m on p.member_id = m.member_id " +
            "join post_tag pt on p.post_id = pt.post_id " +
            "join tags t on pt.tag_id = t.tag_id " +
            "where p.member_id not in (" +
            "select follow_member_id from follows where member_id = :memberId " +
            ") " +
            "and pt.tag_id in :tagList",
            countQuery = "select distinct * " +
                    "from posts p " +
                    "join members m on p.member_id = m.member_id " +
                    "join post_tag pt on p.post_id = pt.post_id " +
                    "join tags t on pt.tag_id = t.tag_id " +
                    "where p.member_id not in (" +
                    "select follow_member_id from follows where member_id = :memberId " +
                    ") " +
                    "and pt.tag_id in :tagList",
            nativeQuery = true)
    Page<Post> findPostFromMyTag(Pageable pageable, long memberId, List<Long> tagList);
}
