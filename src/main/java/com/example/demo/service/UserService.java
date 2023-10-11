package com.example.demo.service;

import com.example.demo.dto.BearerTokenDto;
import com.example.demo.dto.LoginDto;
import com.example.demo.dto.RegistrationDto;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.enums.RoleName;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    private JwtUtilities jwtUtilities;

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public ResponseEntity<?> register(RegistrationDto registrationDto) {
        if(userRepository.existsByEmail(registrationDto.getEmail()))
        { return  new ResponseEntity<>("email is already taken !", HttpStatus.SEE_OTHER); }
        else
        { User user = new User();
            user.setEmail(registrationDto.getEmail());
            user.setUsername(registrationDto.getUsername());
            user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
            Role role = roleRepository.findByRoleName(RoleName.BLOGGER);
            user.setRoles(Collections.singleton(role));
            userRepository.save(user);
            String token = jwtUtilities.generateToken(registrationDto.getEmail(),Collections.singleton(role.getRoleName()));
            return new ResponseEntity<>(new BearerTokenDto(token , "Bearer "),HttpStatus.OK);

        }
    }

    public String login(LoginDto loginDto) {
        Authentication authentication= authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found."));
        Set<String> rolesNames = new HashSet<>();
        user.getRoles().forEach(r-> rolesNames.add(r.getRoleName()));
        String token = jwtUtilities.generateToken(user.getUsername(),rolesNames);
        return token;
    }


}