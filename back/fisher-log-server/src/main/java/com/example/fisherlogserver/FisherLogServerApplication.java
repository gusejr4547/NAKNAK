package com.example.fisherlogserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class FisherLogServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(FisherLogServerApplication.class, args);
    }

}
