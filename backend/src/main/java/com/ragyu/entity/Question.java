package com.ragyu.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String questionId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(nullable = false, columnDefinition = "jsonb")
    private String options;

    @Column(nullable = false)
    private Integer correctIndex;

    @Column(nullable = false, columnDefinition = "jsonb")
    private String explanation;

    @Column(nullable = false)
    private String exam;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String topics;

    @Column(nullable = false)
    private String difficulty;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
