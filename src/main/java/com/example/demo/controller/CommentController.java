package com.example.demo.controller;

import com.example.demo.dto.CommentDto;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/{blogPostId}")
    public Set<CommentDto> findAllCommentsByBlogPostId(@PathVariable Long blogPostId) {
        return commentService.findAllCommentsByBlogPostId(blogPostId);
    }

    @PostMapping("/{blogPostId}")
    public ResponseEntity<CommentDto> createComment(@PathVariable Long blogPostId, @RequestBody CommentDto commentDto) {
        return new ResponseEntity<>(commentService.createComment(blogPostId, commentDto), HttpStatus.CREATED) ;
    }

}
