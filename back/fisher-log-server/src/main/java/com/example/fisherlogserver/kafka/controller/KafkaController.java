package com.example.fisherlogserver.kafka.controller;

import com.example.fisherlogserver.kafka.dto.LogDto;
import com.example.fisherlogserver.kafka.dto.LogDto2;
import com.example.fisherlogserver.kafka.service.KafkaProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/kafka")
public class KafkaController {

    private final KafkaProducer kafkaProducer;

    @PostMapping(value = "/message")
    public String sendMessage(@RequestBody LogDto logDto){
        kafkaProducer.sendLogDto(logDto);
        return "success";
    }

    @PostMapping(value = "/message2")
    public String sendMessage2(@RequestBody LogDto2 logDto){
        kafkaProducer.sendLogDto2(logDto);
        return "success";
    }
}
