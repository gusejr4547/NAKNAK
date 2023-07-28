package com.net.fisher.response;

import com.net.fisher.fish.dto.BooksDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class BooksResponse {
    private List<BooksDto.Response> list;
    private FishCheckResponse fishCheck;
}
