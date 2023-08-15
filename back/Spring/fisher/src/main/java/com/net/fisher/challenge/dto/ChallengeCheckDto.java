package com.net.fisher.challenge.dto;

import com.net.fisher.challenge.entity.Challenge;
import com.net.fisher.member.entity.Member;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

public class ChallengeCheckDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private long challengeCheckId;
        private ChallengeDto.Response challengeDto;
    }
}
