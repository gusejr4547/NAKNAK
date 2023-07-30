package com.net.fisher.member.service;

import com.net.fisher.auth.utils.CustomAuthorityUtils;
import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.file.FileInfo;
import com.net.fisher.file.service.FileService;
import com.net.fisher.member.entity.Follow;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.entity.MemberImage;
import com.net.fisher.member.entity.MemberStatus;
import com.net.fisher.member.mapper.MemberMapper;
import com.net.fisher.member.repository.FollowRepository;
import com.net.fisher.member.repository.MemberImageRepository;
import com.net.fisher.member.repository.MemberRepository;
import com.net.fisher.member.repository.MemberStatusRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
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

    @Transactional
    public Member createMember(Member member, MultipartHttpServletRequest httpServletRequest) {
        try {

            member.setPassword(passwordEncoder.encode(member.getPassword()));

            verifyExistsEmail(member.getEmail());

            List<String> roles = authorityUtils.createRoles(member.getEmail());

            member.setRoles(roles);

            Member savingMember = memberRepository.save(member);

            /*List<MultipartFile> fileList = httpServletRequest.getFiles("file");
            File uploadDir = new File(uploadPath+File.separator+uploadFolder);

            if(!uploadDir.exists()) uploadDir.mkdir();

            MemberImage memberImage = null;

            for(MultipartFile part:fileList){
                String fileName = part.getOriginalFilename();
                UUID uuid = UUID.randomUUID();

                String extension = FilenameUtils.getExtension(fileName);

                String savingFileName = uuid+"."+extension;

                File destFile = new File(uploadPath+File.separator+uploadFolder+File.separator+savingFileName);

                rollback = destFile;

                part.transferTo(destFile);

                String memberFileUrl = uploadFolder + "/"+ savingFileName;

                memberImage = MemberImage.builder()
                        .fileName(fileName)
                        .fileSize(part.getSize())
                        .fileContentType(part.getContentType())
                        .fileUrl(memberFileUrl)
                        .build();

                memberImage = memberImageRepository.save(memberImage);
            }
            savingMember.setMemberImage(memberImage); // 왜 영속화 된 이후의 객체에 setMemberImage 를 하는데 영속화가 되는가?? CASCADE?
            return savingMember;*/
            List<MultipartFile> fileList = httpServletRequest.getFiles("file");
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
                    .isNewBee(true)
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



    public Follow makeFollowTo(long toId, long fromId){
        Follow follow = Follow.builder()
                .member(findMember(fromId))
                .followMember(findMember(toId))
                .build();
        return followRepository.save(follow);
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
