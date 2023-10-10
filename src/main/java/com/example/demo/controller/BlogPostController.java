package com.example.demo.controller;

import com.example.demo.aws.S3Service;
import com.example.demo.dto.BlogPostDto;
import com.example.demo.entity.BlogPost;
import com.example.demo.service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private S3Service s3;
    //done
    @PostMapping("")
    public ResponseEntity<BlogPostDto> createBlogPost(@RequestBody BlogPostDto blogPostDto) throws URISyntaxException {
        blogPostService.createBlogPost(blogPostDto);
        return new ResponseEntity<>(blogPostDto, HttpStatus.CREATED);
    }


    //done
    @GetMapping("")
    public Set<BlogPostDto> findAllBlogPosts(){
        return blogPostService.findAllBlogPosts();
    }

    //done
    @GetMapping("/{blogPostId}")
    public ResponseEntity<BlogPostDto> findBlogPostById(@PathVariable Long blogPostId) {
        BlogPostDto blogPostDto = blogPostService.findBlogPostById(blogPostId);
        return ResponseEntity.ok(blogPostDto);
    }

    @PutMapping("/{blogPostId}")
    public ResponseEntity<BlogPostDto> editBlogPost(@PathVariable Long blogPostId, @RequestBody BlogPostDto updatedBlogPostDto) {
        BlogPostDto blogPostDto = blogPostService.updateBlogPost(blogPostId, updatedBlogPostDto);
        return ResponseEntity.ok(blogPostDto);
    }


    //done
    @DeleteMapping("/{blogPostId}")
    public ResponseEntity<?> deleteBlogPost(@PathVariable Long blogPostId) {
        blogPostService.deleteBlogPostById(blogPostId);
        return ResponseEntity.ok("Blogpost deleted: " + blogPostId);
    }
}
