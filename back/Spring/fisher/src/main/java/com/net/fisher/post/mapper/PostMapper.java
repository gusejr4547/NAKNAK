package com.net.fisher.post.mapper;

import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.dto.PostImageDto;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.PostImage;
import org.mapstruct.Mapper;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {
    Post postDtotoPost(PostDto.Post requestBody);

    default PostDto.Response postToPostResponseDto(Post post, List<PostImageDto.Response> postImageDtos){
        PostDto.Response response = PostDto.Response.builder()
                .postId(post.getPostId())
                .content(post.getContent())
                .registeredAt(post.getRegisteredAt())
                .memberId(post.getMember().getMemberId())
                .memberNickname(post.getMember().getNickname())
                .memberImageUrl(post.getMember().getMemberImage().getFileUrl())
                .postImageDtos(postImageDtos)
                .build();

        return response;
    }
}
