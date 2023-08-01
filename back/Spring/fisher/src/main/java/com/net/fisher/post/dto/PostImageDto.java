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

    @Getter
    @AllArgsConstructor
    @Setter
    @NoArgsConstructor
    @Builder
    public static class Response{
        private long fileId;
        private String fileName;
        private long fileSize;
        private String fileContentType;
        private String fileUrl;
    }
}
