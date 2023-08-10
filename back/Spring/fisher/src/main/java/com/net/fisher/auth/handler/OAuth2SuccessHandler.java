package com.net.fisher.auth.handler;

import com.net.fisher.auth.jwt.JwtTokenizer;
import com.net.fisher.auth.redis.RedisDao;
import com.net.fisher.member.entity.Member;
import com.net.fisher.member.repository.MemberRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final RedisDao redisDao;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("onAuthenticationSuccess");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        /*System.out.println(authentication.getDetails().getClass());
        System.out.println(authentication.getDetails());
        System.out.println(authentication.getPrincipal().getClass());
        System.out.println(authentication.getPrincipal());
        System.out.println(authentication.getName());
        System.out.println(oAuth2User.toString());*/
        //System.out.println((String) ((Map) oAuth2User.getAttribute("kakao_account")).get("email"));

        // 토큰의 attribute의 id는 계속 같을지도?
        // 카카오는 이메일이 kakao_account -> email 이다.
        // 구글과 카카오를 다르게 처리해야 하는 불편함이 존재
        String email = oAuth2User.getAttribute("email");

        /*if(email == null){
            email = (String) ((Map) oAuth2User.getAttribute("kakao_account")).get("email");
        }*/

        String oauthEmail = email+"@"+oAuth2User.getAttribute("type");
        System.out.println(oauthEmail);

        Member member = memberRepository.findByEmail(oauthEmail).get();

        String accessToken = jwtTokenizer.delegateAccessToken(member);

        String refreshToken = jwtTokenizer.delegateRefreshToken(member);

        redisDao.setValues(member.getEmail(),refreshToken, Duration.ofSeconds(jwtTokenizer.getRefreshTokenExpirationSecs()));

        response.setHeader("Authorization","Bearer "+accessToken);

        Cookie cookie = new Cookie("refreshToken",refreshToken);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        response.addCookie(cookie);
        response.setHeader("Access-Control-Expose-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");


        request.getRequestDispatcher("/api/login/Fsuccess/oauth").forward(request, response);



        /*RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
        redirectStrategy.sendRedirect(request,response,"/");*/
        // 이 방식은 지금 SPA 에서 잘못됨. 기본적으로 핸들링되는 Redirection URL 을 스프링에서 처리하면된다고함. -> 변경완료
    }
}
