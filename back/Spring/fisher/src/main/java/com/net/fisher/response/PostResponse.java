package com.net.fisher.response;

import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.dto.PostImageDto;
import com.net.fisher.post.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class PostResponse {
    private PostDto.Response post;
    private List<PostImageDto.Response> images;
    private long likeCount;
    private List<Tag> tags;
}
