package com.example.fisherlogserver.fishinglog.controller;

import com.example.fisherlogserver.fishinglog.entity.FishingLog;
import com.example.fisherlogserver.fishinglog.service.FishingLogService;
import com.example.fisherlogserver.kafka.dto.LogDto;
import com.example.fisherlogserver.kafka.service.KafkaProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kafka")
@RequiredArgsConstructor
public class FishingLogController {

    private final FishingLogService fishingLogService;
    private final KafkaProducer kafkaProducer;


    @PostMapping("/send/log")
    public ResponseEntity<String> sendLog(@RequestBody LogDto logDto){

        kafkaProducer.sendLogDto(logDto);

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }


    /*@GetMapping("/")*/
}
