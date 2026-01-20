package com.ragyu.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String mode;

    @Column(nullable = false, columnDefinition = "jsonb")
    private String player1Result;

    @Column(columnDefinition = "jsonb")
    private String player2Result;

    @Column(nullable = false)
    private Integer totalQuestions;

    @Column(nullable = false, columnDefinition = "jsonb")
    private String questions;

    @Column(nullable = false)
    private String exam;

    @Column(nullable = false)
    private String subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
