package com.example.demo.dto;

import com.example.demo.entity.Category;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
public class BlogPostDto {

    private String title;

    private Set<Category> categories;

    private Timestamp lastUpdated;

    @Override
    public String toString() {
        return "BlogPostDto{" +
                ", title='" + title + '\'' +
                ", categories=" + categories +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
}
