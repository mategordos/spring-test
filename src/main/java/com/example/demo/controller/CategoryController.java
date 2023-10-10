package com.example.demo.controller;

import com.example.demo.dto.BlogPostDto;
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


    //done
    @PostMapping("")
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) {
        CategoryDto createdCategoryDto = categoryService.createCategory(categoryDto);
        return new ResponseEntity<>(createdCategoryDto, HttpStatus.CREATED);
    }


    //done
    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long categoryId){
        CategoryDto categoryDto = categoryService.getCategoryById(categoryId);
        return ResponseEntity.ok(categoryDto);

    }

    //done
    @GetMapping("/{categoryId}/blogposts")
    public ResponseEntity<Set<BlogPostDto>> getBlogPostsByCategory(@PathVariable Long categoryId) {
        Set<BlogPostDto> blogPosts = categoryService.getBlogPostsByCategoryId(categoryId);
        return ResponseEntity.ok(blogPosts);
    }


    //done
    @GetMapping("")
    public ResponseEntity<Set<CategoryDto>> getAllCategories() {
        Set<CategoryDto> categoryDtos = categoryService.getAllCategories();
        return ResponseEntity.ok(categoryDtos);
    }


    //done?
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable Long categoryId) {
        categoryService.deleteCategoryById(categoryId);
        return ResponseEntity.ok("Category deleted: " + categoryId);
    }
}
