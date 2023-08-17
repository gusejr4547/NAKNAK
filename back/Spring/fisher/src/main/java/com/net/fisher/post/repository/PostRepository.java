package com.net.fisher.post.repository;

import com.net.fisher.post.dto.TagDto;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.Tag;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;

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

    @Query(value = "select p from posts p where p.member.memberId in :followingMemberList and p.registeredAt <= :time")
    Page<Post> findPostByFollowing(Pageable pageable, List<Long> followingMemberList, LocalDateTime time);


    @Query(value="select pt.tag.tagId as tagId " +
            "from posts p " +
            "join PostTag pt on p.postId = pt.post.postId " +
            "where  p.member.memberId = :memberId " +
            "group by pt.tag.tagId " +
            "order by count(*) desc")
    List<Long> countTagByMemberId(Pageable pageable, long memberId);

    @Query(value = "select pt.tag.tagId as tagId from posts p join PostTag pt on p.postId = pt.post.postId " +
            "group by pt.tag.tagId order by count(*) desc")
    List<Long> countTag(Pageable pageable);


    @Query(value = "select distinct p from posts p join fetch PostTag pt on p.postId = pt.post.postId " +
            "where p.member.memberId not in :followingMemberList and pt.tag.tagId in :tagList and p.registeredAt <= :time")
    Page<Post> findPostFromMyTag(Pageable pageable, @Param("followingMemberList") List<Long> followingMemberList,
                                 @Param("tagList") Set<Long> tagList, LocalDateTime time);


    @Query(value = "select p from posts p " +
            "join fetch PostTag pt on p.postId = pt.post.postId " +
            "where pt.tag = :tag")
    Page<Post> findByTag(Pageable pageable, Tag tag);


    @EntityGraph(attributePaths = {"postTagList"})
    @Query(value = "select p from posts p")
    List<Post> findAllPost();

    @Query(value = "select p from posts p where p.member.memberId not in :followingMemberList and p.registeredAt <= :time")
    Page<Post> findAllExceptFollowing(Pageable pageable, List<Long> followingMemberList, LocalDateTime time);
}
