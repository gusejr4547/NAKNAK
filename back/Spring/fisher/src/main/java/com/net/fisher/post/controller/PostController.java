package com.net.fisher.post.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.fish.dto.InventoryDto;
import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.mapper.PostMapper;
import com.net.fisher.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class PostController {

    private final JwtTokenizer jwtTokenizer;
    private final PostMapper postMapper;
    private final PostService postService;

    @PostMapping("/posts/upload")
    public ResponseEntity uploadPost(
            @RequestHeader(name = "Authorization") String token,
            PostDto.Post requestBody,
            MultipartHttpServletRequest httpServletRequest) {

        long tokenId = jwtTokenizer.getMemberId(token);

        System.out.println("###########");
        System.out.println(tokenId);
        System.out.println("###########");
        System.out.println(requestBody);

        postService.uploadPost(tokenId, postMapper.postDtotoPost(requestBody), httpServletRequest);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // post 자세히 보기
    @GetMapping("/posts/{post-id}")
    public ResponseEntity<PostDto.Response> getPost(
            @PathVariable("post-id") long postId,
            @RequestHeader(name = "Authorization") String token){


        return null;
    }

    // 자신의 post 를 수정
    @PatchMapping("/posts/{post-id}")
    public ResponseEntity<PostDto.Response> patchPost(
            @PathVariable("post-id") long postId,
            @RequestHeader(name = "Authorization") String token) {

        long tokenId = jwtTokenizer.getMemberId(token);

        Post post = postService.updatePost(tokenId, postId);

        return null;
    }

    // 자신의 post 에 올린 이미지 삭제
    @DeleteMapping("/posts/image/{file-id}")
    public ResponseEntity<String> deleteFile(
            @PathVariable("file-id") long fileId,
            @RequestHeader(name = "Authorization") String token) {

        long tokenId = jwtTokenizer.getMemberId(token);

        postService.deleteImage(tokenId, fileId);

        return new ResponseEntity<String>("File Deleted", HttpStatus.OK);
    }
}
