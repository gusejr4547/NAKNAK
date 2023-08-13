package com.net.fisher.post.service;

import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.file.FileInfo;
import com.net.fisher.file.service.FileService;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.repository.FollowRepository;
import com.net.fisher.member.repository.MemberRepository;
import com.net.fisher.post.dto.LikeDto;
import com.net.fisher.post.dto.PostDto;
import com.net.fisher.post.dto.TagDto;
import com.net.fisher.post.entity.*;
import com.net.fisher.post.repository.*;
import com.net.fisher.response.PostResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {
    private final MemberRepository memberRepository;
    private final FileService fileService;
    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final LikeRepository likeRepository;
    private final TagRepository tagRepository;
    private final PostTagRepository postTagRepository;
    private final FollowRepository followRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Transactional
    public void uploadPost(long tokenId, Post post, List<Tag> tagList, MultipartHttpServletRequest httpServletRequest) {
        try {
            // member 조회
            Member member = memberRepository.findById(tokenId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

            post.setMember(member);
            post = postRepository.save(post);

            // Tag 테이블에 등록, PostTag 에 등록
            PostTag postTag = null;
            if (tagList != null) {
                for (Tag tagInfo : tagList) {
                    Tag tag = tagRepository.findByTagName(tagInfo.getTagName()).orElse(
                            Tag.builder().tagName(tagInfo.getTagName()).build());
                    tagRepository.save(tag);

                    postTag = PostTag.builder()
                            .tag(tag)
                            .post(post)
                            .build();
                    postTagRepository.save(postTag);
                }
            }


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

        } catch (BusinessLogicException e) {
            throw new BusinessLogicException(e.getExceptionCode());
        } catch (IOException e) {
            e.printStackTrace();
            throw new BusinessLogicException(ExceptionCode.FAILED_TO_WRITE_BOARD);
        }

    }

    public Post getPost(long postId) {

        Post post = postRepository.findById(postId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        return post;
    }

    public List<PostImage> getPostImage(long postId) {

        List<PostImage> postImages = postImageRepository.findPostImagesByPostId(postId);

        return postImages;
    }

    @Transactional
    public void increaseViews(long postId) {
        postRepository.upCountByPostId(postId);
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

        // 기존 태그와 비교해서 새로운 태그는 추가
        Set<Tag> tags = new HashSet<>(postTagRepository.findAllTagByPostId(postId));
        Set<Tag> newTags = new HashSet<>();
        for (Tag tag : postPatchDto.getTags()) {
            System.out.println("#############");
            System.out.println(tag);
            if (!tagRepository.existsTagByTagName(tag.getTagName())) {
                tag = tagRepository.save(tag);
                newTags.add(tag);
            } else {
                tag = tagRepository.findByTagName(tag.getTagName()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
                newTags.add(tag);
            }
        }

        // 공통 부분
//        tags.retainAll();
        Set<Tag> copyTags = Set.copyOf(tags);

        // PostTag 에서 지워줘야할 것
        tags.removeAll(newTags);
        tags.forEach((tag) -> postTagRepository.deleteByTagAndPost(tag, post));

        // PostTag 에 추가 해줘야 할 것
        newTags.removeAll(copyTags);
        System.out.println(newTags);
        PostTag postTag = null;
        for (Tag tag : newTags) {
            postTag = PostTag.builder().tag(tag).post(post).build();
            postTagRepository.save(postTag);
        }

        // 이미지 삭제 할 것 있으면 삭제
        if(postPatchDto.getDeleteImageList() != null){
            for(long id : postPatchDto.getDeleteImageList()){
                PostImage postImage = postImageRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND));

                if(postImage.getPost() != post){
                    throw new BusinessLogicException(ExceptionCode.FAILED_TO_UPDATE_FILE);
                }

                postImageRepository.delete(postImage);
            }
        }
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
        List<PostTag> postTagList = postTagRepository.findAllByPost_PostId(postId);
        postTagRepository.deleteAll(postTagList);

        postRepository.delete(post);
    }

    @Transactional
    public long likePost(long tokenId, long postId) {

        Member member = memberRepository.findById(tokenId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        // 이미 좋아요를 눌린 사람이 접근 한 경우
        Like like = likeRepository.findByMemberIdAndPostId(tokenId, postId)
                .orElse(Like.builder().post(post).member(member).build());

        likeRepository.save(like);

        long likes = likeRepository.countByPost_PostId(postId);

        post.setLikes(likes);

        postRepository.save(post);

        return post.getLikes();
    }

    @Transactional
    public long unlikePost(long tokenId, long postId) {
        Like like = likeRepository.findByMemberIdAndPostId(tokenId, postId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND));

        likeRepository.delete(like);

        long likes = likeRepository.countByPost_PostId(postId);
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        post.setLikes(likes);
        postRepository.save(post);

        return post.getLikes();
    }

    public long getLikeCount(long postId) {
        return likeRepository.countByPost_PostId(postId);
    }

    public List<Tag> getTags(long postId) {
        return postTagRepository.findAllTagByPostId(postId);
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public List<Post> getMyAllPost(long tokenId) {


        return null;
    }

    public Page<Post> getPostFromMember(long tokenId, Pageable pageable) {
        return postRepository.findPostByMemberIdFromPage(pageable, tokenId);
    }

    public PostImage getOnePostImageByPost(Post post) {
        return postImageRepository.findFirstByPost(post);
    }

    public Page<Post> getPostFromMemberLike(long tokenId, Pageable pageable) {
        return likeRepository.findPostByMemberId(pageable, tokenId);
    }

    public Page<Post> getDefaultPost(Pageable pageable, LocalDateTime time) {
        return postRepository.findAll(pageable);
    }

    public Page<Post> getPostFromFollowing(long memberId, Pageable pageable, LocalDateTime time) {

        Page<Post> postPage = postRepository.findPostByFollowing(pageable, memberId, time);
        System.out.println(postPage.getTotalElements());
        System.out.println(postPage.getContent().size());
        return postPage;
    }

    public Page<Post> getPostFromMyWay(long memberId, Pageable pageable, LocalDateTime time) {
        // 3, 3 조회
        Pageable slicePageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize() / 2, Sort.Direction.DESC, "postId");

        // 팔로잉한 사람의 게시글을 조회
        List<Long> followingMemberList = followRepository.findFollowMemberIdByMember_MemberId(memberId).orElse(new ArrayList<>());
//        System.out.println("############# 팔로잉");
//        System.out.println(followingMemberList);

        if(followingMemberList.isEmpty()){
            followingMemberList.add(-1l);
        }

        Page<Post> postPageFollowing = postRepository.findPostByFollowing(slicePageable, followingMemberList, time);

//        System.out.println("########### 팔로잉한 사람의 게시글");
//        System.out.println(postPageFollowing.getContent());

        // 내가 작성한 태그 중 가장 많이 사용한 태그 상위 최대 5개 선택
        List<Long> myTagInfo = postRepository.countTagByMemberId(PageRequest.of(0, 5), memberId);

        // 모든 이용자가 작성한 태그 중 인기 많은
        myTagInfo.addAll(postRepository.countTag(PageRequest.of(0,3)));

//        System.out.println("############# taginfo");
//        System.out.println(myTagInfo);

        // 태그가 없는 경우는
        Page<Post> postPageTag = null;
        if (!myTagInfo.isEmpty()) {
            postPageTag = postRepository.findPostFromMyTag(slicePageable, followingMemberList, new HashSet<>(myTagInfo), time);
        } else {
            System.out.println("tag 가 없네용");
        }
//        System.out.println("######## 태그 기반 게시글");
//        System.out.println(postPageTag.getContent());

        // 합치기
        List<Post> postFollowing = postPageFollowing.getContent();
        List<Post> postTag = postPageTag.getContent();
        List<Post> totalPostList = sorting(postFollowing, postTag);

//        System.out.println(totalPostList);


        Page<Post> postPage = new PageImpl<>(totalPostList, pageable,
                postPageFollowing.getTotalElements() + postPageTag.getTotalElements());

        return postPage;
    }

    public List<Post> sorting(List<Post> post1, List<Post> post2) {
        List<Post> totalPost = new ArrayList<>(post1);
        totalPost.addAll(post2);
        Collections.sort(totalPost, (e1, e2) -> e2.getRegisteredAt().compareTo(e1.getRegisteredAt()));

        return totalPost;
    }

    public Page<Post> getPostByTag(Pageable pageable, long tagId){
        Tag tag = tagRepository.findById(tagId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));

        return postRepository.findByTag(pageable, tag);
    }
}
