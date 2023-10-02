package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "categories")
@SequenceGenerator(name = "category_seq", sequenceName = "category_sequence", allocationSize = 1)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_seq")
    private  Long id;

    @Column(unique = true)
    public String categoryName;

    @ManyToMany
    public Set<BlogPost> blogPosts = new HashSet<>();
}
