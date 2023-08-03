package com.net.fisher.post.mapper;

import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.entity.Tag;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {

    Tag stringToTag(String tagName);
    List<Tag> listToTags(List<String> tags);
//    Tag postDtoToTag(PostDto.Post postDto);
//    List<Tag> postDtoToTags(PostDto.Post postDto);
}
