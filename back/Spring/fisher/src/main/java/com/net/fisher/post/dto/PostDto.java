package com.net.fisher.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.net.fisher.member.entity.Member;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

public class PostDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Post{
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Patch{
        private long postId;
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private long postId;
        private String content;
        @JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss")
        private LocalDateTime registeredAt;

        private long memberId;
        private String memberImageUrl;
        private String memberNickname;

        private List<PostImageDto.Response> postImageDtos;

        // 좋아요

    }
}
