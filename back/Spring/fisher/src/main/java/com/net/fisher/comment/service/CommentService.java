package com.net.fisher.comment.service;

import com.net.fisher.comment.dto.CommentDto;
import com.net.fisher.comment.entity.Comment;
import com.net.fisher.comment.repository.CommentRepository;
import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.member.repository.MemberRepository;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.repository.PostRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public long addComment(long tokenId, long postId, CommentDto.Post commentPostDto) {

        Post post = postRepository.findById(postId).orElseThrow(()->new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));


        Comment parent = null;
        if(commentPostDto.getParentCommentId() != 0){
            // 대댓글인 경우
            parent = commentRepository.findById(commentPostDto.getParentCommentId()).orElseThrow(()->new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
            // 부모의 post 와 현재 post 가 다른경우
            if(parent.getPost().getPostId() != post.getPostId()){
                throw new BusinessLogicException(ExceptionCode.PARENT_NOT_MATCH);
            }
        }


        Comment comment = Comment.builder().content(commentPostDto.getContent())
                .member(memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)))
                .post(post)
                .parent(parent)
                .build();

        return comment.getCommentId();
    }

    public List<Comment> getComment(long postId, long commentId) {

        return null;
    }
}
