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
@SequenceGenerator(name = "blogpost_seq", sequenceName = "blogpost_sequence", allocationSize = 1)
public class BlogPost {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "blogpost_seq")
    private Long blogPostId;

    private String title;


    @ManyToMany
    @JoinTable(
            name = "blogpost_categories",
            joinColumns = @JoinColumn(name = "blogpost_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories;

    private Timestamp creationDate = new Timestamp(System.currentTimeMillis());

    private Timestamp lastUpdated = new Timestamp(System.currentTimeMillis());

    private int score = 0;





}
