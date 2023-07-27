package com.net.fisher.auth.oauth;

import com.net.fisher.auth.dto.OAuthAttributes;
import com.net.fisher.auth.utils.CustomAuthorityUtils;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.entity.MemberImage;
import com.net.fisher.member.repository.MemberImageRepository;
import com.net.fisher.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User>  {

    private final MemberRepository memberRepository;
    private final MemberImageRepository memberImageRepository;
    private final CustomAuthorityUtils customAuthorityUtils;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest
                .getClientRegistration()
                .getRegistrationId();

//        System.out.println("registrationId : " + registrationId);

        String userNameAttributeName = userRequest
                .getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName,oAuth2User.getAttributes());

        //System.out.println("email:"+attributes.getEmail());
        //System.out.println(attributes.getName());

        Member member = saveOrUpdate(attributes);

        /*httpSession.setAttribute("user", new SessionUser(user));*/
        System.out.println("Attributes : " + attributes.toString());

        List<GrantedAuthority> authorities = customAuthorityUtils.createAuthorities(member.getEmail());
        System.out.println("loadUser");
        return new DefaultOAuth2User(
                authorities,
                attributes.getAttributes(),
                attributes.getNameAttributeKey());

    }
    private Member saveOrUpdate(OAuthAttributes attributes) {
        Member member = null;

        String oauthEmail = attributes.getEmail()+"@"+attributes.getAttributes().get("type");
        System.out.println("code:"+oauthEmail);

        Optional<Member> optionalMember = memberRepository.findByEmail(oauthEmail)
                .map(entity -> entity.update(attributes.getName(), oauthEmail));

        member = optionalMember.orElseGet(() -> process(attributes));
                //.orElse(process(attributes));

        return memberRepository.save(member);
    }
    private Member process(OAuthAttributes attributes){
        System.out.println("새로운 로그인?");
        Member member = attributes.toEntity();
        List<String> roles = customAuthorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        member.setMemberImage(saveImage(attributes.getPicture()));
        return
                member;
    }
    private MemberImage saveImage(String url){
        MemberImage memberImage = new MemberImage();
        memberImage.setFileUrl(url);
        return
                memberImageRepository.save(memberImage);
    }
}
