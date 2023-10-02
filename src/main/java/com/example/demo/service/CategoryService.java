package com.example.demo.service;

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

    public Category createCategory(CategoryDto categoryDto) {
        Category category = new Category();
        category.setCategoryName(categoryDto.getCategoryName());

        return categoryRepository.save(category);
    }

    public Set<BlogPost> getBlogPostsByCategoryId(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + categoryId));
        return category.getBlogPosts();
    }

    public void deleteCategoryById(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new RuntimeException("Delete attempted, category not found with ID: " + categoryId);
        }

        categoryRepository.deleteById(categoryId);
    }

    public Set<Category> getAllCategories() {
       return new HashSet<>(categoryRepository.findAll()) ;
    }
}
