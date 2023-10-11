package com.example.demo.controller;

import com.example.demo.dto.LoginDto;
import com.example.demo.dto.RegistrationDto;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody RegistrationDto registrationDto)
    { return  userService.register(registrationDto);}

    @PostMapping("/login")
    public String login(@RequestBody LoginDto loginDto)
    { return  userService.login(loginDto);}
}
