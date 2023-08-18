package com.net.fisher.post.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

public class DateDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Response{
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS")
        private LocalDateTime serverTime;
    }
}
