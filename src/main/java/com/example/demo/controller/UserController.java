package com.example.demo.controller;

import com.example.demo.dto.LoginDto;
import com.example.demo.dto.RegistrationDto;
import com.example.demo.dto.UserDto;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody RegistrationDto registrationDto)
    { return  userService.register(registrationDto);}

    @PostMapping("/login")
    public String login(@RequestBody LoginDto loginDto)
    { return  userService.login(loginDto);}

    @GetMapping("")
    public Set<UserDto> getAllUsers() {
        return userService.findAllUsers();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long userId) {
        userService.deleteUserById(userId);
        return ResponseEntity.ok("User deleted: " + userId);
    }

    @PutMapping("/{userId}/roles")
    public ResponseEntity<?> updateUserRoles(@PathVariable Long userId, @RequestBody UserDto userDto) {
            userService.updateUserRoles(userId, userDto);
            return ResponseEntity.ok("User updated " + userId);
    }

    @GetMapping("/by-email")
    public ResponseEntity<UserDto> getUserByEmail(@RequestParam String email) {
        UserDto userDto = userService.getUserByEmail(email);
        return ResponseEntity.ok(userDto);
    }

}
