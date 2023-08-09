package com.net.fisher.fishinghole.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.net.fisher.conv.RequestMessage;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.io.IOException;

@Service
//@RequiredArgsConstructor
public class FishingHoleService {
    @PostConstruct
    public void initialize(){
        try {
            String url = "https://lab.ssafy.com/api/v4/projects/366438/repository/files/data%2Ffishingspot.json/raw?ref=develop";

            DefaultUriBuilderFactory defaultUriBuilderFactory = new DefaultUriBuilderFactory();
            defaultUriBuilderFactory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);

            RestTemplate restTemplate = new RestTemplate();
            restTemplate.setUriTemplateHandler(defaultUriBuilderFactory);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("PRIVATE-TOKEN", "RSkP53vhJfxvANry-U_J");

            HttpEntity<String> requestEntity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                String jsonContent = response.getBody();

                ObjectMapper objectMapper = new ObjectMapper();

                try {
                    JsonNode jsonNode = objectMapper.readTree(jsonContent);
                    if (jsonNode.isArray()) {
                        for (JsonNode spotNode : jsonNode) {
                            long pk = spotNode.get("pk").asLong();
                            String title = spotNode.get("title").asText();
                            System.out.println(pk + " : " + title);
                        }
                    }

                } catch (IOException e) {
                    e.printStackTrace();
                }

                System.out.println(jsonContent);

            } else {
                System.err.println("API call failed with status code: " + response.getStatusCode());
            }
        }
        catch (RestClientException e){
            e.printStackTrace();
        }
    }

}
