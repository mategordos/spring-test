package com.example.demo;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.enums.RoleName;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.HashSet;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}


	@Bean
	CommandLineRunner run (UserService userService , RoleRepository roleRepository , UserRepository userRepository , PasswordEncoder passwordEncoder)
	{return  args ->
	{
//		userService.createRole(new Role(RoleName.BLOGGER));
//		userService.createRole(new Role(RoleName.ADMIN));
//		userService.createUser(new User("Base Blogger", "blogger@gmail.com", passwordEncoder.encode("bloggerPassword"), new HashSet<>()));
//		userService.createUser(new User("Admin", "admin@gmail.com", passwordEncoder.encode("adminPassword"), new HashSet<>()));
//
//		Role role = roleRepository.findByRoleName(RoleName.ADMIN);
//		User user = userRepository.findByEmail("admin@gmail.com").orElse(null);
//		user.getRoles().add(role);
//		userService.createUser(user);

		Role role2 = roleRepository.findByRoleName(RoleName.BLOGGER);
		User user2 = userRepository.findByEmail("blogger@gmail.com").orElse(null);
		user2.getRoles().add(role2);
		userService.createUser(user2);

	};}

}
