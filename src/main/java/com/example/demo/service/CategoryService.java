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
        categoryDto.setCategoryName(category.categoryName);
        categoryDto.setId(category.getId());
        return categoryDto;
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
