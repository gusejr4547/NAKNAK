package com.example.fisherlogserver.kafka.service;

import com.example.fisherlogserver.fishinglog.service.FishingLogService;
import com.example.fisherlogserver.kafka.dto.LogDto;
import com.example.fisherlogserver.kafka.dto.LogDto2;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class KafkaConsumer {
    private final FishingLogService fishingLogService;

    @KafkaListener(topics = "${message.topic.name}", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "logDtoListener")
    @Async
    public void consume(LogDto logDto) throws IOException{
        //System.out.println("Consumed msg : "+message.toString());
        fishingLogService.createFishingLog(logDto);
    }

    @KafkaListener(topics = "${message.topic.name2}", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "logDto2Listener")
    public void consume2(LogDto2 message) throws IOException{
        System.out.println("Consumed msg : "+message.toString());
    }

}
