package com.example.fisherlogserver.kafka.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LogDto {
    private long userId;
    private long fishId;
    private double size;
    private double latitude;
    private double longitude;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd kk:mm:ss",timezone = "Asia/Seoul")
    private LocalDateTime logTime;
}
