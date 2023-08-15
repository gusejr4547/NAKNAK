package com.example.fisherlogserver.fishinglog.repository;

import com.example.fisherlogserver.fishinglog.entity.FishingLog;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FishingLogRepository extends MongoRepository<FishingLog,String> {
    long countByUserId(long userId);

    long countByUserIdAndFishId(long userId, long fishId);
}
