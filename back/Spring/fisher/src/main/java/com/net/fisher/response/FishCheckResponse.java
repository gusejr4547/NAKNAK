package com.net.fisher.response;

import com.net.fisher.fish.entity.Fish;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class FishCheckResponse {
    private List<Fish> all;
    private List<Long> chk;
}
