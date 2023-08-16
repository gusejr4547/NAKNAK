package com.net.fisher.fish.dto;

import com.net.fisher.fish.entity.Fish;
import lombok.*;

public class FishBowlsDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Post{
        private long targetId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SingleResponse{
        private long fishBowlId;
        //private long memberId;
        private Fish fish;
        private double size;
    }
<<<<<<< HEAD
=======

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MultiResponse{
        private long fishBowlId;
        private String fishCode;
        private String fishName;
        private double fishSize;
    }
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
}
