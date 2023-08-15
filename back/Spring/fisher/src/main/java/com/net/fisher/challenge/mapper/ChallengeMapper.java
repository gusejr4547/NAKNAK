package com.net.fisher.challenge.mapper;

import com.net.fisher.challenge.dto.ChallengeCheckDto;
import com.net.fisher.challenge.dto.ChallengeDto;
import com.net.fisher.challenge.entity.Challenge;
import com.net.fisher.challenge.entity.ChallengeCheck;
import com.net.fisher.response.ChallengeCheckResponse;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ChallengeMapper {

    List<ChallengeDto.Response> toResponseDtos(List<Challenge> challenges);

    ChallengeDto.Response toResponseDto(Challenge challenge);

    List<ChallengeDto.Yet> toYetDataResponseDtos(List<Challenge> challenges);

    default List<ChallengeCheckDto.Response> toChallengeCheckResponseDtos(List<ChallengeCheck> challengeChecks){
        List<ChallengeCheckDto.Response> responses = new ArrayList<>();
        for(ChallengeCheck challengeCheck:challengeChecks){
            responses.add(
                    ChallengeCheckDto.Response.builder()
                            .challengeCheckId(challengeCheck.getChallengeCheckId())
                            .challengeDto(toResponseDto(challengeCheck.getChallenge()))
                            .build()
            );
        }
        return responses;
    }
}

