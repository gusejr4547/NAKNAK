package com.net.fisher.response;

import com.net.fisher.challenge.dto.ChallengeDto;
import com.net.fisher.challenge.entity.Challenge;
import com.net.fisher.fish.entity.Fish;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ChallengeCheckResponse {
    private List<ChallengeDto.Yet> all;
    private List<Long> chk;
}
