package com.example.demo.controller;

import com.example.demo.aws.S3Service;
import com.example.demo.dto.BlogPostDto;
import com.example.demo.service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/blogposts")
public class BlogPostController {

    @Autowired
    private BlogPostService blogPostService;

    @Autowired
    private S3Service s3;

    @PostMapping("")
    public ResponseEntity<BlogPostDto> createBlogPost(@RequestBody BlogPostDto blogPostDto) {
            blogPostService.createBlogPost(blogPostDto);
        return new ResponseEntity<>(blogPostDto, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Set<BlogPostDto> findAllBlogPosts(){
        return blogPostService.findAllBlogPosts();
    }


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

    @DeleteMapping("/{blogPostId}")
    public ResponseEntity<?> deleteBlogPost(@PathVariable Long blogPostId) {
        blogPostService.deleteBlogPostById(blogPostId);
        return ResponseEntity.ok("Blogpost deleted: " + blogPostId);
    }

    @GetMapping("/by-author")
    public Set<BlogPostDto> getBlogPostsByAuthor(@RequestParam("author") String author) {
        return blogPostService.findBlogPostsByAuthor(author);
    }


    @GetMapping("/search")
    public ResponseEntity<Set<BlogPostDto>> searchBlogPosts(@RequestParam("keyword") String keyword){
        Set<BlogPostDto> searchResults = blogPostService.searchBlogPosts(keyword);
        return ResponseEntity.ok(searchResults);
    }

    @PutMapping("/vote/{blogPostId}")
    public ResponseEntity<String> addAndRemoveToUpvoters(@PathVariable Long blogPostId) {
        return ResponseEntity.ok(blogPostService.addAndRemoveToUpvoters(blogPostId));
    }

    @GetMapping("/is-upvoted/{blogPostId}")
    public ResponseEntity<Boolean> isPostUpvoted(@PathVariable Long blogPostId) {
        return ResponseEntity.ok(blogPostService.isPostUpvoted(blogPostId));
    }
}
