package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "categories")
@FieldDefaults(level = AccessLevel.PRIVATE)
@SequenceGenerator(name = "category_seq", sequenceName = "category_sequence", allocationSize = 1)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_seq")
    Long id;

    @Column(unique = true)
    @Size(min = 1, max = 20)
    String categoryName;

    @OneToMany(mappedBy = "category")
    Set<BlogPost> blogPosts = new HashSet<>();

}
