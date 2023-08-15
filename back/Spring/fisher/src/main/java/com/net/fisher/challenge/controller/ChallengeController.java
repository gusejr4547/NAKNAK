package com.net.fisher.challenge.controller;

import com.net.fisher.challenge.dto.ChallengeCheckDto;
import com.net.fisher.challenge.dto.ChallengeDto;
import com.net.fisher.challenge.entity.Challenge;
import com.net.fisher.challenge.mapper.ChallengeMapper;
import com.net.fisher.challenge.service.ChallengeService;
import com.net.fisher.fish.dto.BooksDto;
import com.net.fisher.response.BooksResponse;
import com.net.fisher.response.ChallengeCheckResponse;
import com.net.fisher.response.ChallengeResponse;
import com.net.fisher.response.FishCheckResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ChallengeController {

    private final ChallengeMapper challengeMapper;
    private final ChallengeService challengeService;

    @GetMapping("/challenge/{member-id}")
    public ResponseEntity<ChallengeResponse> getChallengeOfMember(@PathVariable(value = "member-id") long memberId) {
        List<ChallengeCheckDto.Response> challengeDtos = challengeMapper.toChallengeCheckResponseDtos(challengeService.readChallengesOfMember(memberId));

        List<ChallengeDto.Yet> yetList = challengeMapper.toYetDataResponseDtos(challengeService.readChallengeAllNotYet());

        ChallengeCheckResponse challengeCheckResponse =
                new ChallengeCheckResponse(yetList,
                        challengeDtos.stream()
                                .map(ChallengeCheckDto.Response::getChallengeDto)
                                .map(ChallengeDto.Response::getChallengeId)
                                .collect(Collectors.toList())
                );

        ChallengeResponse challengeResponse = new ChallengeResponse(challengeDtos, challengeCheckResponse);

        return new ResponseEntity<>(challengeResponse, HttpStatus.OK);
    }




    /*@GetMapping("/books/{member-id}")
    public ResponseEntity<BooksResponse> getBooksOfMember(@PathVariable(value = "member-id") long memberId){

        List<BooksDto.Response> booksResponseDtos = fishMapper.toBooksResponseDtos(fishService.readBooksOfMember(memberId));

        BooksResponse responses = new BooksResponse(booksResponseDtos,fishService.checkCaughtFish(memberId));

        // DB에 딕셔너리가 id 순으로 차곡차곡 쌓여있을텐데 과연 이렇게 처리해야할까?
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }*/
}
