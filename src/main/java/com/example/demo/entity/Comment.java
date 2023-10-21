package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "comments")
@FieldDefaults(level = AccessLevel.PRIVATE)
@SequenceGenerator(name = "comm_seq", sequenceName = "comment_sequence", allocationSize = 1)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comm_seq")
    Long id;

    String content;

    @ManyToOne
    User commenter;

    @ManyToOne
    BlogPost blogPost;

    Timestamp creationDate = new Timestamp(System.currentTimeMillis());


}
