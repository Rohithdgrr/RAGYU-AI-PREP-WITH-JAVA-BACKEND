package com.ragyu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResultDto {
    private String mode;
    private Map<String, Object> player1;
    private Map<String, Object> player2;
    private Integer totalQuestions;
    private List<QuestionDto> questions;
    private String exam;
    private String subject;
}
