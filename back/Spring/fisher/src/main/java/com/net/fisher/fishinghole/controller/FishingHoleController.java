package com.net.fisher.fishinghole.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.fishinghole.dto.FavoritePointDto;
import com.net.fisher.fishinghole.dto.FishingHoleDto;
import com.net.fisher.fishinghole.entity.FavoritePoint;
import com.net.fisher.fishinghole.entity.FishingHole;
import com.net.fisher.fishinghole.mapper.FishingHoleMapper;
import com.net.fisher.fishinghole.service.FishingHoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FishingHoleController {
    private final FishingHoleService fishingHoleService;
    private final FishingHoleMapper fishingHoleMapper;
    private final JwtTokenizer jwtTokenizer;

    @GetMapping("/fishingholes/{fishing-hole-id}")
    public ResponseEntity<FishingHoleDto.Response> getFishingHole(@PathVariable(name = "fishing-hole-id")long fishingHoleId){
        FishingHoleDto.Response response = fishingHoleMapper.toResponseDto(fishingHoleService.findByFishingHoleId(fishingHoleId));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/fishingholes")
    public ResponseEntity<List<FishingHoleDto.Response>> getFishingHoles(){
        List<FishingHoleDto.Response> responses = fishingHoleMapper.toResponseDtos(fishingHoleService.findAllFishingHole());

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PostMapping("/fishingholes/favorites/register")
    public ResponseEntity<FavoritePointDto.Response> registerFavoritePoint(
            @RequestHeader("Authorization") String token,
            @RequestBody FavoritePointDto.Register requestBody
            ){

        long tokenId = jwtTokenizer.getMemberId(token);
        long pointId = requestBody.getFishingHoleId();

        FavoritePoint favoritePoint = fishingHoleService.registerFavorite(tokenId,pointId);

        return new ResponseEntity<>(FavoritePointDto.Response.builder().favoritePointId(favoritePoint.getFavoritePointId()).fishingHoleId(favoritePoint.getFishingHole().getFishingHoleId())
                .memberId(favoritePoint.getMember().getMemberId())
                .build(),HttpStatus.CREATED);
    }

    @PostMapping("/fishingholes/favorites/cancel")
    public ResponseEntity<HttpStatus> cancelFavoritePoint(
            @RequestHeader("Authorization") String token,
            @RequestBody FavoritePointDto.Cancel requestBody
    ){

        long tokenId = jwtTokenizer.getMemberId(token);
        long favoriteId = requestBody.getFavoritePointId();

        fishingHoleService.cancelFavorite(tokenId,favoriteId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/fishingholes/favorites")
    public ResponseEntity<List<FishingHoleDto.Response>> getFavoritePointOfMember(
            @RequestHeader("Authorization") String token){
        long tokenId = jwtTokenizer.getMemberId(token);

        List<FishingHole> fishingHoles = fishingHoleService.findFavoriteFishingHoleOfMember(tokenId);

        return new ResponseEntity<>(fishingHoleMapper.toResponseDtos(fishingHoles),HttpStatus.OK);
    }


}
