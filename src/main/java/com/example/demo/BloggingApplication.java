package com.example.demo;


import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableCaching
public class BloggingApplication {

	public static void main(String[] args) {
		SpringApplication.run(BloggingApplication.class, args);
	}


	@Bean
	CommandLineRunner run (UserService userService , RoleRepository roleRepository , UserRepository userRepository , PasswordEncoder passwordEncoder)
	{return  args ->
	{
//		userService.createRole(new Role(RoleName.BLOGGER));
//		userService.createRole(new Role(RoleName.ADMIN));
//		userService.createRole(new Role(RoleName.USER));
//		userService.createUser(new User("Base Blogger", "blogger@gmail.com", passwordEncoder.encode("bloggerPass"), new HashSet<>()));
//		userService.createUser(new User("Admin", "admin@gmail.com", passwordEncoder.encode("adminPass"), new HashSet<>()));
//		userService.createUser(new User("Base User", "user@gmail.com", passwordEncoder.encode("userPass"), new HashSet<>()));
//
//
//		Role role1 = roleRepository.findByRoleName(RoleName.USER);
//		User user1 = userRepository.findByEmail("user@gmail.com").orElse(null);
//		user1.getRoles().add(role1);
//		userService.createUser(user1);
//
//		Role role2 = roleRepository.findByRoleName(RoleName.BLOGGER);
//		User user2 = userRepository.findByEmail("blogger@gmail.com").orElse(null);
//		user2.getRoles().add(role2);
//		userService.createUser(user2);
//
//		Role role3 = roleRepository.findByRoleName(RoleName.ADMIN);
//		User user3 = userRepository.findByEmail("admin@gmail.com").orElse(null);
//		user3.getRoles().add(role1);
//		user3.getRoles().add(role2);
//		user3.getRoles().add(role3);
//		userService.createUser(user3);

	};}

}
