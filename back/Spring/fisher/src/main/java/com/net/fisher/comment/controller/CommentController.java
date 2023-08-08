package com.net.fisher.comment.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.comment.dto.CommentDto;
import com.net.fisher.comment.entity.Comment;
import com.net.fisher.comment.mapper.CommentMapper;
import com.net.fisher.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/comments/{post-id}")
    public ResponseEntity<Comment> postComment(
            @PathVariable("post-id") long postId,
            @RequestHeader(name = "Authorization") String token,
            @RequestBody CommentDto.Post commentPostDto) {

        long tokenId = jwtTokenizer.getMemberId(token);

        long commentId = commentService.addComment(tokenId, postId, commentPostDto);

        return new ResponseEntity(commentId, HttpStatus.OK);
    }

    @GetMapping("/comments/{post-id}")
    public ResponseEntity getComment(
            @RequestParam("comment-id") long commentId,
            @PathVariable("post-id") long postId){

        List<Comment> commentList = commentService.getComment(postId, commentId);

        return new ResponseEntity(HttpStatus.OK);
    }

}
