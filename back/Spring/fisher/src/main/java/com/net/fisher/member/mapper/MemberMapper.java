package com.net.fisher.member.mapper;

import com.net.fisher.auth.dto.Oauth2LoginDto;
import com.net.fisher.member.dto.FollowDto;
import com.net.fisher.member.dto.MemberDto;
import com.net.fisher.member.dto.MemberStatusDto;
import com.net.fisher.member.entity.Follow;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.entity.MemberImage;
import com.net.fisher.member.entity.MemberStatus;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member postDtoToMember(MemberDto.Post requestBody);
    MemberDto.Response memberToResponseDto(Member member);
    MemberStatusDto.Response toMemberStatusDto(MemberStatus memberStatus);
    default Oauth2LoginDto toOauth2LoginDto(Member member){
        MemberImage image = member.getMemberImage();
        if(image == null) image = MemberImage.builder().fileUrl("upload/default.jpg").build();
        return Oauth2LoginDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .profileImgUrl(image.getFileUrl())
                .registeredAt(member.getRegisteredAt())
                .build();
    }

    List<MemberDto.Response> toMemberResponseDtos(List<Member> members);

    default FollowDto.Response toFollowResponseDto(Follow follow){
        return FollowDto.Response.builder()
                .fromId(follow.getMember().getMemberId())
                .toId(follow.getFollowMember().getMemberId())
                .build();
    }
}
