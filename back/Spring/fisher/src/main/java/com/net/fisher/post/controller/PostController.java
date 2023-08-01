package com.net.fisher.post.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.fish.dto.InventoryDto;
import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.PostImage;
import com.net.fisher.post.mapper.PostImageMapper;
import com.net.fisher.post.mapper.PostMapper;
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
    private final PostService postService;

    @PostMapping("/posts/upload")
    public ResponseEntity uploadPost(
            @RequestHeader(name = "Authorization") String token,
            PostDto.Post requestBody,
            MultipartHttpServletRequest httpServletRequest) {

        long tokenId = jwtTokenizer.getMemberId(token);

        postService.uploadPost(tokenId, postMapper.postDtotoPost(requestBody), httpServletRequest);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // post 자세히 보기
    @GetMapping("/posts/{post-id}")
    public ResponseEntity<PostDto.Response> getPost(
            @PathVariable("post-id") long postId) {

        Post post = postService.postDetail(postId);
        List<PostImage> postImages = postService.postImageDetail(postId);

        return new ResponseEntity<>(postMapper.postToPostResponseDto(post, postImageMapper.toPostImageDtos(postImages)), HttpStatus.OK);
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

        postService.deletePost(tokenId);

        return new ResponseEntity<>("Post Deleted", HttpStatus.OK);
    }


}
