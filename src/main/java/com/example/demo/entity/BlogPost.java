package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "blogposts")
@FieldDefaults(level = AccessLevel.PRIVATE)
@SequenceGenerator(name = "blogpost_seq", sequenceName = "blogpost_sequence", allocationSize = 1)
public class BlogPost {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "blogpost_seq")
    Long id;

    String title;

    @ManyToOne
    User author;

    @ManyToOne
    Category category;

    Timestamp creationDate = new Timestamp(System.currentTimeMillis());

    Timestamp lastUpdated = new Timestamp(System.currentTimeMillis());

    @ManyToMany(fetch = FetchType.EAGER , cascade = CascadeType.ALL)
    Set<User> upvotedBy;

    @OneToMany(mappedBy = "blogPost")
    Set<Comment> comments;

}
