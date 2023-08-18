package com.net.fisher.comment.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

public class CommentDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Post{
        private String content;
        private long parentCommentId;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Patch{
        private long commentId;
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private long commentId;
        private String content;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime registeredAt;

        private long memberId;
        private String memberImageUrl;
        private String memberNickname;

        private long postId;

        private long mentionMemberId;
        private String mentionMemberNickname;
    }
}
