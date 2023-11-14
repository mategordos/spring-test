package com.example.demo.controller;

import com.example.demo.aws.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/content")
public class ContentController {

    @Autowired
    private S3Service s3Service;

    @PostMapping("/blogposts/{blogPostId}")
    public ResponseEntity<String> createContentForBlogPostId(@PathVariable Long blogPostId, @RequestBody String content) {
        s3Service.putObject(blogPostId+".md", content);
        return ResponseEntity.ok("Content created for blogpost with id: "+blogPostId);
    }


    @GetMapping("/blogposts/{blogPostId}")
    public ResponseEntity<byte[]> getContentByBlogPostId(@PathVariable Long blogPostId) {
        return ResponseEntity.ok(s3Service.getObject(blogPostId+".md"));
    }

    @PutMapping("/blogposts/{blogPostId}")
    public ResponseEntity<String> editContentByBlogPostId(@PathVariable Long blogPostId, @RequestBody String content) {
        s3Service.putObject(blogPostId+".md", content);
        return ResponseEntity.ok("Content created for blogpost with id: "+blogPostId);
    }

    @DeleteMapping("/blogposts/{blogPostId}")
    public ResponseEntity<String> deleteContentByBlogPostId(@PathVariable Long blogPostId) {
        s3Service.deleteObject(blogPostId+".md");
        return ResponseEntity.ok("Content deleted for blogpost with id: "+blogPostId);
    }
}
