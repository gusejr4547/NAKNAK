package com.net.fisher.member.dto;

import lombok.*;

public class FollowDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private long fromId;
        private long toId;
    }
}
