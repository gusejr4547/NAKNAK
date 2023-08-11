package com.net.fisher.fishinghole.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.*;



public class FishingHoleDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private long fishingHoleId;
        private String title;
        private double latitude;
        private double longitude;
    }




}
