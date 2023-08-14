package com.net.fisher.fishinghole.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.net.fisher.conv.RequestMessage;
import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.fishinghole.entity.FavoritePoint;
import com.net.fisher.fishinghole.entity.FishingHole;
import com.net.fisher.fishinghole.repository.FavoritePointRepository;
import com.net.fisher.fishinghole.repository.FishingHoleRepository;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.service.MemberService;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FishingHoleService {
    private final FishingHoleRepository fishingHoleRepository;
    private final FavoritePointRepository favoritePointRepository;
    private final MemberService memberService;

    @PostConstruct
    @Transactional
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
                        long currentSize = fishingHoleRepository.countBy();
                        if(jsonNode.size() > currentSize) {
                            System.out.println("====json data 업데이트==== FROM :" + currentSize);
                            fishingHoleRepository.deleteAll();

                            List<FishingHole> fishingHoleList = new ArrayList<>();
                            for (JsonNode spotNode : jsonNode) {
                                long pk = spotNode.get("pk").asLong();
                                String title = spotNode.get("title").asText();
                                double latitude = spotNode.get("lat").asDouble();
                                double longitude = spotNode.get("lng").asDouble();
                                //String obsCode = spotNode.get("fields").get("obsCode").asText();
                                if(fishingHoleRepository.findById(pk).isEmpty()) {
                                    FishingHole fishingHole = FishingHole.builder()
                                            .fishingHoleId(pk)
                                            .title(title)
                                            .latitude(latitude)
                                            .longitude(longitude)
                                            .build();
                                    fishingHoleList.add(fishingHole);
                                }
                            }
                            fishingHoleRepository.saveAll(fishingHoleList);
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

    public FishingHole findByFishingHoleId(long fishingHoleId){
        FishingHole fishingHole = fishingHoleRepository.findById(fishingHoleId).orElseThrow(()->new BusinessLogicException(ExceptionCode.FISHINGHOLES_NOT_FOUND));
        return fishingHole;
    }

    public List<FishingHole> findAllFishingHole(){
        return fishingHoleRepository.findAll();
    }


    public FavoritePoint registerFavorite(long memberId, long pointId){
        Member member = memberService.findMember(memberId);
        FishingHole fishingHole = findByFishingHoleId(pointId);

        if(favoritePointRepository.findByMemberIdAndFishingHoleId(member,fishingHole) >= 1) throw new BusinessLogicException(ExceptionCode.FAVORITEPOINT_ALREADY_EXISTS);

        FavoritePoint favoritePoint = FavoritePoint.builder()
                .member(member)
                .fishingHole(fishingHole)
                .build();

        return favoritePointRepository.save(favoritePoint);
    }

    public void cancelFavorite(long memberId, long favoriteId){
        FavoritePoint favoritePoint = favoritePointRepository.findFavoritePointByMemberAndId(memberId,favoriteId);

        if(favoritePoint ==null) throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        favoritePointRepository.delete(favoritePoint);
    }

    public List<FishingHole> findFavoriteFishingHoleOfMember(long memberId){
        Member member = memberService.findMember(memberId);

        return fishingHoleRepository.findFishingHolesOfMember(member);
    }

    private FavoritePoint findFavoritePointById(long favoriteId){
        return favoritePointRepository.findById(favoriteId).orElseThrow(()->new BusinessLogicException(ExceptionCode.FAVORITEPOINTS_NOT_FOUND));
    }


}
