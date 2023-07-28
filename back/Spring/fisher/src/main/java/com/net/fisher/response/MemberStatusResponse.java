package com.net.fisher.response;

import com.net.fisher.member.dto.MemberDto;
import com.net.fisher.member.dto.MemberStatusDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberStatusResponse {
    private MemberDto.Response memberResponse;
    private MemberStatusDto.Response memberStatusResponse;
}
