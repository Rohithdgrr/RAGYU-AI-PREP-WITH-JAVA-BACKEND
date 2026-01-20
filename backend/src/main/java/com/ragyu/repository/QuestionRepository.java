package com.ragyu.repository;

import com.ragyu.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findByQuestionId(String questionId);
    
    @Query("SELECT q FROM Question q WHERE q.exam = :exam AND q.subject = :subject AND q.difficulty = :difficulty ORDER BY RANDOM()")
    List<Question> findRandomQuestionsByExamSubjectAndDifficulty(
        @Param("exam") String exam,
        @Param("subject") String subject,
        @Param("difficulty") String difficulty
    );
    
    @Query("SELECT q FROM Question q WHERE q.exam = :exam AND q.subject = :subject ORDER BY RANDOM()")
    List<Question> findRandomQuestionsByExamAndSubject(
        @Param("exam") String exam,
        @Param("subject") String subject
    );
}
