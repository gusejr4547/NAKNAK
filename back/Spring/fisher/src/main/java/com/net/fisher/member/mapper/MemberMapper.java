package com.net.fisher.member.mapper;

import com.net.fisher.member.dto.FollowDto;
import com.net.fisher.member.dto.MemberDto;
import com.net.fisher.member.dto.MemberStatusDto;
import com.net.fisher.member.entity.Follow;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.entity.MemberStatus;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member postDtoToMember(MemberDto.Post requestBody);
    MemberDto.Response memberToResponseDto(Member member);
    MemberStatusDto.Response toMemberStatusDto(MemberStatus memberStatus);

    List<MemberDto.Response> toMemberResponseDtos(List<Member> members);

    default FollowDto.Response toFollowResponseDto(Follow follow){
        return FollowDto.Response.builder()
                .fromId(follow.getMember().getMemberId())
                .toId(follow.getFollowMember().getMemberId())
                .build();
    }
}
