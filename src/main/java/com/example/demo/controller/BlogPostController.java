package com.example.demo.controller;

import com.example.demo.dto.BlogPostDto;
import com.example.demo.entity.BlogPost;
import com.example.demo.service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Set;

@RestController
@RequestMapping("/blogposts")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @PostMapping("/create")
    public ResponseEntity createBlogPost(@RequestBody BlogPostDto blogPostDto) throws URISyntaxException {
        BlogPost createdBlogPost = blogPostService.createBlogPost(blogPostDto);
        return ResponseEntity.created(new URI("/blogposts/" + createdBlogPost.getBlogPostId())).body(createdBlogPost);
    }

    @GetMapping("")
    public Set<BlogPost> getAllBlogPosts(){
        return blogPostService.findAllBlogPosts();
    }

    @GetMapping("/{blogPostId}")
    public BlogPost getBlogger(@PathVariable Long blogPostId) {
        return blogPostService.findBlogPostById(blogPostId);
    }

    @PutMapping("/{blogPostId}")
    public ResponseEntity<BlogPost> editBlogPost(@PathVariable Long blogPostId, @RequestBody BlogPostDto updatedBlogPostDto) {
        BlogPost updatedBlogPost = blogPostService.updateBlogPost(blogPostId, updatedBlogPostDto);
        return ResponseEntity.ok(updatedBlogPost);
    }

    @DeleteMapping("/{blogPostId}")
    public ResponseEntity<?> deleteBlogPost(@PathVariable Long blogPostId) {
        blogPostService.deleteBlogPostById(blogPostId);
        return ResponseEntity.ok("Blogpost deleted: " + blogPostId);
    }
}
