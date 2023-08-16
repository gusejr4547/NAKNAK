package com.net.fisher.fish.dto;

<<<<<<< HEAD
=======
import com.fasterxml.jackson.annotation.JsonFormat;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD
=======
        @JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss")
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        private LocalDateTime getDate;
        private int number;
    }
}
