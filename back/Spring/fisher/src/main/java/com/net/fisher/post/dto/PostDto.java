package com.net.fisher.post.dto;

import lombok.*;

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


    public static class Response{
        private Long postId;
    }
}
