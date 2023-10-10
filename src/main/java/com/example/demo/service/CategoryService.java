package com.example.demo.service;

import com.example.demo.dto.BlogPostDto;
import com.example.demo.dto.CategoryDto;
import com.example.demo.entity.BlogPost;
import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;


    //done
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category = new Category();
        category.setCategoryName(categoryDto.getCategoryName());
        categoryRepository.save(category);
        return categoryDto;
    }

    public CategoryDto getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: "+ categoryId));
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCategoryName(category.getCategoryName());
        categoryDto.setId(category.getId());
        return categoryDto;
    }

    public Set<BlogPostDto> getBlogPostsByCategoryId(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + categoryId));
        Set<BlogPost> blogPosts = new HashSet<>(category.getBlogPosts());
        Set<BlogPostDto> blogPostDtos = new HashSet<>();
        for (BlogPost blogPost : blogPosts) {
            BlogPostDto blogPostDto = new BlogPostDto();
            blogPostDto.setCategoryId(blogPost.getCategory().getId());
            blogPostDto.setTitle(blogPost.getTitle());
            // Set other properties of BlogPostDto as needed

            // Add the BlogPostDto to the set
            blogPostDtos.add(blogPostDto);
        }

        return blogPostDtos;
    }

    public void deleteCategoryById(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new RuntimeException("Delete attempted, category not found with ID: " + categoryId);
        }

        categoryRepository.deleteById(categoryId);
    }

    public Set<CategoryDto> getAllCategories() {
        Set<CategoryDto> categoryDtos = new HashSet<>();
        Set<Category> categories = new HashSet<>(categoryRepository.findAll());

        for (Category category : categories) {
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setId(category.getId());
            categoryDto.setCategoryName(category.getCategoryName());
            // Set other properties of BlogPostDto as needed

            // Add the BlogPostDto to the set
            categoryDtos.add(categoryDto);
        }

        return categoryDtos;
    }
}
