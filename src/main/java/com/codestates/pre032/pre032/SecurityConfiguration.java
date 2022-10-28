package com.codestates.pre032.pre032;

import com.codestates.pre032.pre032.test.CustomSecurityFilter;
import com.codestates.pre032.pre032.test.JwtTokenizer;
import com.codestates.pre032.pre032.test.LoginFailureHandler;
import com.codestates.pre032.pre032.test.LoginSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //동일 출처로부터 들어오는 request만 페이지 렌더링을 허용
                .headers().frameOptions().sameOrigin()
                .and()
                // 현재 : csrf 공격에 대한 설정 비활성화
                .csrf().disable()
                // cors를 허용하는 기본 설정으로 적용
                .cors(withDefaults())
                // 로그인 설정
                .formLogin()
                //로그인양식 완성되면 disable 하기
                .disable()
//                .loginPage("/users/login-form")
//                .loginProcessingUrl("/users/login")
//                .loginProcessingUrl("/process_login")
//                .failureUrl("로그인 실패시 url")
//                .exceptionHandling().accessDeniedPage("/users/access-denied")
//                .and()
                // 로그아웃 설정
                .logout()
                .logoutUrl("/users/logout")
                .logoutSuccessUrl("/")
                .and()
                // 우리 학습과정에선 배우지 않은 내용 : 그냥 diable 하자
                .httpBasic().disable()
                // 필터 적용
                .apply(new CustomFilterConfigure())
                .and()
                .authorizeHttpRequests(authorize -> authorize
//                         권한 설정
                        .anyRequest().permitAll()
                )
        ;

        return http.build();
    }

    public class CustomFilterConfigure extends AbstractHttpConfigurer<CustomFilterConfigure, HttpSecurity> {  // (2-1)
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // (2-2)
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)

            CustomSecurityFilter jwtAuthenticationFilter = new CustomSecurityFilter(authenticationManager, jwtTokenizer);  // (2-4)
            jwtAuthenticationFilter.setFilterProcessesUrl("/users/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new LoginSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new LoginFailureHandler());
            builder.addFilter(jwtAuthenticationFilter);  // (2-6)
        }
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // 모든 출처에 대해 스크립트기반의 HTTP 통신을 허용
        configuration.setAllowedOrigins(Arrays.asList("*"));
        // 파라미터로 지정한 HTTP Method에 대한 HTTP 통신을 허용
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 패턴에 해당하는 URL에 해당 CORS 정책을 적용한다.
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
