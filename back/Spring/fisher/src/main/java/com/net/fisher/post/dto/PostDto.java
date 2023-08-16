package com.net.fisher.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.net.fisher.member.entity.Member;
<<<<<<< HEAD
=======
import com.net.fisher.post.entity.PostTag;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD
=======
        private List<Long> deleteImageList;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD
=======

        private List<PostImageDto.Response> images;
        private List<TagDto.SingleResponse> tags;

        private long likeCount;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD
=======

        private PostImageDto.Response image;
        private List<TagDto.SingleResponse> tags;

        private long likeCount;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
    }
}
