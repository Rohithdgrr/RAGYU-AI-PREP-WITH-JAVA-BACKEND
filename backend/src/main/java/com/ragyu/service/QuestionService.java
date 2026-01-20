package com.ragyu.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ragyu.dto.QuestionDto;
import com.ragyu.entity.Question;
import com.ragyu.entity.User;
import com.ragyu.repository.QuestionHistoryRepository;
import com.ragyu.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionHistoryRepository questionHistoryRepository;
    private final ObjectMapper objectMapper;

    public List<QuestionDto> generateQuestions(String exam, String subject, String difficulty, int count, String userId) {
        User user = new User();
        user.setId(1L);
        user.setUserId(userId);
        
        List<String> recentQuestionIds = questionHistoryRepository.findQuestionIdsByUserAfterDate(
                user, LocalDateTime.now().minusDays(7)
        );

        List<Question> questions;
        if ("medium".equals(difficulty)) {
            questions = questionRepository.findRandomQuestionsByExamAndSubject(exam, subject);
        } else {
            questions = questionRepository.findRandomQuestionsByExamSubjectAndDifficulty(exam, subject, difficulty);
        }

        List<Question> filteredQuestions = questions.stream()
                .filter(q -> !recentQuestionIds.contains(q.getQuestionId()))
                .limit(count)
                .collect(Collectors.toList());

        if (filteredQuestions.size() < count) {
            filteredQuestions.addAll(questions.stream()
                    .filter(q -> !filteredQuestions.contains(q))
                    .limit(count - filteredQuestions.size())
                    .collect(Collectors.toList()));
        }

        return filteredQuestions.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public void saveQuestionHistory(String userId, List<String> questionIds) {
        User user = new User();
        user.setId(1L);
        user.setUserId(userId);

        for (String questionId : questionIds) {
            if (questionHistoryRepository.findByUserAndQuestionId(user, questionId).isEmpty()) {
                com.ragyu.entity.QuestionHistory history = new com.ragyu.entity.QuestionHistory();
                history.setUser(user);
                history.setQuestionId(questionId);
                questionHistoryRepository.save(history);
            }
        }
    }

    private QuestionDto convertToDto(Question question) {
        try {
            List<String> options = objectMapper.readValue(question.getOptions(), new TypeReference<List<String>>() {});
            Map<String, Object> explanation = objectMapper.readValue(question.getExplanation(), new TypeReference<Map<String, Object>>() {});
            
            return new QuestionDto(
                    question.getQuestionId(),
                    question.getText(),
                    options,
                    question.getCorrectIndex(),
                    explanation
            );
        } catch (Exception e) {
            throw new RuntimeException("Error converting question to DTO", e);
        }
    }
}
