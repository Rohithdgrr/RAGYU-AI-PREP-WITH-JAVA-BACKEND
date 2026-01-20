package com.ragyu.service;

import com.ragyu.dto.LoginRequest;
import com.ragyu.dto.UserDto;
import com.ragyu.entity.User;
import com.ragyu.repository.UserRepository;
import com.ragyu.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserDto login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseGet(() -> createNewUser(request));
        
        String token = jwtUtil.generateToken(user.getUserId(), user.getEmail(), user.getName(), user.getIsGuest());
        
        return new UserDto(user.getUserId(), user.getName(), user.getEmail(), user.getIsGuest(), user.getTheme());
    }

    public UserDto getUserByUserId(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDto(user.getUserId(), user.getName(), user.getEmail(), user.getIsGuest(), user.getTheme());
    }

    private User createNewUser(LoginRequest request) {
        User user = new User();
        user.setUserId(UUID.randomUUID().toString());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setIsGuest(false);
        user.setTheme("light");
        user.setPreferredExams("[]");
        user.setPreferredSubjects("[]");
        user.setPreferredTopics("[]");
        return userRepository.save(user);
    }

    public UserDto createGuestUser() {
        User user = new User();
        user.setUserId(UUID.randomUUID().toString());
        user.setName("Guest");
        user.setEmail(null);
        user.setIsGuest(true);
        user.setTheme("light");
        user.setPreferredExams("[]");
        user.setPreferredSubjects("[]");
        user.setPreferredTopics("[]");
        user = userRepository.save(user);
        
        return new UserDto(user.getUserId(), user.getName(), user.getEmail(), user.getIsGuest(), user.getTheme());
    }
}
