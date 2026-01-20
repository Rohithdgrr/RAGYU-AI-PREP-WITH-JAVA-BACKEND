package com.ragyu.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizConfigDto {
    @NotBlank(message = "Exam is required")
    private String exam;
    
    @NotBlank(message = "Subject is required")
    private String subject;
    
    private List<String> topics;
    
    @NotNull(message = "Question count is required")
    @Min(value = 1, message = "At least 1 question is required")
    private Integer questionCount;
    
    @NotBlank(message = "Difficulty is required")
    private String difficulty;
    
    @NotBlank(message = "Mode is required")
    private String mode;
    
    private String player1Name;
    private String player2Name;
}
