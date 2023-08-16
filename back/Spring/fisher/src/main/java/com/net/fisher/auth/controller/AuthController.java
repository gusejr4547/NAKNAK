package com.net.fisher.auth.controller;

import com.net.fisher.auth.dto.Oauth2LoginDto;
import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.member.mapper.MemberMapper;
import com.net.fisher.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final MemberMapper memberMapper;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    @GetMapping("/api/login/success/oauth")
    public ResponseEntity<Oauth2LoginDto> oauth2Redirection(HttpServletResponse response){
        String token =  response.getHeader("Authorization");
        long tokenId = jwtTokenizer.getMemberId(token);

        Oauth2LoginDto oauth2LoginDto = memberMapper.toOauth2LoginDto(memberService.findMember(tokenId));
        return new ResponseEntity<>(oauth2LoginDto, HttpStatus.OK);
    }
}
