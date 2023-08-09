package com.net.fisher.comment.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.comment.dto.CommentDto;
import com.net.fisher.comment.entity.Comment;
import com.net.fisher.comment.mapper.CommentMapper;
import com.net.fisher.comment.service.CommentService;
import com.net.fisher.response.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {
    private final JwtTokenizer jwtTokenizer;
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    @PostMapping("/posts/{post-id}/comments")
    public ResponseEntity<Comment> postComment(
            @PathVariable("post-id") long postId,
            @RequestHeader(name = "Authorization") String token,
            @RequestBody CommentDto.Post commentPostDto) {

        long tokenId = jwtTokenizer.getMemberId(token);

        Comment comment = commentService.addComment(tokenId, postId, commentPostDto);

        return new ResponseEntity(commentMapper.toResponseDto(comment), HttpStatus.OK);
    }

    @GetMapping("/posts/{post-id}/comments")
    public ResponseEntity<List<CommentDto.Response>> getComment(
            @PathVariable("post-id") long postId,
            @RequestParam(value = "comment-id", required = false) Long commentId,
            @PageableDefault(size = 6, sort = "commentId", direction = Sort.Direction.DESC) Pageable pageable){

        Page<Comment> commentPage = commentService.getComment(pageable, postId, commentId);

        PageResponse<CommentDto.Response> response = new PageResponse<>(commentPage.getTotalElements(), commentMapper.toResponseDtos(commentPage.getContent()));

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/posts/{post-id}/comments")
    public ResponseEntity deleteComemnt(
            @PathVariable("post-id") long postId,
            @RequestHeader(name = "Authorization") String token,
            @RequestParam(value="comment-id") long commentId){

        long tokenId = jwtTokenizer.getMemberId(token);

        commentService.deleteComment(tokenId, commentId);

        return new ResponseEntity("Delete complete", HttpStatus.OK);
    }

}
