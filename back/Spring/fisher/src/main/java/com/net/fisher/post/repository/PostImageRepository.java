package com.net.fisher.post.repository;

import com.net.fisher.post.entity.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostImageRepository extends JpaRepository<PostImage, Long> {


    @Query(value="SELECT c FROM post_images c WHERE c.post.postId = :postId")
    List<PostImage> findPostImagesByPostId(long postId);


}
