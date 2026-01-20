package com.ragyu.repository;

import com.ragyu.entity.QuestionHistory;
import com.ragyu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionHistoryRepository extends JpaRepository<QuestionHistory, Long> {
    Optional<QuestionHistory> findByUserAndQuestionId(User user, String questionId);
    
    @Query("SELECT qh.questionId FROM QuestionHistory qh WHERE qh.user = :user AND qh.createdAt > :since")
    List<String> findQuestionIdsByUserAfterDate(@Param("user") User user, @Param("since") LocalDateTime since);
    
    void deleteByUser(User user);
}
