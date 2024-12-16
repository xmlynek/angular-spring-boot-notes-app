package com.filip.demo.notesappservice;

import com.filip.demo.notesappservice.config.properties.CorsConfigurationProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({CorsConfigurationProperties.class})
public class NotesAppServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotesAppServiceApplication.class, args);
	}

}
