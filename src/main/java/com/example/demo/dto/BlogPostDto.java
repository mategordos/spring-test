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

    private Long categoryId;
    @Override
    public String toString() {
        return "BlogPostDto{" +
                ", title='" + title + '\'' +
                ", categoryId=" + categoryId +
                '}';
    }
}
