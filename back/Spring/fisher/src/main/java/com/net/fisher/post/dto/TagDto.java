package com.net.fisher.post.dto;

import lombok.*;

import java.util.List;

public class TagDto {

    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Post{
        List<String> tags;
    }
}
