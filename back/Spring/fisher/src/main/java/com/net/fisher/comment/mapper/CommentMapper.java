package com.net.fisher.comment.mapper;

import com.net.fisher.comment.dto.CommentDto;
import com.net.fisher.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment postToComment(CommentDto.Post commentPostDto);

    default CommentDto.Response toResponseDto(Comment comment) {
        String fileUrl = "/upload/man.jpeg";
        if (comment.getMember().getMemberImage() != null) fileUrl = comment.getMember().getMemberImage().getFileUrl();

        String mentionMemberNickname = null;
        long mentionMemberId = 0;
        if(comment.getMentionMember() != null) {
            mentionMemberNickname = comment.getMentionMember().getNickname();
            mentionMemberId = comment.getMentionMember().getMemberId();
        }

        CommentDto.Response response = CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .registeredAt(comment.getRegisteredAt())
                .memberId(comment.getMember().getMemberId())
                .memberNickname(comment.getMember().getNickname())
                .memberImageUrl(fileUrl)
                .postId(comment.getPost().getPostId())
                .mentionMemberId(mentionMemberId)
                .mentionMemberNickname(mentionMemberNickname)
                .build();

        return response;
    }

    List<CommentDto.Response> toResponseDtos(List<Comment> comment);
}
