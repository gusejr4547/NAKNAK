package com.net.fisher.comment.service;

import com.net.fisher.comment.dto.CommentDto;
import com.net.fisher.comment.entity.Comment;
import com.net.fisher.comment.repository.CommentRepository;
import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.repository.MemberRepository;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.repository.PostRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Comment addComment(long tokenId, long postId, CommentDto.Post commentPostDto) {

        Post post = postRepository.findById(postId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));


        Comment parent = null;
        if (commentPostDto.getParentCommentId() != 0) {
            // 대댓글인 경우
            parent = commentRepository.findById(commentPostDto.getParentCommentId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
            // 부모의 post 와 현재 post 가 다른경우
            if (parent.getPost().getPostId() != post.getPostId()) {
                throw new BusinessLogicException(ExceptionCode.PARENT_NOT_MATCH);
            }
        }

        Member mentionMember = null;

        // 계층 구조 조정, 현재 parent 가 존재하는경우 parent 의 parent 가 있으면 조정
        if(parent != null && parent.getParent() != null){
            mentionMember = parent.getMember();
            parent = parent.getParent();
        }

        Comment comment = Comment.builder().content(commentPostDto.getContent())
                .member(memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)))
                .post(post)
                .parent(parent)
                .mentionMember(mentionMember)
                .build();

        commentRepository.save(comment);

        return comment;
    }

    public Page<Comment> getComment(Pageable pageable, long postId, Long commentId) {

        Page<Comment> commentList = null;
        if (commentId != null) {
            commentList = commentRepository.findByPost_PostIdAndParent_CommentId(pageable, postId, commentId);
        } else {
            commentList = commentRepository.findByPostId(pageable, postId);
        }

        return commentList;
    }

    public void deleteComment(long tokenId, long commentId) {
        Member member = memberRepository.findById(tokenId).orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Comment comment = commentRepository.findById(commentId).orElseThrow(()->new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        if(member.getMemberId() != comment.getMember().getMemberId()){
            throw new BusinessLogicException(ExceptionCode.NOT_AUTHORIZED_USER);
        }

        commentRepository.delete(comment);
    }
}
