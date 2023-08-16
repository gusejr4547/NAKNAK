package com.example.fisherlogserver.fishinglog.entity;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "fishingLog")
public class FishingLog {
    @Id
    private String logId;
    private long userId;
    private long fishId;
    private double size;
    private double latitude;
    private double longitude;
    private LocalDateTime logTime;
}
