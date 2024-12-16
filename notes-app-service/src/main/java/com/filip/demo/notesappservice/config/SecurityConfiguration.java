package com.filip.demo.notesappservice.config;

import com.filip.demo.notesappservice.config.properties.CorsConfigurationProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final OAuth2ResourceServerProperties oAuth2ResourceServerProperties;
  private final CorsConfigurationProperties corsConfigurationProperties;

  @Bean
  public JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.withIssuerLocation(
        oAuth2ResourceServerProperties.getJwt().getIssuerUri()).build();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http, HandlerMappingIntrospector introspector)
      throws Exception {
    MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);

    http.authorizeHttpRequests(auth -> auth
        .requestMatchers(
            mvcMatcherBuilder.pattern("/swagger-ui.html"),
            mvcMatcherBuilder.pattern("/swagger-ui/**"),
            mvcMatcherBuilder.pattern("/favicon.ico"),
            mvcMatcherBuilder.pattern("/webjars/**"),
            mvcMatcherBuilder.pattern("/actuator/**"),
            mvcMatcherBuilder.pattern("/actuator"),
            mvcMatcherBuilder.pattern("/csrf"),
            mvcMatcherBuilder.pattern("/v3/api-docs"),
            mvcMatcherBuilder.pattern("/v3/api-docs/swagger-config"),
            mvcMatcherBuilder.pattern("/swagger-resources/**")
        ).permitAll()
        .anyRequest().authenticated()
    );

    http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(
        SessionCreationPolicy.STATELESS));

    http.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.decoder(jwtDecoder())));

    http.csrf(AbstractHttpConfigurer::disable);

    http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

    return http.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(corsConfigurationProperties.allowedOrigins());
    configuration.setAllowedMethods(corsConfigurationProperties.allowedMethods());
    configuration.setAllowedHeaders(corsConfigurationProperties.allowedHeaders());
    configuration.setAllowCredentials(corsConfigurationProperties.allowCredentials());
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

}
