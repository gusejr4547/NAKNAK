package com.net.fisher.member.dto;


import com.net.fisher.member.entity.Member;
import jakarta.persistence.Column;
import lombok.*;

public class MemberStatusDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        //private Member member;
        private int point;
        private long exp;
        private int level;
        private boolean isNewBee;
        private int tutorialProgress;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpStatus{
        private int upPoint;
        private long upExp;
        private int tutorialProgress;
    }

}
