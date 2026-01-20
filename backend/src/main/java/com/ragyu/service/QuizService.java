package com.ragyu.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ragyu.dto.QuestionDto;
import com.ragyu.dto.QuizConfigDto;
import com.ragyu.dto.QuizResultDto;
import com.ragyu.entity.QuizResult;
import com.ragyu.entity.Question;
import com.ragyu.entity.User;
import com.ragyu.repository.QuizResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizResultRepository quizResultRepository;
    private final QuestionService questionService;
    private final ObjectMapper objectMapper;

    public List<QuestionDto> startQuiz(QuizConfigDto config, String userId) {
        return questionService.generateQuestions(
                config.getExam(),
                config.getSubject(),
                config.getDifficulty(),
                config.getQuestionCount(),
                userId
        );
    }

    public void saveQuizResult(QuizResultDto resultDto, String userId) {
        try {
            User user = new User();
            user.setId(1L);
            user.setUserId(userId);

            QuizResult result = new QuizResult();
            result.setMode(resultDto.getMode());
            result.setPlayer1Result(objectMapper.writeValueAsString(resultDto.getPlayer1()));
            result.setPlayer2Result(resultDto.getPlayer2() != null ? objectMapper.writeValueAsString(resultDto.getPlayer2()) : null);
            result.setTotalQuestions(resultDto.getTotalQuestions());
            result.setQuestions(objectMapper.writeValueAsString(resultDto.getQuestions()));
            result.setExam(resultDto.getExam());
            result.setSubject(resultDto.getSubject());
            result.setUser(user);

            quizResultRepository.save(result);

            List<String> questionIds = resultDto.getQuestions().stream()
                    .map(QuestionDto::getId)
                    .toList();
            questionService.saveQuestionHistory(userId, questionIds);
        } catch (Exception e) {
            throw new RuntimeException("Error saving quiz result", e);
        }
    }
}
