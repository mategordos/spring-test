package com.example.demo.dto;

import com.example.demo.entity.Category;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;


@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogPostDto {

    String title;

    Long categoryId;

    @Override
    public String toString() {
        return "BlogPostDto{" +
                ", title='" + title + '\'' +
                ", categoryId=" + categoryId +
                '}';
    }
}
