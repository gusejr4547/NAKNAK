package com.net.fisher.post.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.post.dto.DateDto;
import com.net.fisher.post.dto.LikeDto;
import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.dto.PostImageDto;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.PostImage;
import com.net.fisher.post.entity.Tag;
import com.net.fisher.post.mapper.PostImageMapper;
import com.net.fisher.post.mapper.PostMapper;
import com.net.fisher.post.mapper.TagMapper;
import com.net.fisher.post.service.PostService;
import com.net.fisher.response.PageResponse;
import com.net.fisher.response.PostResponse;
import com.net.fisher.response.PostSimpleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
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

        postService.uploadPost(tokenId, postMapper.postDtoToPost(requestBody), tagMapper.listToTags(requestBody.getTags()), httpServletRequest);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // post 자세히 보기(수정화면?)
    @GetMapping("/posts/{post-id}")
    public ResponseEntity<PostDto.Response> getPost(
            @PathVariable("post-id") long postId) {

        Post post = postService.getPost(postId);

        // view 증가
        postService.increaseViews(postId);

        return new ResponseEntity<>(postMapper.toPostResponseDto(post), HttpStatus.OK);
    }

    // 자신의 post 를 수정
    @PatchMapping("/posts/{post-id}")
    public ResponseEntity patchPost(
            @PathVariable("post-id") long postId,
            @RequestHeader(name = "Authorization") String token,
            @RequestBody PostDto.Patch postPatchDto) {

        long tokenId = jwtTokenizer.getMemberId(token);

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
    public ResponseEntity likePost(
            @RequestParam(name = "post") Long postId,
            @RequestHeader(name = "Authorization") String token) {

        long tokenId = jwtTokenizer.getMemberId(token);

        long likeCount = postService.likePost(tokenId, postId);

        return new ResponseEntity<>(likeCount, HttpStatus.OK);
    }

    @PostMapping("/posts/unlikes")
    public ResponseEntity unlikePost(
            @RequestParam(name = "post") long postId,
            @RequestHeader(name = "Authorization") String token) {

        long tokenId = jwtTokenizer.getMemberId(token);

        long likeCount = postService.unlikePost(tokenId, postId);

        return new ResponseEntity<>(likeCount, HttpStatus.OK);
    }

    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getTags() {

        List<Tag> tags = postService.getAllTags();

        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping("/posts/my-post")
    public ResponseEntity<PageResponse<PostDto.SimpleResponse>> getMyPosts(
            HttpServletRequest request,
            @RequestHeader(name = "Authorization") String token,
            @RequestParam(value = "memberId") Long memberId,
            @PageableDefault(size = 9, sort = "postId", direction = Sort.Direction.DESC) Pageable pageable) {

        System.out.println(request.getRequestURL() + " " + request.getQueryString());
        long tokenId = jwtTokenizer.getMemberId(token);
        // postId, content, image, tag 정도?

        Page<Post> postPage = postService.getPostFromMember(memberId, pageable);
        List<Post> postList = postPage.getContent();

        PageResponse<PostDto.SimpleResponse> response = new PageResponse<>(postPage.getTotalElements(), postMapper.toSimpleResponseDtos(postList));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/posts/my-like")
    public ResponseEntity<PageResponse<PostDto.SimpleResponse>> getMyLikes(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam(value = "memberId") Long memberId,
            @PageableDefault(size = 9, sort = "likeId", direction = Sort.Direction.DESC) Pageable pageable) {

        long tokenId = jwtTokenizer.getMemberId(token);

        Page<Post> postPage = postService.getPostFromMemberLike(memberId, pageable);
        List<Post> postList = postPage.getContent();

        PageResponse<PostDto.SimpleResponse> response = new PageResponse<>(postPage.getTotalElements(), postMapper.toSimpleResponseDtos(postList));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity getPosts(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS") LocalDateTime time,
            @PageableDefault(size = 6, sort = "post_id", direction = Sort.Direction.DESC) Pageable pageable) {

//        System.out.println(time.toString());
        long tokenId = jwtTokenizer.getMemberId(token);

        Page<Post> postPage = postService.getPostFromMyWay(tokenId, pageable, time);

        List<Post> postList = postPage.getContent();

        PageResponse<PostDto.Response> response = new PageResponse<>(postPage.getTotalElements(), postMapper.toPostResponseDtos(postList));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/posts/search")
    public ResponseEntity<PageResponse<PostDto.Response>> getPosts(
            @RequestParam(value = "tag") long tagId,
            @PageableDefault(size = 6, sort = "postId", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<Post> postPage = postService.getPostByTag(pageable, tagId);

        PageResponse<PostDto.Response> response = new PageResponse<>(postPage.getTotalElements(), postMapper.toPostResponseDtos(postPage.getContent()));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/time/server")
    public ResponseEntity<DateDto.Response> getServerTime(){
        return new ResponseEntity<>(DateDto.Response.builder().serverTime(LocalDateTime.now()).build(),HttpStatus.OK);
    }
}
