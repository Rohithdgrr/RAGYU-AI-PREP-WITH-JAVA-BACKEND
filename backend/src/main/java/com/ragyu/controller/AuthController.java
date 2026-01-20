package com.ragyu.controller;

import com.ragyu.dto.LoginRequest;
import com.ragyu.dto.UserDto;
import com.ragyu.security.JwtUtil;
import com.ragyu.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        UserDto user = userService.login(request);
        String token = jwtUtil.generateToken(user.getUserId(), user.getEmail(), user.getName(), user.getIsGuest());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/guest")
    public ResponseEntity<?> createGuest() {
        UserDto user = userService.createGuestUser();
        String token = jwtUtil.generateToken(user.getUserId(), user.getEmail(), user.getName(), user.getIsGuest());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        
        return ResponseEntity.ok(response);
    }
}
