package com.filip.demo.notesappservice.config.properties;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("cors.config")
public record CorsConfigurationProperties(List<String> allowedOrigins, List<String> allowedMethods,
                                          List<String> allowedHeaders, boolean allowCredentials) {

}
