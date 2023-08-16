package com.net.fisher.post.repository;

import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostImageRepository extends JpaRepository<PostImage, Long> {

    @Query(value="SELECT c FROM post_images c WHERE c.post.postId = :postId")
    List<PostImage> findPostImagesByPostId(long postId);

//    @Query(value = "SELECT c FROM post_images c WHERE c.post = :post LIMIT 1")
//    PostImage findFirstPostImageByPost(Post post);

    PostImage findFirstByPost(Post post);

<<<<<<< HEAD
=======

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
}
