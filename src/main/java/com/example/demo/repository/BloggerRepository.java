package com.example.demo.repository;

import com.example.demo.Blogger;
import org.springframework.data.jpa.repository.JpaRepository;
public interface BloggerRepository extends JpaRepository<Blogger, Long> {
}
