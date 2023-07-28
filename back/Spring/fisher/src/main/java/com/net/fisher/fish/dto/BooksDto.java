package com.net.fisher.fish.dto;

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
        private LocalDateTime getDate;
        private int number;
    }
}
