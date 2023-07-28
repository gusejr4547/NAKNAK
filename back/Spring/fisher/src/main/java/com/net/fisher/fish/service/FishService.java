package com.net.fisher.fish.service;

import com.google.gson.Gson;
import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.fish.dto.FishRecogDto;
import com.net.fisher.fish.entity.Books;
import com.net.fisher.fish.entity.Fish;
import com.net.fisher.fish.entity.FishBowls;
import com.net.fisher.fish.entity.Inventory;
import com.net.fisher.fish.repository.BooksRepository;
import com.net.fisher.fish.repository.FishBowlsRepository;
import com.net.fisher.fish.repository.FishRepository;
import com.net.fisher.fish.repository.InventoryRepository;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.repository.MemberRepository;
import com.net.fisher.response.FishCheckResponse;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

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

    @PostConstruct
    public void initialFish(){
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

    public FishRecogDto recognizeFish(String token, MultipartFile image){
        /*

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
        */
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.set(HttpHeaders.AUTHORIZATION, token);

        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("file",image.getResource());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange("http://localhost:8000/api/v1/fishes/", HttpMethod.POST, requestEntity, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            // Process the responseData
            String responseData = response.getBody();
            Gson gson = new Gson();
            FishRecogDto myData = gson.fromJson(responseData, FishRecogDto.class);
            System.out.println(myData.getCode()+" "+myData.getSize());
            return myData;
        }else{
            System.out.println("안됨");
        }

        return null;

    }

    public Inventory catchFish(long tokenId, String fishCode, Inventory inventory) {
        Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Fish fish = fishRepository.findByCode(fishCode).orElseThrow(() -> new BusinessLogicException(ExceptionCode.FISH_NOT_FOUND));

        inventory.setFish(fish);
        inventory.setMember(member);

        inventoryRepository.save(inventory);

        /*====도감에 등록하는 알고리즘====*/

        booksUpdate(fish,member,inventory);

        return inventory;
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

    public FishCheckResponse checkCaughtFish(long memberId){
        return new FishCheckResponse(fishRepository.findAll(),fishRepository.booksCheck(memberId).stream().map(Fish::getFishId).collect(Collectors.toList()));
    }

    public List<Books> readBooksOfMember(long memberId){
        /*List<Fish> fishes = fishRepository.booksCheck(memberId);
        for(Fish fish:fishes){
            System.out.println(fish.getFishId());
        }*/
        return booksRepository.findBooksByMemberId(memberId);
    }

    @Async
    @Transactional
    public void booksUpdate(Fish fish, Member member, Inventory inventory){
        Books findBooks = booksRepository.findByFishAndMember(fish,member);
        if(findBooks == null){
            findBooks = Books.builder()
                    .fish(fish)
                    .member(member)
                    .getDate(LocalDateTime.now())
                    .maxSize(inventory.getSize())
                    .number(1)
                    .build();
        }
        else{
            findBooks.updateDate();
            findBooks.updateMaxSize(inventory.getSize());
            findBooks.updateNumber();
        }

        booksRepository.save(findBooks);
    }

    private HttpHeaders getFileHeaders(String fileName) {
        HttpHeaders fileHeaders = new HttpHeaders();
        fileHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        fileHeaders.setContentDisposition(ContentDisposition.builder("attachment").filename(fileName).build());
        return fileHeaders;
    }
}