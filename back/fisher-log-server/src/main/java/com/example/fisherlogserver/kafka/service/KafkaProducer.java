package com.example.fisherlogserver.kafka.service;

import com.example.fisherlogserver.kafka.dto.LogDto;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
@RequiredArgsConstructor
public class KafkaProducer {
    @Value(value = "${message.topic.name}")
    private String topicName;

    @Value(value = "${message.topic.name2}")
    private String topicName2;

    private final KafkaTemplate<String, Object> kafkaTemplate;


    public void sendLogDto(Object message){
        //System.out.println("Produce content : "+message.getContent());
        kafkaTemplate.send(topicName,message);
    }

    public void sendLogDto2(Object message){
        //System.out.println("Produce content : "+message.getContent());
        kafkaTemplate.send(topicName2,message);
    }

}
