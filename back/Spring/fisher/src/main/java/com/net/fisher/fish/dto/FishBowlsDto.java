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
}
