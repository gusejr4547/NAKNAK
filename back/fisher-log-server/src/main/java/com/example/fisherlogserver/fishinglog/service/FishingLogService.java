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
    public void createFishingLog(LogDto logDto) {
        /*FishingLog fishingLog = */
        logDto.setLogTime(logDto.getLogTime().plusHours(9));

        FishingLog fishingLog = fishingLogRepository.save(fishingLogMapper.toFishingLog(logDto));

        System.out.println(fishingLog.toString());

        long memberId = logDto.getUserId();
        long fishingCount = fishingLogRepository.countByUserId(memberId);
        if (fishingCount == 50) {
            findByChallengeIdAndMemberId(25, memberId);
        }
        if (fishingCount == 100) {
            findByChallengeIdAndMemberId(26, memberId);
        }
        if (fishingCount == 333) {
            findByChallengeIdAndMemberId(27, memberId);
        }

        long fishId = logDto.getFishId();
        long eachFishingCount = fishingLogRepository.countByUserIdAndFishId(memberId, fishId);
        if (eachFishingCount == 10) {
            if (fishId == 1) {
                findByChallengeIdAndMemberId(17, memberId);
            } else if (fishId == 2) {
                findByChallengeIdAndMemberId(15, memberId);
            } else if (fishId == 3) {
                findByChallengeIdAndMemberId(16, memberId);
            } else if (fishId == 4) {
                findByChallengeIdAndMemberId(18, memberId);
            } else if (fishId == 5) {
                findByChallengeIdAndMemberId(14, memberId);
            } else if (fishId == 6) {
                findByChallengeIdAndMemberId(20, memberId);
            } else if (fishId == 7) {
                findByChallengeIdAndMemberId(13, memberId);
            } else if (fishId == 8) {
                findByChallengeIdAndMemberId(12, memberId);
            } else if (fishId == 9) {
                findByChallengeIdAndMemberId(10, memberId);
            } else if (fishId == 10) {
                findByChallengeIdAndMemberId(11, memberId);
            } else if (fishId == 11) {
                findByChallengeIdAndMemberId(22, memberId);
            } else if (fishId == 12) {
                findByChallengeIdAndMemberId(21, memberId);
            } else if (fishId == 13) {
                findByChallengeIdAndMemberId(19, memberId);
            } else if (fishId == 14) {
                findByChallengeIdAndMemberId(23, memberId);
            }
        }


    }

    public void findByChallengeIdAndMemberId(long challengeId, long memberId) {
        Optional<ChallengeCheck> challengeCheck =
                challengeCheckRepository.findChallengeCheckByMemberIdAndChallengeId(challengeId, memberId);
        if (challengeCheck.isEmpty()) challengeCheckRepository.insertChallengeCheck(memberId, challengeId);
    }
}
