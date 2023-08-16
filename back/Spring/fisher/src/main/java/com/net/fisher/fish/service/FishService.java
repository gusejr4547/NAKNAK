package com.net.fisher.fish.service;

<<<<<<< HEAD
import com.google.gson.Gson;
=======
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.net.fisher.challenge.entity.Challenge;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD
=======
import com.net.fisher.kafka.dto.LogDto;
import com.net.fisher.kafka.service.KafkaProducer;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD
=======
import org.springframework.kafka.core.KafkaTemplate;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
<<<<<<< HEAD
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

=======
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.io.IOException;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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
<<<<<<< HEAD


    @PostConstruct
    public void initialFish(){
        if(fishRepository.findById(1L).isEmpty()) {
            List<Fish> fishList = new ArrayList<>();
            fishList.add(Fish.builder()
                    .name("전갱이")
                    .imgUrl("/img/fishes/A001.png")
                    .info("육질이 단단한 맛난 생선")
                    .code("A001")
                    .build());
            fishList.add(Fish.builder()
                    .name("광어")
                    .imgUrl("/img/fishes/A002.png")
                    .info("횟감으로 좋은 흰살 생선")
                    .code("A002")
                    .build());
            fishList.add(Fish.builder()
                    .name("돌돔")
                    .imgUrl("/img/fishes/A003.png")
                    .info("고오급 횟감")
                    .code("A003")
                    .build());
            fishList.add(Fish.builder()
                    .name("학꽁치")
                    .imgUrl("/img/fishes/A004.png")
                    .info("겨울철 횟감")
                    .code("A004")
                    .build());
            fishRepository.saveAll(fishList);
        }
    }

    public FishRecogDto recognizeFish(String token, MultipartFile image){
        /*
=======
    private final KafkaProducer kafkaProducer;


    @PostConstruct
    @Transactional
    public void initFishList() {
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

                //System.out.println(jsonContent);

            } else {
                System.err.println("API call failed with status code: " + response.getStatusCode());
            }
        } catch (RestClientException e) {
            e.printStackTrace();
        }
    }

    /*public FishRecogDto recognizeFish(String token, MultipartFile image) {
        *//*
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

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
<<<<<<< HEAD
        */
=======
        *//*
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.set(HttpHeaders.AUTHORIZATION, token);

        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
<<<<<<< HEAD
        requestBody.add("file",image.getResource());
=======
        requestBody.add("file", image.getResource());
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange("http://localhost:8000/api/v1/fishes/", HttpMethod.POST, requestEntity, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            // Process the responseData
            String responseData = response.getBody();
            Gson gson = new Gson();
            FishRecogDto myData = gson.fromJson(responseData, FishRecogDto.class);
<<<<<<< HEAD
            System.out.println(myData.getCode()+" "+myData.getSize());
            return myData;
        }else{
=======
            System.out.println(myData.getCode() + " " + myData.getSize());
            return myData;
        } else {
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
            System.out.println("안됨");
        }

        return null;

<<<<<<< HEAD
    }

    public Inventory catchFish(long tokenId, String fishCode, Inventory inventory) {
        Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Fish fish = fishRepository.findByCode(fishCode).orElseThrow(() -> new BusinessLogicException(ExceptionCode.FISH_NOT_FOUND));
=======
    }*/

    public Inventory catchFish(long tokenId, String name, Inventory inventory) {
        Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Fish fish = fishRepository.findByName(name).orElseThrow(() -> new BusinessLogicException(ExceptionCode.FISH_NOT_FOUND));
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

        inventory.setFish(fish);
        inventory.setMember(member);

        inventory = inventoryRepository.save(inventory);

        /*====도감에 등록하는 알고리즘====*/

<<<<<<< HEAD
        booksUpdate(fish,member,inventory);
=======
        booksUpdate(fish, member, inventory);
        sendFishingLog(fish, member, inventory);
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

        return inventory;
    }


    @Transactional
<<<<<<< HEAD
    public void deleteInventoryItem(long tokenId, long inventoryId){
        Member member = memberService.findMember(tokenId);

        Inventory inventory = inventoryRepository.findById(inventoryId).orElseThrow(()->new BusinessLogicException(ExceptionCode.INVENTORY_NOT_FOUND));

        if(inventory.getMember().getMemberId() == tokenId){
            inventoryRepository.deleteById(inventoryId);
        }else{
=======
    public void deleteInventoryItem(long tokenId, long inventoryId) {
        Member member = memberService.findMember(tokenId);

        Inventory inventory = inventoryRepository.findById(inventoryId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.INVENTORY_NOT_FOUND));

        if (inventory.getMember().getMemberId() == tokenId) {
            inventoryRepository.deleteById(inventoryId);
        } else {
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
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

<<<<<<< HEAD
    public FishCheckResponse checkCaughtFish(long memberId){
        return new FishCheckResponse(fishRepository.findAll(),fishRepository.booksCheck(memberId).stream().map(Fish::getFishId).collect(Collectors.toList()));
    }

    public List<Books> readBooksOfMember(long memberId){
=======
    public FishCheckResponse checkCaughtFish(long memberId) {
        return new FishCheckResponse(fishRepository.findAll(), fishRepository.booksCheck(memberId).stream().map(Fish::getFishId).collect(Collectors.toList()));
    }

    public List<Books> readBooksOfMember(long memberId) {
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        /*List<Fish> fishes = fishRepository.booksCheck(memberId);
        for(Fish fish:fishes){
            System.out.println(fish.getFishId());
        }*/
        return booksRepository.findBooksByMemberId(memberId);
    }

    @Async
<<<<<<< HEAD
    @Transactional
    public void booksUpdate(Fish fish, Member member, Inventory inventory){
        Books findBooks = booksRepository.findByFishAndMember(fish,member);
        if(findBooks == null){
=======
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
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
            findBooks = Books.builder()
                    .fish(fish)
                    .member(member)
                    .getDate(LocalDateTime.now())
                    .maxSize(inventory.getSize())
                    .number(1)
                    .build();
<<<<<<< HEAD
        }
        else{
=======
        } else {
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
            findBooks.updateDate();
            findBooks.updateMaxSize(inventory.getSize());
            findBooks.updateNumber();
        }

        booksRepository.save(findBooks);
    }

<<<<<<< HEAD
    public Page<Inventory> getInventoryListFromMemberId(long memberId, Pageable pageable){
        Member findMember = memberService.findMember(memberId);

        return inventoryRepository.getInventoriesByMember(findMember,pageable);
    }

    public InventoryDto.Info getInventoryInfoFromMemberId(long memberId){
=======
    public List<FishBowls> getFishBowlsListFromMemberId(long memberId) {
        Member findMember = memberService.findMember(memberId);

        return fishBowlsRepository.findByMember(findMember);
    }

    public Page<Inventory> getInventoryListFromMemberId(long memberId, Pageable pageable) {
        Member findMember = memberService.findMember(memberId);

        return inventoryRepository.getInventoriesByMember(findMember, pageable);
    }

    public InventoryDto.Info getInventoryInfoFromMemberId(long memberId) {
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
        return inventoryRepository.getInventoryInfo(memberId);
    }

    private HttpHeaders getFileHeaders(String fileName) {
        HttpHeaders fileHeaders = new HttpHeaders();
        fileHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        fileHeaders.setContentDisposition(ContentDisposition.builder("attachment").filename(fileName).build());
        return fileHeaders;
    }
}