package com.net.fisher.post.dto;

import lombok.*;

public class PostImageDto {

    @Getter
    @AllArgsConstructor
    @Setter
    @NoArgsConstructor
    @Builder
    public static class Post{
        private long fileId;
    }
}
