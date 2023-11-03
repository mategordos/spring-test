package com.example.demo.dto;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;


@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogPostDto {

    String title;

    Long blogPostId;

    Long categoryId;

    String contentFileName;

    int score;

    int numberOfComments;

    String authorName;

    Timestamp lastUpdated;

    @Override
    public String toString() {
        return "BlogPostDto{" +
                ", title='" + title + '\'' +
                ", blogPostId=" + blogPostId +
                ", categoryId=" + categoryId +
                ", authorName=" + authorName +
                ", lastUpdated=" + lastUpdated +
                ", contentFileName=" + contentFileName +
                ", score=" + score +
                ", numberOfComments=" + numberOfComments +
//                ", authorId=" + authorId +

                '}';
    }
}
