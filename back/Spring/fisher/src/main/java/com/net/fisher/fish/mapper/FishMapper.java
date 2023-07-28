package com.net.fisher.fish.mapper;

import com.net.fisher.fish.dto.BooksDto;
import com.net.fisher.fish.dto.FishBowlsDto;
import com.net.fisher.fish.dto.InventoryDto;
import com.net.fisher.fish.entity.Books;
import com.net.fisher.fish.entity.FishBowls;
import com.net.fisher.fish.entity.Inventory;
import org.mapstruct.Mapper;

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
