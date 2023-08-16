package com.net.fisher.fish.dto;

import com.net.fisher.fish.entity.Fish;
import jakarta.persistence.Column;
import lombok.*;

public class InventoryDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Post{
<<<<<<< HEAD
        private String fishCode;
=======
        private String name;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MultiResponse{
        private long inventoryId;
        private String fishCode;
        private String fishName;
        private double fishSize;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @Builder
    @AllArgsConstructor
    public static class Delete{
        private long inventoryId;
    }

    public interface Info {
        long getCount();
        double getMaxSize();
    }
}
