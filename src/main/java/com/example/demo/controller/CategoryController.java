package com.example.demo.controller;

import com.example.demo.dto.CategoryDto;
import com.example.demo.entity.BlogPost;
import com.example.demo.entity.Category;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<Category> createBlogPost(@RequestBody CategoryDto categoryDto) {
        Category createdCategory = categoryService.createCategory(categoryDto);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/{categoryId}/blogposts")
    public ResponseEntity<Set<BlogPost>> getBlogPostsByCategory(@PathVariable Long categoryId) {
        Set<BlogPost> blogPosts = categoryService.getBlogPostsByCategoryId(categoryId);
        return ResponseEntity.ok(blogPosts);
    }

    @GetMapping
    public ResponseEntity<Set<Category>> getAllCategories() {
        Set<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable Long categoryId) {
        categoryService.deleteCategoryById(categoryId);
        return ResponseEntity.ok("Category deleted: " + categoryId);
    }
}
