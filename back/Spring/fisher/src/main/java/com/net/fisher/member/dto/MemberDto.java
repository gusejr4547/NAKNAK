package com.net.fisher.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.net.fisher.member.entity.MemberImage;
import lombok.*;

import java.time.LocalDateTime;

public class MemberDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Post{
        private String email;
        private String password;
        private String nickname;
        private String name;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Response{
        private long memberId;
        private String email;
        private String name;
        private String nickname;
        @JsonFormat(pattern = "yyyy-MM-dd kk:mm:ss")
        private LocalDateTime registeredAt;
        private String address1;
        private String address2;
        private String memberImgUrl;
        private MemberImage memberImage;// 순환참조됨, Mapper 구현
    }
}
