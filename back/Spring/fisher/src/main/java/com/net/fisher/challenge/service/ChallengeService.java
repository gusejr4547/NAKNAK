package com.net.fisher.challenge.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.net.fisher.challenge.entity.Challenge;
import com.net.fisher.challenge.repository.ChallengeRepository;
import com.net.fisher.fishinghole.entity.FishingHole;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;

    @PostConstruct
    @Transactional
    public void initChallengeList() {
        try {
            String url = "https://lab.ssafy.com/api/v4/projects/366438/repository/files/data%2Fchallenge.json/raw?ref=develop";

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
                        long currentSize = challengeRepository.countBy();
                        if (jsonNode.size() > currentSize) {
                            System.out.println("====json data 도전과제 업데이트==== FROM :" + currentSize);
                            //fishingHoleRepository.deleteAll();

                            List<Challenge> challengeList = new ArrayList<>();
                            for (JsonNode spotNode : jsonNode) {
                                long pk = spotNode.get("pk").asLong();
                                String numbering = spotNode.get("numbering").asText();
                                String title = spotNode.get("title").asText();
                                String task = spotNode.get("task").asText();
                                String content = spotNode.get("content").asText();
                                //String obsCode = spotNode.get("fields").get("obsCode").asText();
                                if (challengeRepository.findById(pk).isEmpty()) {
                                    Challenge challenge = Challenge.builder()
                                            .challengeId(pk)
                                            .title(title)
                                            .content(content)
                                            .task(task)
                                            .numbering(numbering).build();
                                    challengeList.add(challenge);
                                }
                            }
                            challengeRepository.saveAll(challengeList);
                        }
                    }

                } catch (IOException e) {
                    e.printStackTrace();
                }

                System.out.println(jsonContent);

            } else {
                System.err.println("API call failed with status code: " + response.getStatusCode());
            }
        } catch (RestClientException e) {
            e.printStackTrace();
        }
    }

}
