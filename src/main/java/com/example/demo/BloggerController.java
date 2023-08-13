package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/bloggers")
public class BloggerController {

    private final BloggerRepository bloggerRepository;
    Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    public BloggerController(BloggerRepository bloggerRepository) {
        this.bloggerRepository = bloggerRepository;
    }

    @GetMapping
    public List<Blogger> getBloggers() {
        return bloggerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Blogger getBlogger(@PathVariable Long id) {
        return bloggerRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createBlogger(@RequestBody Blogger blogger) throws URISyntaxException {
        logger.debug("Received create blogger request with params: {}", blogger);

        Blogger savedBlogger = bloggerRepository.save(blogger);

        logger.debug("Create new blogger: {}", savedBlogger);
        return ResponseEntity.created(new URI("/bloggers/" + savedBlogger.getId())).body(savedBlogger);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateBlogger(@PathVariable Long id, @RequestBody Blogger blogger) {
        logger.debug("Received update blogger request with params: {}", blogger);

        Blogger currentBlogger = bloggerRepository.findById(id).orElseThrow(RuntimeException::new);
        currentBlogger.setUserName(blogger.getUserName());
        currentBlogger.setPassword(blogger.getPassword());
        currentBlogger.setEmail(blogger.getEmail());
        currentBlogger.setAvatar(blogger.getAvatar());
        currentBlogger = bloggerRepository.save(blogger);

        return ResponseEntity.ok(currentBlogger);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteBlogger(@PathVariable Long id) {
        logger.debug("Received create delete request with id: {}", id);


        bloggerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
