package com.example.fisherlogserver.fishinglog.service;

import com.example.fisherlogserver.fishinglog.entity.FishingLog;
import com.example.fisherlogserver.fishinglog.mapper.FishingLogMapper;
import com.example.fisherlogserver.fishinglog.repository.FishingLogRepository;
import com.example.fisherlogserver.kafka.dto.LogDto;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FishingLogService {
    private final FishingLogRepository fishingLogRepository;
    private final FishingLogMapper fishingLogMapper;

    @Async
    public void createFishingLog(LogDto logDto){
        /*FishingLog fishingLog = */
        fishingLogRepository.save(fishingLogMapper.toFishingLog(logDto));
    }
}
