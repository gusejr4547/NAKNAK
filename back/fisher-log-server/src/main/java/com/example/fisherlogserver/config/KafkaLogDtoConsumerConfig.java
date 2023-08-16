package com.example.fisherlogserver.config;

import com.example.fisherlogserver.kafka.dto.LogDto;
import com.example.fisherlogserver.kafka.dto.LogDto2;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaLogDtoConsumerConfig {
    @Value(value = "${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Bean
    public ConsumerFactory<String, LogDto> logDtoConsumer() {

        Map<String, Object> configs = new HashMap<>();
        configs.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        configs.put(ConsumerConfig.GROUP_ID_CONFIG, "loggroup");

        return new DefaultKafkaConsumerFactory<>(
                configs,
                new StringDeserializer(),
                new JsonDeserializer<>(LogDto.class,false));
    }

    @Bean
    public ConsumerFactory<String, LogDto2> logDto2Consumer() {

        Map<String, Object> configs = new HashMap<>();
        configs.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        configs.put(ConsumerConfig.GROUP_ID_CONFIG, "loggroup2");

        return new DefaultKafkaConsumerFactory<>(
                configs,
                new StringDeserializer(),
                new JsonDeserializer<>(LogDto2.class));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, LogDto> logDtoListener() {
        ConcurrentKafkaListenerContainerFactory<String, LogDto> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(logDtoConsumer());
        return factory;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, LogDto2> logDto2Listener() {
        ConcurrentKafkaListenerContainerFactory<String, LogDto2> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(logDto2Consumer());
        return factory;
    }
}