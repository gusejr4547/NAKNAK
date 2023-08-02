package com.net.fisher.post.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.fish.dto.InventoryDto;
import com.net.fisher.post.dto.LikeDto;
import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.dto.TagDto;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.PostImage;
import com.net.fisher.post.entity.Tag;
import com.net.fisher.post.mapper.PostImageMapper;
import com.net.fisher.post.mapper.PostMapper;
import com.net.fisher.post.mapper.TagMapper;
import com.net.fisher.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.lang.model.element.NestingKind;
import java.util.List;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class PostController {

    private final JwtTokenizer jwtTokenizer;
    private final PostMapper postMapper;
    private final PostImageMapper postImageMapper;
    private final TagMapper tagMapper;
    private final PostService postService;

    @PostMapping("/posts/upload")
    public ResponseEntity uploadPost(
            @RequestHeader(name = "Authorization") String token,
            PostDto.Post requestBody,
            MultipartHttpServletRequest httpServletRequest) {

        long tokenId = jwtTokenizer.getMemberId(token);

        System.out.println("#######################");
        System.out.println(postMapper.postDtoToPost(requestBody));
        System.out.println("#######################");
        System.out.println(tagMapper.listToTags(requestBody.getTags()));

        postService.uploadPost(tokenId, postMapper.postDtoToPost(requestBody), tagMapper.listToTags(requestBody.getTags()), httpServletRequest);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // post 자세히 보기(수정화면?)
    @GetMapping("/posts/{post-id}")
    public ResponseEntity<PostDto.Response> getPost(
            @PathVariable("post-id") long postId) {

        Post post = postService.postDetail(postId);
        List<PostImage> postImages = postService.postImageDetail(postId);

        long likeCount = postService.getLikeCount(postId);

        // 태그 얻어오기
        List<Tag> tagList = postService.getTags(postId);

        // view 증가
        postService.increaseViews(postId);

        return new ResponseEntity<>(postMapper.postToPostResponseDto(post, postImageMapper.toPostImageDtos(postImages), likeCount, tagList), HttpStatus.OK);
    }

    // 자신의 post 를 수정
    @PatchMapping("/posts/{post-id}")
    public ResponseEntity patchPost(
            @PathVariable("post-id") long postId,
            @RequestHeader(name = "Authorization") String token,
            @RequestBody PostDto.Patch postPatchDto) {

        long tokenId = jwtTokenizer.getMemberId(token);

        System.out.println(postPatchDto);

        postService.updatePost(tokenId, postId, postPatchDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 자신의 post 에 올린 이미지 삭제
    @DeleteMapping("/posts/images/{file-id}")
    public ResponseEntity<String> deleteFile(
            @PathVariable("file-id") long fileId,
            @RequestHeader(name = "Authorization") String token) {

        long tokenId = jwtTokenizer.getMemberId(token);

        postService.deleteImage(tokenId, fileId);

        return new ResponseEntity<>("File Deleted", HttpStatus.OK);
    }

    @DeleteMapping("/posts/{post-id}")
    public ResponseEntity<String> deletePost(
            @PathVariable("post-id") long postId,
            @RequestHeader(name = "Authorization") String token) {

        long tokenId = jwtTokenizer.getMemberId(token);

        postService.deletePost(tokenId, postId);

        return new ResponseEntity<>("Post Deleted", HttpStatus.OK);
    }

    @PostMapping("/posts/likes")
    public ResponseEntity<String> likePost(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody LikeDto.Post likePostDto){

        long tokenId = jwtTokenizer.getMemberId(token);

        postService.likePost(tokenId, likePostDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/posts/unlikes")
    public ResponseEntity<String> unlikePost(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody LikeDto.Post likePostDto){

        long tokenId = jwtTokenizer.getMemberId(token);

        postService.unlikePost(tokenId, likePostDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @PostMapping("/tags/")
//    public ResponseEntity uploadTags

}
