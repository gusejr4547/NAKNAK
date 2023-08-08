package com.net.fisher.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.net.fisher.member.entity.Member;
import com.net.fisher.post.entity.PostTag;
import com.net.fisher.post.entity.Tag;
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
        private List<String> tags;
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
        private List<Tag> tags;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private long postId;
        private String content;
        private int views;
        @JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss")
        private LocalDateTime registeredAt;

        private long memberId;
        private String memberImageUrl;
        private String memberNickname;

        private List<PostImageDto.Response> images;
        private List<TagDto.SingleResponse> tags;

        private long likeCount;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class SimpleResponse{
        private long postId;
        private String content;
        @JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss")
        private LocalDateTime registeredAt;

        private long memberId;
        private String memberImageUrl;
        private String memberNickname;

        private PostImageDto.Response image;
        private List<TagDto.SingleResponse> tags;

        private long likeCount;
    }
}
