package com.ragyu.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ragyu.dto.ChatRequest;
import com.ragyu.dto.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    private static final String LIBRA_SYSTEM_PROMPT = """
            You are Libra, the specialized AI assistant for RAGYU, an Indian government job preparation platform.
            Your goal is to help students with Railway and Bank exams.

            SPECIAL FORMATTING RULES:
            1. Use **bold** for key concepts.
            2. Use *italics* for emphasis.
            3. Use <u>underlined</u> for critical warnings.
            4. Use Color-coded text:
               - Blue: For questions and helpful prompts. Wrap in [BLUE]...[/BLUE].
               - Green: For correct answers and positive reinforcement. Wrap in [GREEN]...[/GREEN].
               - Red: For warnings and incorrect info. Wrap in [RED]...[/RED].
               - Orange: For tips and shortcuts. Wrap in [ORANGE]...[/ORANGE].
            5. Use LaTeX for math: $inline$ and $$display$$.
            6. Use tables for comparisons.
            7. Provide step-by-step explanations for quantitative problems.
            8. Be professional, encouraging, and mentor-like.
            """;

    public AIService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public ChatResponse chat(ChatRequest request) {
        try {
            Map<String, Object> requestBody = new HashMap<>();
            List<Map<String, String>> contents = new ArrayList<>();
            
            Map<String, String> systemMessage = new HashMap<>();
            systemMessage.put("role", "user");
            systemMessage.put("parts", LIBRA_SYSTEM_PROMPT + "\n\nUser: " + request.getMessage());
            contents.add(systemMessage);
            
            requestBody.put("contents", contents);
            requestBody.put("generationConfig", Map.of(
                    "temperature", 0.7,
                    "maxOutputTokens", 1024
            ));

            String response = webClient.post()
                    .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + geminiApiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode root = objectMapper.readTree(response);
            String content = root.path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text")
                    .asText();

            return new ChatResponse("assistant", content);
        } catch (Exception e) {
            throw new RuntimeException("Error calling AI service", e);
        }
    }
}
