package com.net.fisher.post.dto;

import com.net.fisher.post.entity.Tag;
import jakarta.persistence.Column;
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

    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Response{
        List<Tag> tags;
    }

    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SingleResponse{
        private long tagId;
        private String tagName;
    }

    public interface Info{
        Long getTagId();
//        Long getTagCount();
    }

//    @Setter
//    @Getter
//    @NoArgsConstructor
//    @AllArgsConstructor
//    @Builder
//    @ToString
//    public static class Info{
//        long tagId;
//        long tagCount;
//    }
}
