package com.example.fisherlogserver.kafka.service;

import com.example.fisherlogserver.kafka.dto.LogDto;
import com.example.fisherlogserver.kafka.dto.LogDto2;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class KafkaConsumer {

    @KafkaListener(topics = "${message.topic.name}", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "logDtoListener")
    @Async
    public void consume(LogDto message) throws IOException{
        System.out.println("Consumed msg : "+message.toString());
    }

    @KafkaListener(topics = "${message.topic.name2}", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "logDto2Listener")
    public void consume2(LogDto2 message) throws IOException{
        System.out.println("Consumed msg : "+message.toString());
    }

}
