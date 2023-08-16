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
<<<<<<< HEAD
        private int isNewBee;
=======
        private int isNewBie;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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

<<<<<<< HEAD
=======
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SetProgress{
        private int tutorialProgress;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SetNewbie{
        private int isNewbie;
    }

>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
}
