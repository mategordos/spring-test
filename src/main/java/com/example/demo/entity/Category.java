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
public class Category {


    private @Id
    @GeneratedValue Long id;

    @Column(unique = true)
    public String categoryName;

    @ManyToMany
    public Set<BlogPost> blogPosts = new HashSet<>();
}
