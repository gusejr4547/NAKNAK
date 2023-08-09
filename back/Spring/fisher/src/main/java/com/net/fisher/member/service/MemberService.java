package com.net.fisher.member.service;

import com.net.fisher.auth.utils.CustomAuthorityUtils;
import com.net.fisher.conv.Attachment;
import com.net.fisher.conv.RequestMessage;
import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.file.FileInfo;
import com.net.fisher.file.service.FileService;
import com.net.fisher.member.dto.MemberDto;
import com.net.fisher.member.entity.Follow;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.entity.MemberImage;
import com.net.fisher.member.entity.MemberStatus;
import com.net.fisher.member.mapper.MemberMapper;
import com.net.fisher.member.repository.FollowRepository;
import com.net.fisher.member.repository.MemberImageRepository;
import com.net.fisher.member.repository.MemberRepository;
import com.net.fisher.member.repository.MemberStatusRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final MemberImageRepository memberImageRepository;
    private final FileService fileService;
    private final MemberStatusRepository memberStatusRepository;
    private final FollowRepository followRepository;

    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    @Value("${app.fileupload.uploadDir}")
    String uploadFolder;

    @Value("${app.fileupload.uploadPath}")
    String uploadPath;

    @PostConstruct
    public void initialize(){ // server on mattermost bot
        String ipAddressStr = "ip"; //test
        try {//test2
            InetAddress ipAddress = InetAddress.getLocalHost();
            ipAddressStr = ipAddress.getHostAddress();
            System.out.println("Your IP address is: " + ipAddressStr);
        } catch (UnknownHostException e) {
            System.out.println("Unable to determine your IP address: " + e.getMessage());
        }
        String toIp = "127.0.1.1";
        if(ipAddressStr.equals(toIp)){
            RestTemplate restTemplate = new RestTemplate();


            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            RequestMessage requestMessage = new RequestMessage();
            requestMessage.setUsername("serverBot");
            requestMessage.setChannel("9e105");
            List<Attachment> attachments = new ArrayList<>();
            attachments.add(new Attachment("Server is on! 서버가 켜졌어용 :09_buk_e105_mascot_face: "));
            requestMessage.setAttachments(attachments);

            // Create the HttpEntity with headers and request object
            HttpEntity<RequestMessage> requestEntity = new HttpEntity<>(requestMessage, headers);

            String url = "https://meeting.ssafy.com/hooks/nzhq14h3atb99q3h8coadtqe9o"; // Replace with the actual API endpoint URL

            // Send the POST request and get the response
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
        }else{

        }

    }

    @Transactional
    public Member createMember(Member member, MultipartHttpServletRequest httpServletRequest) {
        try {

            member.setPassword(passwordEncoder.encode(member.getPassword()));

            verifyExistsEmail(member.getEmail());

            List<String> roles = authorityUtils.createRoles(member.getEmail());

            member.setRoles(roles);

            Member savingMember = memberRepository.save(member);
            List<MultipartFile> fileList = httpServletRequest.getFiles("file");
            if(fileList.size()>1) throw new BusinessLogicException(ExceptionCode.NOT_ALLOWED_FILES);
            List<FileInfo> infoList = fileService.uploadFiles(fileList);

            MemberImage memberImage = null;

            for (FileInfo info : infoList) {
                memberImage = MemberImage.builder()
                        .fileName(info.getFileName())
                        .fileSize(info.getFileSize())
                        .fileContentType(info.getContentType())
                        .fileUrl(info.getFileUrl())
                        .build();

                memberImage = memberImageRepository.save(memberImage);
            }

            // 멤버를 생성하면서 새로 생긴 멤버에게 상태 할당 (튜토리얼 진행상황과 같은 스테이터스)
            MemberStatus memberStatus = MemberStatus.builder()
                    .member(savingMember)
                    .exp(0)
                    .level(0)
                    .isNewBie(-1)
                    .tutorialProgress(0)
                    .point(0)
                    .build();
            memberStatusRepository.save(memberStatus);

            savingMember.setMemberImage(memberImage);
            return savingMember;
        } catch (BusinessLogicException e) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXISTS);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BusinessLogicException(ExceptionCode.FAILED_TO_UPDATE_MEMBER);
        }
    }

    @Transactional
    public Member updateMember(long memberId, MemberDto.Update requestBody, MultipartHttpServletRequest multiRequest){
        Member member = findMember(memberId);

        member.setPassword(passwordEncoder.encode(requestBody.getPassword()));
        member.setNickname(requestBody.getNickname());

        File rollback = null;

        try {
            List<MultipartFile> fileList = multiRequest.getFiles("file");
            if(fileList.size()>1) throw new BusinessLogicException(ExceptionCode.NOT_ALLOWED_FILES);
            List<FileInfo> infoList = fileService.uploadFiles(fileList);
            if(infoList.size()==1) {
                if (member.getMemberImage() != null) {
                    MemberImage toDeleteImage = member.getMemberImage();
                    String savedFileName = toDeleteImage.getFileUrl();
                    File toDelete = new File(uploadPath + File.separator + savedFileName);
                    toDelete.delete();
                    memberImageRepository.delete(member.getMemberImage());
                }

                MemberImage memberImage = null;

                for (FileInfo info : infoList) {
                    memberImage = MemberImage.builder()
                            .fileName(info.getFileName())
                            .fileSize(info.getFileSize())
                            .fileContentType(info.getContentType())
                            .fileUrl(info.getFileUrl())
                            .build();

                    memberImage = memberImageRepository.save(memberImage);

                    member.setMemberImage(memberImage);
                }
            }

            return memberRepository.save(member);
        }catch (Exception e) {
            e.printStackTrace();
            throw new BusinessLogicException(ExceptionCode.FAILED_TO_UPDATE_MEMBER);
        }
    }

    public Page<Member> getFollowList(long memberId, Pageable pageable){
        return memberRepository.findMembersFromFollowerId(memberId,pageable);
    }

    public Page<Member> getFollowingList(long memberId, Pageable pageable){
        return memberRepository.findMembersFromFollowerIdFollowing(memberId,pageable);
    }

    public MemberStatus setTutorialProgress(long memberId,int tutorialProgress){
        memberStatusRepository.setStatusForTutorialProgress(memberId,tutorialProgress);
        return memberStatusRepository.findMemberStatusByMember_MemberId(memberId);
    }

    public MemberStatus setIsNewbie(long memberId,int isNewbie){
        memberStatusRepository.setStatusForIsNewbie(memberId,isNewbie);
        return memberStatusRepository.findMemberStatusByMember_MemberId(memberId);
    }

    public Follow makeFollowTo(long toId, long fromId){

        Follow follow =
        followRepository.findFollowFromToId(fromId,toId).orElseGet(()->Follow.builder()
                .member(findMember(fromId))
                .followMember(findMember(toId))
                .build());

        return followRepository.save(follow);
    }

    @Transactional
    public void cancelFollowTo(long toId, long fromId){
        Follow follow = followRepository.findFollowFromToId(fromId,toId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        followRepository.delete(follow);
    }

    public MemberStatus findStatusOfMember(long memberId){
        return memberStatusRepository.findMemberStatusByMember_MemberId(memberId);
    }

    public List<Member> findAllMembers() {
        return memberRepository.findAll();
    }

    public Member findMember(long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        if (findMember.isPresent()) return findMember.get();
        else throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    }

    public void verifyExistsEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        if (findMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXISTS);
        }
    }
}
