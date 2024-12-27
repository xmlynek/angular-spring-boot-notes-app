package com.filip.demo.notesappservice.service;

import java.util.UUID;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class UserProvider {

  public UUID getUserId() {
    return UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
  }
}
