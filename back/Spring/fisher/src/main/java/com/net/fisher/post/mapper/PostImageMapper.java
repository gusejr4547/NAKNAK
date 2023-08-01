package com.net.fisher.post.mapper;

import com.net.fisher.post.dto.PostImageDto;
import com.net.fisher.post.entity.PostImage;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostImageMapper {

    PostImageDto.Response postImageToPostImageResponseDto(PostImage postImage);

    List<PostImageDto.Response> toPostImageDtos(List<PostImage> postImageList);
}
