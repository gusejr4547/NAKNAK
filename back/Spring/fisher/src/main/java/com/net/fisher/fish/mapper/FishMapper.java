package com.net.fisher.fish.mapper;

import com.net.fisher.fish.dto.BooksDto;
import com.net.fisher.fish.dto.FishBowlsDto;
import com.net.fisher.fish.dto.InventoryDto;
import com.net.fisher.fish.entity.Books;
import com.net.fisher.fish.entity.FishBowls;
import com.net.fisher.fish.entity.Inventory;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface FishMapper {
    InventoryDto.SingleResponse toInventorySingleResponse(Inventory inventory);
    default Inventory toInventory(InventoryDto.Post requestBody){
        return Inventory.builder()
                .size(requestBody.getSize())
                .build();
    }

    FishBowlsDto.SingleResponse toFishBowlResponse(FishBowls fishBowls);


    List<BooksDto.Response> toBooksResponseDtos(List<Books> booksList);

<<<<<<< HEAD
=======
    default List<FishBowlsDto.MultiResponse> toFishBowlMultiResponseDtos(List<FishBowls> fishBowlsList){
        List<FishBowlsDto.MultiResponse> multiResponses = new ArrayList<>();
        for(FishBowls fishBowls:fishBowlsList){
            multiResponses.add(FishBowlsDto.MultiResponse.builder()
                    .fishBowlId(fishBowls.getFishBowlId())
                    .fishCode(fishBowls.getFish().getCode())
                    .fishName(fishBowls.getFish().getName())
                    .fishSize(fishBowls.getSize())
                    .build());
        }
        return multiResponses;
    }
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

    default List<InventoryDto.MultiResponse> toInventoryMultiResponseDtos(List<Inventory> inventories){
        List<InventoryDto.MultiResponse> multiResponses = new ArrayList<>();
        for(Inventory inventory:inventories){
            multiResponses.add(InventoryDto.MultiResponse.builder()
                    .inventoryId(inventory.getInventoryId())
                    .fishCode(inventory.getFish().getCode())
                    .fishName(inventory.getFish().getName())
                    .fishSize(inventory.getSize())
                    .build());
        }
        return multiResponses;
    }

    default BooksDto.Response toBooksResponseDto(Books books){
        return BooksDto.Response.builder()
                .fishId(books.getFish().getFishId())
                .booksId(books.getBooksId())
                .getDate(books.getGetDate())
                .number(books.getNumber())
                .maxSize(books.getMaxSize())
                .build();
    }
}
