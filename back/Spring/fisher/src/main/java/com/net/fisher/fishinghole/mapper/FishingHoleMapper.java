package com.net.fisher.fishinghole.mapper;

import com.net.fisher.fishinghole.dto.FishingHoleDto;
import com.net.fisher.fishinghole.entity.FishingHole;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FishingHoleMapper {
    FishingHoleDto.Response toResponseDto(FishingHole fishingHole);

    List<FishingHoleDto.Response> toResponseDtos(List<FishingHole> fishingHoleList);
}
