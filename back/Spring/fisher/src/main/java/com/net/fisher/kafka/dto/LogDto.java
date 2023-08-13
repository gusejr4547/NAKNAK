package com.net.fisher.kafka.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LogDto {
    private String sender;
    private String content;
}
