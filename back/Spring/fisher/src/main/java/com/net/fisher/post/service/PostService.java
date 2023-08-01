package com.net.fisher.post.service;

import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.file.FileInfo;
import com.net.fisher.file.service.FileService;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.repository.MemberRepository;
import com.net.fisher.post.dto.LikeDto;
import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.entity.Like;
import com.net.fisher.post.entity.Post;
import com.net.fisher.post.entity.PostImage;
import com.net.fisher.post.repository.LikeRepository;
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
    private final LikeRepository likeRepository;

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
        } catch (BusinessLogicException e) {
            throw new BusinessLogicException(ExceptionCode.FAILED_TO_WRITE_BOARD);
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.FAILED_TO_WRITE_BOARD);
        }

    }

    public Post postDetail(long postId) {

        Post post = postRepository.findById(postId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        return post;
    }

    public List<PostImage> postImageDetail(long postId) {

        List<PostImage> postImages = postImageRepository.findPostImagesByPostId(postId);

        return postImages;
    }

    public void increaseViews(Post post) {
        post.setViews(post.getViews() + 1);
    }

    @Transactional
    public void updatePost(long tokenId, long postId, PostDto.Patch postPatchDto) {

        Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Post post = postRepository.findById(postId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        if (member.getMemberId() != post.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        post.setContent(postPatchDto.getContent());

        postRepository.save(post);
    }

    @Transactional
    public void deleteImage(long tokenId, long fileId) {

        Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        PostImage postImage = postImageRepository.findById(fileId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND));

        if (member.getMemberId() != postImage.getPost().getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        postImageRepository.delete(postImage);
    }

    @Transactional
    public void deletePost(long tokenId, long postId) {
        Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Post post = postRepository.findById(postId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        if (post.getMember().getMemberId() != member.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        List<PostImage> imageList = postImageRepository.findPostImagesByPostId(postId);
        postImageRepository.deleteAll(imageList);

        // 좋아요 삭제 - 좋아요 한사람이 여러명 있을 것
        List<Like> likeList = likeRepository.findAllByPostId(postId);
        likeRepository.deleteAll(likeList);

        // 태그 처리 필요

        postRepository.delete(post);
    }

    @Transactional
    public void likePost(long tokenId, LikeDto.Post likePostDto) {

        Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Post post = postRepository.findById(likePostDto.getPostId()).orElseThrow(()->new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        Like like = Like.builder().post(post).member(member).build();

        likeRepository.save(like);
    }

    @Transactional
    public void unlikePost(long tokenId, LikeDto.Post likePostDto) {
        Like like = likeRepository.findByMemberIdAndPostId(tokenId, likePostDto.getPostId()).orElseThrow(()->new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND));

        likeRepository.delete(like);
    }

    public long getLikeCount(long postId){

        return likeRepository.countByPost_PostId(postId);
    }
}
