package com.net.fisher.post.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.post.dto.LikeDto;
import com.net.fisher.post.dto.PostDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.ArrayList;
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

        postService.uploadPost(tokenId, postMapper.postDtoToPost(requestBody), tagMapper.listToTags(requestBody.getTags()), httpServletRequest);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // post 자세히 보기(수정화면?)
    @GetMapping("/posts/{post-id}")
    public ResponseEntity<PostResponse> getPost(
            @PathVariable("post-id") long postId) {

        Post post = postService.getPost(postId);
        List<PostImage> postImages = postService.getPostImage(postId);

        long likeCount = postService.getLikeCount(postId);

        // 태그 얻어오기
        List<Tag> tagList = postService.getTags(postId);

        // view 증가
        postService.increaseViews(postId);

        return new ResponseEntity<>(new PostResponse(postMapper.toPostResponseDto(post), postImageMapper.toPostImageDtos(postImages), likeCount, tagList), HttpStatus.OK);
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
            @RequestBody LikeDto.Post likePostDto) {

        long tokenId = jwtTokenizer.getMemberId(token);

        postService.likePost(tokenId, likePostDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/posts/unlikes")
    public ResponseEntity<String> unlikePost(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody LikeDto.Post likePostDto) {

        long tokenId = jwtTokenizer.getMemberId(token);

        postService.unlikePost(tokenId, likePostDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getTags() {

        List<Tag> tags = postService.getAllTags();

        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping("/posts/my-post")
    public ResponseEntity<PageResponse<PostSimpleResponse>> getMyPosts(
            @RequestHeader(name = "Authorization") String token,
            @PageableDefault(size = 9, sort = "postId", direction = Sort.Direction.DESC) Pageable pageable) {

        long tokenId = jwtTokenizer.getMemberId(token);
        // postId, content, image, tag 정도?

        Page<Post> postPage = postService.getPostFromMember(tokenId, pageable);
        List<Post> postList = postPage.getContent();

        List<PostSimpleResponse> simpleResponses = new ArrayList<>();
        for (Post post : postList) {
            simpleResponses.add(new PostSimpleResponse(
                    postMapper.toPostSimpleResponseDto(post),
                    postImageMapper.postImageToPostImageResponseDto(postService.getOnePostImageByPost(post)),
                    postService.getTags(post.getPostId())));
        }
        PageResponse<PostSimpleResponse> response = new PageResponse<>(postPage.getTotalElements(), simpleResponses);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/posts/my-like")
    public ResponseEntity<PageResponse<PostSimpleResponse>> getMyLikes(
            @RequestHeader(name = "Authorization") String token,
            @PageableDefault(size = 9, sort = "likeId", direction = Sort.Direction.DESC) Pageable pageable) {

        long tokenId = jwtTokenizer.getMemberId(token);

        Page<Post> postPage = postService.getPostFromMemberLike(tokenId, pageable);
        List<Post> postList = postPage.getContent();

        List<PostSimpleResponse> simpleResponses = new ArrayList<>();
        for (Post post : postList) {
            simpleResponses.add(new PostSimpleResponse(
                    postMapper.toPostSimpleResponseDto(post),
                    postImageMapper.postImageToPostImageResponseDto(postService.getOnePostImageByPost(post)),
                    postService.getTags(post.getPostId())));
        }
        PageResponse<PostSimpleResponse> response = new PageResponse<>(postPage.getTotalElements(), simpleResponses);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<PageResponse<PostResponse>> getPosts(
            @RequestHeader(name = "Authorization") String token,
            @PageableDefault(size = 9, sort = "postId", direction = Sort.Direction.DESC) Pageable pageable) {

        long tokenId = jwtTokenizer.getMemberId(token);
        Page<Post> postPage = null;

        postPage = postService.getPostFromFollowing(tokenId, pageable);

        // 더미 데이터
        postPage = postService.getDefaultPost(pageable);

        List<Post> postList = postPage.getContent();
        List<PostResponse> postResponses = new ArrayList<>();
        for (Post post : postList) {
            postResponses.add(new PostResponse(
                    postMapper.toPostResponseDto(post),
                    postImageMapper.toPostImageDtos(postService.getPostImage(post.getPostId())),
                    postService.getLikeCount(post.getPostId()),
                    postService.getTags(post.getPostId())));
        }

        PageResponse<PostResponse> response = new PageResponse<>(postPage.getTotalElements(), postResponses);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}