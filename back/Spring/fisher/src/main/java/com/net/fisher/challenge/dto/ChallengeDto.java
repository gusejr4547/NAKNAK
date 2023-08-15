package com.net.fisher.challenge.dto;

import lombok.*;

public class ChallengeDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private long challengeId;
        private String numbering;
        private String title;
        private String task;
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Yet{
        private long challengeId;
        private String content;
    }

}
