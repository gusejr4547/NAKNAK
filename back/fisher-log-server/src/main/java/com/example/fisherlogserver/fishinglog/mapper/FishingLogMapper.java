package com.example.fisherlogserver.fishinglog.mapper;

import com.example.fisherlogserver.fishinglog.entity.FishingLog;
import com.example.fisherlogserver.kafka.dto.LogDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FishingLogMapper {
    FishingLog toFishingLog(LogDto logDto);
}
