package com.net.fisher.fish.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.fish.dto.BooksDto;
import com.net.fisher.fish.dto.FishBowlsDto;
import com.net.fisher.fish.dto.FishRecogDto;
import com.net.fisher.fish.dto.InventoryDto;
import com.net.fisher.fish.entity.Books;
import com.net.fisher.fish.entity.FishBowls;
import com.net.fisher.fish.entity.Inventory;
import com.net.fisher.fish.mapper.FishMapper;
import com.net.fisher.fish.service.FishService;
import com.net.fisher.response.BooksResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FishController {

    private final JwtTokenizer jwtTokenizer;
    private final FishMapper fishMapper;
    private final FishService fishService;

    @PostMapping("/fishes/upload")
    public ResponseEntity<InventoryDto.SingleResponse> postFishImage(
            @RequestHeader(name = "Authorization") String token,
            @RequestParam("image") MultipartFile image){
        FishRecogDto recogDto = fishService.recognizeFish(token,image);
        return postInventory(token,new InventoryDto.Post(recogDto.getCode(), recogDto.getSize()));
    }

    // 물고기 인식 모듈에서 인벤토리에 추가하는 로직
    @PostMapping("/fishes/catch")
    public ResponseEntity<InventoryDto.SingleResponse> postInventory(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody InventoryDto.Post requestBody){

        long tokenId = jwtTokenizer.getMemberId(token);

        String fishCode = requestBody.getFishCode();

        Inventory inventory = fishService.catchFish(tokenId,fishCode, fishMapper.toInventory(requestBody));

        return new ResponseEntity<>(fishMapper.toInventorySingleResponse(inventory), HttpStatus.CREATED);
    }


    @PostMapping("/fishes/intobowl")
    public ResponseEntity<FishBowlsDto.SingleResponse> postToFishBowls(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody FishBowlsDto.Post requestBody){

        long tokenId = jwtTokenizer.getMemberId(token);

        long inventoryId = requestBody.getTargetId();

        FishBowls fishBowls = fishService.intoFishBowls(tokenId,inventoryId);

        return new ResponseEntity<>(fishMapper.toFishBowlResponse(fishBowls),HttpStatus.OK);
    }

    @PostMapping("/fishes/intoinven")
    public ResponseEntity<InventoryDto.SingleResponse> postToInventory(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody FishBowlsDto.Post requestBody) {
        long tokenId = jwtTokenizer.getMemberId(token);

        long fishBowlId = requestBody.getTargetId();

        Inventory inventory = fishService.intoInventory(tokenId, fishBowlId);
        return new ResponseEntity<>(fishMapper.toInventorySingleResponse(inventory),HttpStatus.OK);
    }

    @GetMapping("/books/{member-id}")
    public ResponseEntity<BooksResponse> getBooksOfMember(@PathVariable(value = "member-id") long memberId){

        List<BooksDto.Response> booksResponseDtos = fishMapper.toBooksResponseDtos(fishService.readBooksOfMember(memberId));

        BooksResponse responses = new BooksResponse(booksResponseDtos,fishService.checkCaughtFish(memberId));

        // DB에 딕셔너리가 id 순으로 차곡차곡 쌓여있을텐데 과연 이렇게 처리해야할까?
        return new ResponseEntity<>(responses,HttpStatus.OK);
    }

    /*------------------------관리용 API-----------------------*/


}
