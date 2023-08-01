package com.net.fisher.post.service;

import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.file.FileInfo;
import com.net.fisher.file.service.FileService;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.repository.MemberRepository;
import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.entity.Like;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.PostImage;
import com.net.fisher.post.repository.PostImageRepository;
import com.net.fisher.post.repository.PostRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final MemberRepository memberRepository;
    private final FileService fileService;
    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;

    @Transactional
    public void uploadPost(long tokenId, Post post, MultipartHttpServletRequest httpServletRequest) {
        try {
            // member 조회
            Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

            post.setMember(member);

            // 파일 업로드
            List<MultipartFile> fileList = httpServletRequest.getFiles("file");
            List<FileInfo> infoList = fileService.uploadFiles(fileList);

            PostImage postImage = null;
            for (FileInfo info : infoList) {
                postImage = PostImage.builder()
                        .fileName(info.getFileName())
                        .fileSize(info.getFileSize())
                        .fileContentType(info.getContentType())
                        .fileUrl(info.getFileUrl())
                        .post(post)
                        .build();

                postImageRepository.save(postImage);
            }

            postRepository.save(post);
        } catch (BusinessLogicException e){
            throw new BusinessLogicException(ExceptionCode.FAILED_TO_WRITE_BOARD);
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.FAILED_TO_WRITE_BOARD);
        }

    }

    public Post postDetail(long postId) {

        Post post = postRepository.findById(postId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        return post;
    }

    public List<PostImage> postImageDetail(long postId) {

        List<PostImage> postImages = postImageRepository.findPostImagesByPostId(postId);

        return postImages;
    }

    public Post updatePost(long tokenId, long postId) {

        return null;
    }

    public void deleteImage(long tokenId, long fileId) {

    }



}
