package com.net.fisher.fishinghole.dto;


import lombok.*;

public class FavoritePointDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Register{
        private long fishingHoleId;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private long favoritePointId;
        private long memberId;
        private long fishingHoleId;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Cancel{
        private long fishingHoleId;
    }
}
