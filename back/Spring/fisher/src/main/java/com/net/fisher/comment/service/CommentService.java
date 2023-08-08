package com.net.fisher.comment.service;

import com.net.fisher.comment.dto.CommentDto;
import com.net.fisher.comment.entity.Comment;
import com.net.fisher.comment.repository.CommentRepository;
import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.member.repository.MemberRepository;
import com.net.fisher.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    public void addComment(long tokenId, long postId, CommentDto.Post commentPostDto) {
        Comment parent = commentRepository.findById(commentPostDto.getParentCommentId()).orElse(null);
        Comment comment = Comment.builder().content(commentPostDto.getContent())
                .member(memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)))
                .post(postRepository.findById(postId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND)))
                .parent(parent).build();

        commentRepository.save(comment);
    }
}
