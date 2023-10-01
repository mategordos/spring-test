package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Timestamp;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "blogposts")
public class BlogPost {

    private @Id
    @GeneratedValue Long blogPostId;

    private String title;

    @ManyToMany
    private Set<Category> categories;

    private Timestamp creationDate = new Timestamp(System.currentTimeMillis());

    private Timestamp lastUpdated = new Timestamp(System.currentTimeMillis());

    private int score = 0;





}
