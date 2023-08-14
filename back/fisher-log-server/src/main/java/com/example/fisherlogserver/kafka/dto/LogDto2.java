package com.example.fisherlogserver.kafka.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LogDto2 {
    private String sender;
    private String content;
    private String content2;
}
