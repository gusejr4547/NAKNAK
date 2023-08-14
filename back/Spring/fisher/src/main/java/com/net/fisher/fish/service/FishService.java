package com.net.fisher.fish.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.net.fisher.challenge.entity.Challenge;
import com.net.fisher.conv.Attachment;
import com.net.fisher.conv.RequestMessage;
import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.fish.dto.FishRecogDto;
import com.net.fisher.fish.dto.InventoryDto;
import com.net.fisher.fish.entity.Books;
import com.net.fisher.fish.entity.Fish;
import com.net.fisher.fish.entity.FishBowls;
import com.net.fisher.fish.entity.Inventory;
import com.net.fisher.fish.repository.BooksRepository;
import com.net.fisher.fish.repository.FishBowlsRepository;
import com.net.fisher.fish.repository.FishRepository;
import com.net.fisher.fish.repository.InventoryRepository;
import com.net.fisher.kafka.dto.LogDto;
import com.net.fisher.kafka.service.KafkaProducer;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.repository.MemberRepository;
import com.net.fisher.member.service.MemberService;
import com.net.fisher.response.FishCheckResponse;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FishService {
    private final InventoryRepository inventoryRepository;
    private final MemberRepository memberRepository;
    private final FishRepository fishRepository;
    private final FishBowlsRepository fishBowlsRepository;
    private final BooksRepository booksRepository;
    private final MemberService memberService;
    private final KafkaProducer kafkaProducer;


    @PostConstruct
    @Transactional
    public void initChallengeList() {
        try {
            String url = "https://lab.ssafy.com/api/v4/projects/366438/repository/files/data%2Ffish.json/raw?ref=develop";

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
                        long currentSize = fishRepository.countBy();
                        if (jsonNode.size() > currentSize) {
                            System.out.println("====json data 물고기 업데이트==== FROM :" + currentSize);
                            //fishingHoleRepository.deleteAll();

                            List<Fish> fishList = new ArrayList<>();
                            for (JsonNode spotNode : jsonNode) {
                                long pk = spotNode.get("pk").asLong();
                                String name = spotNode.get("name").asText();
                                StringBuilder sb = new StringBuilder();
                                sb.append("A-");
                                if (pk < 100L) sb.append("0");
                                if (pk < 10L) sb.append("0");
                                sb.append(pk);
                                String code = sb.toString();
                                String info = spotNode.get("fields").get("사전").get("설명").asText();
                                String imgUrl = "/img/" + name + ".png";

                                if (fishRepository.findById(pk).isEmpty()) {
                                    Fish fish = Fish.builder()
                                            .fishId(pk)
                                            .code(code)
                                            .name(name)
                                            .info(info)
                                            .imgUrl(imgUrl)
                                            .build();
                                    fishList.add(fish);
                                }
                            }
                            fishRepository.saveAll(fishList);
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

    /*public FishRecogDto recognizeFish(String token, MultipartFile image) {
        *//*

        // Create headers and set the token
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);

        // Create the request body as a MultiValueMap
        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("file", new HttpEntity<>(file.getResource(), getFileHeaders(file.getOriginalFilename())));

        // Set additional form data if needed
        requestBody.add("otherParam", "value");

        // Create the request entity with headers and body
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Perform the POST request
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);

        // Process the response
        if (response.getStatusCode().is2xxSuccessful()) {
            String responseData = response.getBody();
            // Process the responseData
        } else {
            // Handle error response
        }
        *//*
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.set(HttpHeaders.AUTHORIZATION, token);

        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("file", image.getResource());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange("http://localhost:8000/api/v1/fishes/", HttpMethod.POST, requestEntity, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            // Process the responseData
            String responseData = response.getBody();
            Gson gson = new Gson();
            FishRecogDto myData = gson.fromJson(responseData, FishRecogDto.class);
            System.out.println(myData.getCode() + " " + myData.getSize());
            return myData;
        } else {
            System.out.println("안됨");
        }

        return null;

    }*/

    public Inventory catchFish(long tokenId, String name, Inventory inventory) {
        Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Fish fish = fishRepository.findByName(name).orElseThrow(() -> new BusinessLogicException(ExceptionCode.FISH_NOT_FOUND));

        inventory.setFish(fish);
        inventory.setMember(member);

        inventory = inventoryRepository.save(inventory);

        /*====도감에 등록하는 알고리즘====*/

        booksUpdate(fish, member, inventory);
        sendFishingLog(fish, member, inventory);

        return inventory;
    }


    @Transactional
    public void deleteInventoryItem(long tokenId, long inventoryId) {
        Member member = memberService.findMember(tokenId);

        Inventory inventory = inventoryRepository.findById(inventoryId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.INVENTORY_NOT_FOUND));

        if (inventory.getMember().getMemberId() == tokenId) {
            inventoryRepository.deleteById(inventoryId);
        } else {
            throw new BusinessLogicException(ExceptionCode.NOT_OWNER_OF);
        }
    }

    @Transactional
    public FishBowls intoFishBowls(long tokenId, long inventoryId) {
        Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Inventory inventory = inventoryRepository.findById(inventoryId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.INVENTORY_NOT_FOUND));


        FishBowls fishBowls = FishBowls.builder()
                .fish(inventory.getFish())
                .size(inventory.getSize())
                .member(member)
                .build();

        inventoryRepository.deleteById(inventoryId);

        return fishBowlsRepository.save(fishBowls);
    }

    @Transactional
    public Inventory intoInventory(long tokenId, long fishBowlId) {
        Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        FishBowls fishBowls = fishBowlsRepository.findById(fishBowlId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.FISHBOWLS_NOT_FOUND));

        Inventory inventory = Inventory.builder()
                .fish(fishBowls.getFish())
                .size(fishBowls.getSize())
                .member(fishBowls.getMember())
                .build();

        fishBowlsRepository.deleteById(fishBowlId);

        return inventoryRepository.save(inventory);

    }

    public FishCheckResponse checkCaughtFish(long memberId) {
        return new FishCheckResponse(fishRepository.findAll(), fishRepository.booksCheck(memberId).stream().map(Fish::getFishId).collect(Collectors.toList()));
    }

    public List<Books> readBooksOfMember(long memberId) {
        /*List<Fish> fishes = fishRepository.booksCheck(memberId);
        for(Fish fish:fishes){
            System.out.println(fish.getFishId());
        }*/
        return booksRepository.findBooksByMemberId(memberId);
    }

    @Async
    public void sendFishingLog(Fish fish, Member member, Inventory inventory) {
        StringBuilder sb = new StringBuilder();
        sb.append("Fish : ").append(fish).append("\nMember : ").append(member.toString()).append("\nInven : ").append(inventory.toString());
        String message = sb.toString();

        LogDto logDto = LogDto.builder()
                .userId(member.getMemberId())
                .fishId(fish.getFishId())
                .latitude(27.22)
                .longitude(128.02)
                .size(inventory.getSize())
                .logTime(LocalDateTime.now())
                .build();

        kafkaProducer.sendLogDto(logDto);

    }

    @Async
    @Transactional
    public void booksUpdate(Fish fish, Member member, Inventory inventory) {
        Books findBooks = booksRepository.findByFishAndMember(fish, member);
        if (findBooks == null) {
            findBooks = Books.builder()
                    .fish(fish)
                    .member(member)
                    .getDate(LocalDateTime.now())
                    .maxSize(inventory.getSize())
                    .number(1)
                    .build();
        } else {
            findBooks.updateDate();
            findBooks.updateMaxSize(inventory.getSize());
            findBooks.updateNumber();
        }

        booksRepository.save(findBooks);
    }

    public List<FishBowls> getFishBowlsListFromMemberId(long memberId) {
        Member findMember = memberService.findMember(memberId);

        return fishBowlsRepository.findByMember(findMember);
    }

    public Page<Inventory> getInventoryListFromMemberId(long memberId, Pageable pageable) {
        Member findMember = memberService.findMember(memberId);

        return inventoryRepository.getInventoriesByMember(findMember, pageable);
    }

    public InventoryDto.Info getInventoryInfoFromMemberId(long memberId) {
        return inventoryRepository.getInventoryInfo(memberId);
    }

    private HttpHeaders getFileHeaders(String fileName) {
        HttpHeaders fileHeaders = new HttpHeaders();
        fileHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        fileHeaders.setContentDisposition(ContentDisposition.builder("attachment").filename(fileName).build());
        return fileHeaders;
    }
}