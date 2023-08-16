package com.net.fisher.response;

import com.net.fisher.challenge.dto.ChallengeCheckDto;
import com.net.fisher.challenge.dto.ChallengeDto;
import com.net.fisher.fish.dto.BooksDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ChallengeResponse {
    private List<ChallengeCheckDto.Response> list;
    private ChallengeCheckResponse checkResponse;
}
