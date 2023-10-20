package com.example.demo.service;

import com.example.demo.dto.BlogPostDto;
import com.example.demo.entity.BlogPost;
import com.example.demo.entity.Category;
import com.example.demo.repository.BlogPostRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
public class BlogPostService {

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;


    public BlogPostDto findBlogPostById(Long blogPostId) {
        BlogPost blogPost = blogPostRepository.findById(blogPostId)
                .orElseThrow(() -> new RuntimeException("BlogPost not found with ID: " + blogPostId));
        BlogPostDto blogPostDto = new BlogPostDto();
        blogPostDto.setBlogPostId(blogPost.getId());
        blogPostDto.setCategoryId(blogPost.getCategory().getId());
        blogPostDto.setTitle(blogPost.getTitle());
        blogPostDto.setAuthorName(blogPost.getAuthor().getName());
        blogPostDto.setLastUpdated(blogPost.getLastUpdated());

        return blogPostDto;
    }

    public Set<BlogPostDto> findAllBlogPosts() {
        Set<BlogPostDto> blogPostDtos = new HashSet<>();
        Set<BlogPost> blogPosts = new HashSet<>(blogPostRepository.findAll());

        for (BlogPost blogPost : blogPosts) {
            BlogPostDto blogPostDto = new BlogPostDto();
            blogPostDto.setBlogPostId(blogPost.getId());
            blogPostDto.setCategoryId(blogPost.getCategory().getId());
            blogPostDto.setTitle(blogPost.getTitle());
            blogPostDto.setAuthorName(blogPost.getAuthor().getName());
            blogPostDto.setLastUpdated(blogPost.getLastUpdated());
            blogPostDtos.add(blogPostDto);
        }

        return blogPostDtos;
    }


    public BlogPostDto createBlogPost(BlogPostDto blogPostDto) {
        BlogPost blogPost = new BlogPost();
        Category category = categoryRepository.findById(blogPostDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with ID"));
        blogPost.setTitle(blogPostDto.getTitle());
        blogPost.setCategory(category);
        blogPost.setAuthor(userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found")));

        blogPostRepository.save(blogPost);
        log.info("Blogpost id"+blogPost.getId());
        return blogPostDto;
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


    public void deleteBlogPostById(Long blogPostId) {
        if (!blogPostRepository.existsById(blogPostId)) {
            throw new RuntimeException("Delete attempted, blogPost not found with ID: " + blogPostId);
        }
        blogPostRepository.deleteById(blogPostId);
    }


    public Set<BlogPostDto> findBlogPostsByAuthor(String email) {
        Set<BlogPostDto> blogPostDtos = new HashSet<>();
        Set<BlogPost> blogPosts = blogPostRepository.findByAuthorEmail(email);

        for (BlogPost blogPost : blogPosts) {
            BlogPostDto blogPostDto = new BlogPostDto();
            blogPostDto.setBlogPostId(blogPost.getId());
            blogPostDto.setCategoryId(blogPost.getCategory().getId());
            blogPostDto.setTitle(blogPost.getTitle());
            blogPostDto.setAuthorName(blogPost.getAuthor().getName());
            blogPostDto.setLastUpdated(blogPost.getLastUpdated());
            blogPostDtos.add(blogPostDto);
        }

        return blogPostDtos;
    }
}
