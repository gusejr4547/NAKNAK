package com.net.fisher.member.controller;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.auth.redis.RedisDao;
import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.member.dto.FollowDto;
import com.net.fisher.member.dto.MemberDto;
import com.net.fisher.member.dto.MemberStatusDto;
import com.net.fisher.member.entity.Follow;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.mapper.MemberMapper;
import com.net.fisher.member.service.MemberService;
import com.net.fisher.response.MemberStatusResponse;
import com.net.fisher.response.PageResponse;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {
    private final JwtTokenizer jwtTokenizer;
    private final RedisDao redisDao;

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PostMapping("/members/register")
    public ResponseEntity<MemberDto.Response> postMember(MemberDto.Post requestBody, MultipartHttpServletRequest httpServletRequest) {
        System.out.println(requestBody.getEmail());
        Member member = memberService.createMember(memberMapper.postDtoToMember(requestBody), httpServletRequest);
        return new ResponseEntity<>(memberMapper.memberToResponseDto(member), HttpStatus.CREATED);
    }

    @GetMapping("/members/{member-id}")
    public ResponseEntity<MemberStatusResponse> getMember
            (@PathVariable(value = "member-id") long memberId) {
        MemberDto.Response memberResponse = memberMapper.memberToResponseDto(memberService.findMember(memberId));
        MemberStatusDto.Response statusResponse = memberMapper.toMemberStatusDto(memberService.findStatusOfMember(memberId)); //Member 의 정보를 받아오는 GetMapping
        return new ResponseEntity<>(new MemberStatusResponse(memberResponse,statusResponse), HttpStatus.OK);
    }

    /*@PostMapping("/members/update")
    public ResponseEntity<MemberDto.Response> updateMember
            (@RequestBody )*/


    @GetMapping("/members/list")
    public ResponseEntity<List<MemberDto.Response>> getMembers() {
        return new ResponseEntity<>(memberMapper.toMemberResponseDtos(memberService.findAllMembers()), HttpStatus.OK);
    }


    @PostMapping("/follow/register")
    public ResponseEntity<FollowDto.Response> registerFollow(@RequestParam(name = "follow") long toId, @RequestHeader("Authorization") String token){
        long memberId = jwtTokenizer.getMemberId(token);

        FollowDto.Response response = memberMapper.toFollowResponseDto(memberService.makeFollowTo(toId,memberId));

        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @PostMapping("/follow/cancel")
    public ResponseEntity<FollowDto.Response> cancelFollow(@RequestParam(name = "follow") long toId, @RequestHeader("Authorization") String token){
        long memberId = jwtTokenizer.getMemberId(token);
        //FollowDto.Response response = memberMapper.toFollowResponseDto(memberService.makeFollowTo(toId,memberId));
        memberService.cancelFollowTo(toId,memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/members/follow/{member-id}")
    public ResponseEntity<PageResponse<MemberDto.Response>> getFollowList(
            @PathVariable(name = "member-id")long memberId,
            @PageableDefault(size = 10, /*sort= "views",*/direction = Sort.Direction.DESC) Pageable pageable){
        Page<Member> members = memberService.getFollowList(memberId,pageable);
        List<Member> memberList = members.getContent();

        return new ResponseEntity<>(
                new PageResponse<>(members.getTotalElements(),
                memberMapper.toMemberResponseDtos(memberList)),HttpStatus.OK);
    }

    @GetMapping("/members/following/{member-id}")
    public ResponseEntity<PageResponse<MemberDto.Response>> getFollowingList(
            @PathVariable(name = "member-id")long memberId,
            @PageableDefault(size = 10, /*sort= "views",*/direction = Sort.Direction.DESC) Pageable pageable){
        Page<Member> members = memberService.getFollowingList(memberId,pageable);
        List<Member> memberList = members.getContent();

        return new ResponseEntity<>(
                new PageResponse<>(members.getTotalElements(),
                        memberMapper.toMemberResponseDtos(memberList)),HttpStatus.OK);
    }

    @PostMapping("/members/status/change")
    public ResponseEntity<MemberStatusDto.Response> upExperiencePoint(
            @RequestBody MemberStatusDto.UpStatus upStatus){
        return null;
    }



    /*==========================for Security===============================*/

    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Authorization") String token) {
        long memberId = jwtTokenizer.getMemberId(token);
        String email = memberService.findMember(memberId).getEmail();
        redisDao.deleteValues(email);
        //jwtTokenizer.deleteRtk(memberService.findMember(memberId));
        return ResponseEntity.ok().build();
    }

    // 액세스 토큰 만료시 프론트엔드에서 백엔드로 보내는 요청 (리프레시 토큰을 통한 액세스 토큰 재발급)
    @PostMapping("/reissue")
    @CrossOrigin(allowedHeaders = "m*")
    public ResponseEntity reissue(HttpServletRequest request, HttpServletResponse response) throws JwtException {
        // 로그아웃된 상태라면 401 에러, 로그인 창으로 유도
        Cookie[] cookies = request.getCookies();

        String token = "";
        boolean chk = false;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    token = cookie.getValue();
                    chk = true;
                    break;
                }
            }
            if (!chk) throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN);
        } else {
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }

        // 리프레시 토큰으로부터 memberId 값 파싱
        long memberId;
        try {
            memberId = jwtTokenizer.getMemberIdFromRefresh(token);
        } catch (NullPointerException e) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }
        Member member = memberService.findMember(memberId);


        jwtTokenizer.validRefreshToken(token, member);

        String rtk = redisDao.getValues(member.getEmail());
        System.out.println("RTK :" + rtk);

        if (Objects.isNull(rtk)) {
            throw new JwtException("리프레시 토큰 만료");
        }
        // 정책상 액세스 토큰과 리프레시 토큰 모두를 재발급한다.
        // Rotation Token Rotation
        String reissueRtk = jwtTokenizer.reissueRtk(member);
        String atk = jwtTokenizer.reissueAtk(member);

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + atk);
        Cookie cookie = new Cookie("refreshToken", reissueRtk);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        response.addCookie(cookie);
        response.setHeader("Access-Control-Expose-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        return ResponseEntity.ok().headers(httpHeaders).build();
    }

}
