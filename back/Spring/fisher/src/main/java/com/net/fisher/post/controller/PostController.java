package com.net.fisher.post.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.fish.dto.InventoryDto;
import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.mapper.PostMapper;
import com.net.fisher.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class PostController {

    private final JwtTokenizer jwtTokenizer;
    private final PostMapper postMapper;
    private final PostService postService;

    @PostMapping("/posts/upload")
    public ResponseEntity<PostDto> uploadPost(
            @RequestHeader(name = "Authorization") String token,
            PostDto.Post requestBody,
            MultipartHttpServletRequest httpServletRequest){

        long tokenId = jwtTokenizer.getMemberId(token);

        System.out.println("###########");
        System.out.println(tokenId);
        System.out.println("###########");
        System.out.println(requestBody);

        postService.uploadPost(tokenId, postMapper.postDtotoPost(requestBody), httpServletRequest);

        return null;
    }
}
