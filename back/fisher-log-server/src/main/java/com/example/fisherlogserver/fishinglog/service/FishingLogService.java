package com.example.fisherlogserver.fishinglog.service;

import com.example.fisherlogserver.challenge.entity.ChallengeCheck;
import com.example.fisherlogserver.challenge.repository.ChallengeCheckRepository;
import com.example.fisherlogserver.fishinglog.entity.FishingLog;
import com.example.fisherlogserver.fishinglog.mapper.FishingLogMapper;
import com.example.fisherlogserver.fishinglog.repository.FishingLogRepository;
import com.example.fisherlogserver.kafka.dto.LogDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class FishingLogService {
    private final FishingLogRepository fishingLogRepository;
    private final FishingLogMapper fishingLogMapper;
    private final ChallengeCheckRepository challengeCheckRepository;

    @Async
    public void createFishingLog(LogDto logDto){
        /*FishingLog fishingLog = */
        FishingLog  fishingLog =  fishingLogRepository.save(fishingLogMapper.toFishingLog(logDto));
        long memberId = logDto.getUserId();
        long fishingCount = fishingLogRepository.countByUserId(memberId);
        if(fishingCount == 50) {
            findByChallengeIdAndMemberId(25, memberId);
        }
        if(fishingCount == 100){
            findByChallengeIdAndMemberId(26,memberId);
        }
        if(fishingCount == 333){
            findByChallengeIdAndMemberId(27,memberId);
        }
    }

    public void findByChallengeIdAndMemberId(long challengeId, long memberId){
        Optional<ChallengeCheck> challengeCheck =
                challengeCheckRepository.findChallengeCheckByMemberIdAndChallengeId(challengeId,memberId);
        if(challengeCheck.isEmpty()) challengeCheckRepository.insertChallengeCheck(memberId,challengeId);
    }
}
