package com.net.fisher.fish.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.net.fisher.fish.entity.Fish;
import lombok.*;

import java.time.LocalDateTime;

public class BooksDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private long booksId;
        private long fishId;
        private double maxSize;
        @JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss")
        private LocalDateTime getDate;
        private int number;
    }
}
