package com.ragyu.controller;

import com.ragyu.dto.QuestionDto;
import com.ragyu.dto.QuizConfigDto;
import com.ragyu.dto.QuizResultDto;
import com.ragyu.security.JwtUtil;
import com.ragyu.service.QuizService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizService quizService;
    private final JwtUtil jwtUtil;

    @PostMapping("/start")
    public ResponseEntity<List<QuestionDto>> startQuiz(
            @Valid @RequestBody QuizConfigDto config,
            @RequestHeader("Authorization") String authHeader) {
        
        String token = authHeader.substring(7);
        String userId = jwtUtil.extractUserId(token);
        
        List<QuestionDto> questions = quizService.startQuiz(config, userId);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/result")
    public ResponseEntity<?> saveResult(
            @Valid @RequestBody QuizResultDto result,
            @RequestHeader("Authorization") String authHeader) {
        
        String token = authHeader.substring(7);
        String userId = jwtUtil.extractUserId(token);
        
        quizService.saveQuizResult(result, userId);
        return ResponseEntity.ok().build();
    }
}
