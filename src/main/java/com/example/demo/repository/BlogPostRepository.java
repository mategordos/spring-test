package com.example.demo.repository;

import com.example.demo.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

    Set<BlogPost> findByAuthorEmail(String authorEmail);
}
