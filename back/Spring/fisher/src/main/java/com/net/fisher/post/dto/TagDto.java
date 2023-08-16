package com.net.fisher.post.dto;

import com.net.fisher.post.entity.Tag;
<<<<<<< HEAD
=======
import jakarta.persistence.Column;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD
=======

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
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
}
