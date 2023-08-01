package com.net.fisher.post.dto;

import lombok.*;

public class LikeDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Post{
        private long postId;
    }
}
