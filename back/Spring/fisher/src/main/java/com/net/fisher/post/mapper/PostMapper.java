package com.net.fisher.post.mapper;

import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.dto.PostImageDto;
import com.net.fisher.post.dto.TagDto;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.PostImage;
import com.net.fisher.post.entity.PostTag;
import com.net.fisher.post.entity.Tag;
import org.mapstruct.Mapper;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {
    Post postDtoToPost(PostDto.Post requestBody);

    PostImageDto.Response toPostImageDto(PostImage postImages);
    List<PostImageDto.Response> toPostImageDtos(List<PostImage> postImageList);

    default Tag toTag(PostTag postTag){
        return postTag.getTag();
    }

    default TagDto.SingleResponse toTagDto(Tag tag){
        return TagDto.SingleResponse.builder()
                .tagId(tag.getTagId())
                .tagName(tag.getTagName()).build();
    }

    List<TagDto.SingleResponse> toTagDtos(List<Tag> tags);

    List<Tag> toTagList(List<PostTag> postTagList);

    default PostDto.Response toPostResponseDto(Post post){
        String fileUrl = "/upload/man.jpeg";
        if(post.getMember().getMemberImage() !=null) fileUrl = post.getMember().getMemberImage().getFileUrl();
        PostDto.Response response = PostDto.Response.builder()
                .postId(post.getPostId())
                .content(post.getContent())
                .views(post.getViews())
                .registeredAt(post.getRegisteredAt())
                .memberId(post.getMember().getMemberId())
                .memberNickname(post.getMember().getNickname())
                .memberImageUrl(fileUrl)
                .images(toPostImageDtos(post.getPostImageList()))
                .tags(toTagDtos(toTagList(post.getPostTagList())))
                .likeCount(post.getLikes())
                .build();
        return response;
    }

    List<PostDto.Response> toPostResponseDtos(List<Post> postList);

    default PostDto.SimpleResponse toPostSimpleResponseDto(Post post){
        String fileUrl = "/upload/man.jpeg";
        if(post.getMember().getMemberImage() !=null) fileUrl = post.getMember().getMemberImage().getFileUrl();
        PostDto.SimpleResponse response = PostDto.SimpleResponse.builder()
                .postId(post.getPostId())
                .content(post.getContent())
                .registeredAt(post.getRegisteredAt())
                .memberId(post.getMember().getMemberId())
                .memberNickname(post.getMember().getNickname())
                .memberImageUrl(fileUrl)
                .build();
        return response;
    }
}
