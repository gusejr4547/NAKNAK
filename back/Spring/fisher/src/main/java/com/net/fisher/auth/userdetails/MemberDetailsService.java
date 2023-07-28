package com.net.fisher.auth.userdetails;

import com.net.fisher.auth.utils.CustomAuthorityUtils;
import com.net.fisher.exception.BusinessLogicException;
import com.net.fisher.exception.ExceptionCode;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(
                ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);

    }

    //    데이터베이스에서 조회한 회원 정보를 Spring Security 의 User 정보로
//    변환하는 과정과 Member 의 권한 정보를 생성하는 과정을 캡슐화
    private final class MemberDetails extends Member implements UserDetails {
        MemberDetails(Member member) {
            setMemberId(member.getMemberId());
            setAddress1(member.getAddress1());
            setAddress2(member.getAddress2());
            setMemberImage(member.getMemberImage());
            setRegisteredAt(member.getRegisteredAt());
            setNickname(member.getNickname());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setName(member.getName());
            setRoles(member.getRoles());
        }
        // TODO

        //        데이터베이스에서 조회한 회원의 이메일 정보를 이용해 Role 기반의 권한 정보 컬렉션을 생성
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
