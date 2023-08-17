package com.example.fisherlogserver.fishinglog.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "fishingLog")
@ToString
public class FishingLog {
    @Id
    private String logId;
    private long userId;
    private long fishId;
    private double size;
    private double latitude;
    private double longitude;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd kk:mm:ss",timezone = "Asia/Seoul")
    private LocalDateTime logTime;
}
