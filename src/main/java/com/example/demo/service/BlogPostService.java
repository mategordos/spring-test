package com.example.demo.service;

import com.example.demo.dto.BlogPostDto;
import com.example.demo.entity.BlogPost;
import com.example.demo.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Service
public class BlogPostService {

    @Autowired
    private BlogPostRepository blogPostRepository;

//    @Autowired
//    private CategoryRepository categoryRepository;


    public BlogPost findBlogPostById(Long blogPostId) {
        return blogPostRepository.findById(blogPostId)
                .orElseThrow(() -> new RuntimeException("BlogPost not found with ID: " + blogPostId));
    }

    public Set<BlogPost> findAllBlogPosts(){
        return new HashSet<>(blogPostRepository.findAll());
    }
    public BlogPost createBlogPost(BlogPostDto blogPostDto) {
        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(blogPostDto.getTitle());
        blogPost.setCategories(blogPostDto.getCategories());

        return blogPostRepository.save(blogPost);
    }
    public BlogPost updateBlogPost(Long blogPostId, BlogPostDto updatedBlogPostDto) {
        BlogPost existingBlogPost = findBlogPostById(blogPostId);
        existingBlogPost.setTitle(updatedBlogPostDto.getTitle());
        existingBlogPost.setCategories(updatedBlogPostDto.getCategories());
        existingBlogPost.setLastUpdated(new Timestamp(System.currentTimeMillis()));
        return blogPostRepository.save(existingBlogPost);
    }

        public void deleteBlogPostById(Long blogPostId) {
            if (!blogPostRepository.existsById(blogPostId)) {
                throw new RuntimeException("Delete attempted, blogPost not found with ID: " + blogPostId);
            }

            blogPostRepository.deleteById(blogPostId);
        }
}
