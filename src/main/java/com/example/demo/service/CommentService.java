package com.example.demo.service;

import com.example.demo.dto.CommentDto;
import com.example.demo.entity.BlogPost;
import com.example.demo.entity.Comment;
import com.example.demo.repository.BlogPostRepository;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
public class CommentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Autowired
    private CommentRepository commentRepository;

    public Set<CommentDto> findAllCommentsByBlogPostId(Long blogPostId) {
        Set<CommentDto> commentDtos = new HashSet<>();
        Set<Comment> comments = new HashSet<>(commentRepository.findByBlogPostId(blogPostId));

        for (Comment comment : comments) {
            CommentDto commentDto = new CommentDto();
            commentDto.setCommentId(comment.getId());
            commentDto.setBlogPostId(comment.getBlogPost().getId());
            commentDto.setContent(comment.getContent());
            commentDto.setName(comment.getCommenter().getName());
            commentDto.setDate(comment.getCreationDate());

            commentDtos.add(commentDto);
        }

        return commentDtos;
    }


    public CommentDto createComment(Long blogPostId, CommentDto commentDto) {
        BlogPost blogPost = blogPostRepository.findById(blogPostId)
                .orElseThrow(() -> new RuntimeException("Blogpost not found with id: " + blogPostId));
        Comment comment = new Comment();
        comment.setContent(commentDto.getContent());
        comment.setCommenter(userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found")));
        comment.setBlogPost(blogPost);
        commentRepository.save(comment);
        return commentDto;
    }
}
