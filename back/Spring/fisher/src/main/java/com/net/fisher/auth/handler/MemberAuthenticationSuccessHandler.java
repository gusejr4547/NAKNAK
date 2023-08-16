package com.net.fisher.auth.handler;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.net.fisher.auth.dto.LoginResponseDto;
import com.net.fisher.config.LocalDateTimeSerializer;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.entity.MemberImage;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("# Authenticated successfully!");

        sendSuccessResponse(response,authentication);
    }

    private void sendSuccessResponse(HttpServletResponse response,
                                     Authentication authentication) throws IOException {

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(LocalDateTime.class, new LocalDateTimeSerializer());
        Gson gson = gsonBuilder.setPrettyPrinting().create();
        //Gson gson = new Gson();
        Member member = (Member) authentication.getPrincipal();
<<<<<<< HEAD
        System.out.println(member);
=======
        //System.out.println(member);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        String profileImgUrl = null;
        MemberImage memberImage = member.getMemberImage();
        if (memberImage != null) {
            profileImgUrl = memberImage.getFileUrl();
        }

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .name(member.getName())
                .nickname(member.getNickname())
                .profileImgUrl(profileImgUrl)
                .registeredAt(member.getRegisteredAt())
                .build();
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(gson.toJson(loginResponseDto, LoginResponseDto.class));
    }
}
