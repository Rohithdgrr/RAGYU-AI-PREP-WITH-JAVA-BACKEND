package com.ragyu.repository;

import com.ragyu.entity.QuizResult;
import com.ragyu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByUserOrderByCreatedAtDesc(User user);
    
    @Query("SELECT qr FROM QuizResult qr WHERE qr.user = :user AND qr.createdAt > :since ORDER BY qr.createdAt DESC")
    List<QuizResult> findRecentResultsByUser(@Param("user") User user, @Param("since") LocalDateTime since);
    
    @Query("SELECT COUNT(qr) FROM QuizResult qr WHERE qr.user = :user AND qr.exam = :exam")
    Long countByUserAndExam(@Param("user") User user, @Param("exam") String exam);
}
