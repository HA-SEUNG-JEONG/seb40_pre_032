package com.codestates.pre032.pre032.security.Dto;

import com.codestates.pre032.pre032.security.Services.JwtTokenizer;
import com.codestates.pre032.pre032.test.LoginDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

public class SecurityUser implements UserDetails
{
    private User user;

    public SecurityUser(User user) {
        this.user = user;
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(
                );
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

    public static class CustomSecurityFilter extends UsernamePasswordAuthenticationFilter {
        private final AuthenticationManager authenticationManager;
        private final JwtTokenizer jwtTokenizer;

        public CustomSecurityFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
            this.authenticationManager = authenticationManager;
            this.jwtTokenizer = jwtTokenizer;
        }

        @SneakyThrows
        @Override
        public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

            //로그인 dto를 역직렬화
            ObjectMapper objectMapper = new ObjectMapper();
            com.codestates.pre032.pre032.test.LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

            // 이메일과 비번을 포함한 토큰 생성
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

            return authenticationManager.authenticate(authenticationToken);
        }

        @Override
        protected void successfulAuthentication(HttpServletRequest request,
                                                HttpServletResponse response,
                                                FilterChain chain,
                                                Authentication authResult) throws ServletException, IOException {
            // principal로부터 User정보 호출
            com.codestates.pre032.pre032.user.User user = (com.codestates.pre032.pre032.user.User) authResult.getPrincipal();

            // 토큰 생성
            String accessToken = delegateAccessToken(user);

            response.setHeader("AccessToken", "Bearer " + accessToken);

            this.getSuccessHandler().onAuthenticationSuccess(request,response,authResult);
        }

        // 엑세스토큰 생성 로직
        private String delegateAccessToken(com.codestates.pre032.pre032.user.User user) {
            Map<String, Object> claims = new HashMap<>();
            claims.put("username", user.getEmail());
            claims.put("userId",user.getUserId());

            String subject = user.getEmail();
            Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

            String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

            return accessToken;
        }
    }
}
