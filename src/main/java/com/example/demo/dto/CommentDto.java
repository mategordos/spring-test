package com.example.demo.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Setter
@Getter
@NoArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentDto {

    Long commentId;
    Long blogPostId;
    String name;
    String content;
    Timestamp date;

}
