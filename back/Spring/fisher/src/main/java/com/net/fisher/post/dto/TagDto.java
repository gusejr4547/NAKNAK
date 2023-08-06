package com.net.fisher.post.dto;

import com.net.fisher.post.entity.Tag;
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
