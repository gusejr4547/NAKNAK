package com.example.fisherlogserver.fishinglog.repository;

import com.example.fisherlogserver.fishinglog.entity.FishingLog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FishingLogRepository extends MongoRepository<FishingLog,String> {
}
