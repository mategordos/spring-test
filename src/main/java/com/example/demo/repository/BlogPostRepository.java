package com.example.demo.repository;

import com.example.demo.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

    Set<BlogPost> findByAuthorEmail(String authorEmail);

    @Query("SELECT bp FROM BlogPost bp WHERE LOWER(bp.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Set<BlogPost> searchByTitleIgnoreCase(@Param("keyword") String keyword);

    void deleteByCategoryId(Long categoryId);
}
