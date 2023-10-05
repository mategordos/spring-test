package com.example.demo.service;

import com.example.demo.dto.BlogPostDto;
import com.example.demo.entity.BlogPost;
import com.example.demo.entity.Category;
import com.example.demo.repository.BlogPostRepository;
import com.example.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Service
public class BlogPostService {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Autowired
    private CategoryRepository categoryRepository;

//done
    public BlogPostDto findBlogPostById(Long blogPostId) {
        BlogPost blogPost = blogPostRepository.findById(blogPostId)
                .orElseThrow(() -> new RuntimeException("BlogPost not found with ID: " + blogPostId));
        BlogPostDto blogPostDto = new BlogPostDto();
        blogPostDto.setTitle(blogPost.getTitle());
        blogPostDto.setCategoryId(blogPost.getCategory().getId());

        return blogPostDto;
    }

    public Set<BlogPostDto> findAllBlogPosts() {
        Set<BlogPostDto> blogPostDtos = new HashSet<>();
        Set<BlogPost> blogPosts = new HashSet<>(blogPostRepository.findAll());

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

    //done
    public Long createBlogPost(BlogPostDto blogPostDto) {
        BlogPost blogPost = new BlogPost();
        Category category = categoryRepository.findById(blogPostDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with ID"));
        blogPost.setTitle(blogPostDto.getTitle());
        blogPost.setCategory(category);
        blogPostRepository.save(blogPost);
        return blogPost.getId();
    }

    public BlogPostDto updateBlogPost(Long blogPostId, BlogPostDto updatedBlogPostDto) {
        BlogPost existingBlogPost = blogPostRepository.findById(blogPostId)
                .orElseThrow(() -> new RuntimeException("Blogpost not found with id: "+ blogPostId));
        Category category = categoryRepository.findById(updatedBlogPostDto.getCategoryId())
                        .orElseThrow(()-> new RuntimeException("Category not found with id: "+ updatedBlogPostDto.getCategoryId()));
        existingBlogPost.setTitle(updatedBlogPostDto.getTitle());
        existingBlogPost.setCategory(category);
        existingBlogPost.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        blogPostRepository.save(existingBlogPost);
        return updatedBlogPostDto;
    }


    //done
    public void deleteBlogPostById(Long blogPostId) {
        if (!blogPostRepository.existsById(blogPostId)) {
            throw new RuntimeException("Delete attempted, blogPost not found with ID: " + blogPostId);
        }
        blogPostRepository.deleteById(blogPostId);
    }
}
