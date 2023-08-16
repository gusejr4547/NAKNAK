package com.net.fisher.member.mapper;

<<<<<<< HEAD
=======
import com.net.fisher.auth.dto.Oauth2LoginDto;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
import com.net.fisher.member.dto.FollowDto;
import com.net.fisher.member.dto.MemberDto;
import com.net.fisher.member.dto.MemberStatusDto;
import com.net.fisher.member.entity.Follow;
import com.net.fisher.member.entity.Member;
<<<<<<< HEAD
=======
import com.net.fisher.member.entity.MemberImage;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae
import com.net.fisher.member.entity.MemberStatus;
import org.mapstruct.Mapper;

import java.util.List;
<<<<<<< HEAD
=======
import java.util.Optional;
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member postDtoToMember(MemberDto.Post requestBody);
    MemberDto.Response memberToResponseDto(Member member);
    MemberStatusDto.Response toMemberStatusDto(MemberStatus memberStatus);
<<<<<<< HEAD
=======
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
>>>>>>> 849874c40f88a8bfcf84d3c8ca41374d99d78fae

    List<MemberDto.Response> toMemberResponseDtos(List<Member> members);

    default FollowDto.Response toFollowResponseDto(Follow follow){
        return FollowDto.Response.builder()
                .fromId(follow.getMember().getMemberId())
                .toId(follow.getFollowMember().getMemberId())
                .build();
    }
}
