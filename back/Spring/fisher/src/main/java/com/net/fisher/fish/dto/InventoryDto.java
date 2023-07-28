package com.net.fisher.fish.dto;

import com.net.fisher.fish.entity.Fish;
import lombok.*;

public class InventoryDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Post{
        private String fishCode;
        private double size;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class SingleResponse {
        private long inventoryId;
        private Fish fish;
        private double size;
    }
}
