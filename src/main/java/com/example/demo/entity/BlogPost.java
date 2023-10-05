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
    private Long id;

    private String title;


    @ManyToOne
    private Category category;

    private Timestamp creationDate = new Timestamp(System.currentTimeMillis());

    private Timestamp lastUpdated = new Timestamp(System.currentTimeMillis());

    private int score = 0;





}
