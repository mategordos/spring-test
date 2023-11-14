package com.example.demo.service;

import com.example.demo.dto.LoginDto;
import com.example.demo.dto.RegistrationDto;
import com.example.demo.dto.UserDto;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.enums.RoleName;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtilities;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
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
import java.util.stream.Collectors;

@Slf4j
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

    @Autowired
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
            user.setName(registrationDto.getName());
            user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
            Role role = roleRepository.findByRoleName(RoleName.USER);
            user.setRoles(Collections.singleton(role));
            userRepository.save(user);
            log.info("user successfully saved");
            String token = jwtUtilities.generateToken(registrationDto.getEmail(),
                    Collections.singleton(role.getRoleName()));
            log.info("token generated!");
            return new ResponseEntity<>(token,HttpStatus.OK);
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
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));
        Set<String> rolesNames = new HashSet<>();
        user.getRoles().forEach(r-> rolesNames.add(r.getRoleName()));
        String token = jwtUtilities.generateToken(user.getUsername(),rolesNames);
        return token;
    }

    public Set<UserDto> findAllUsers() {
        Set<User> users = new HashSet<>(userRepository.findAll());
        Set<UserDto> userDtos = new HashSet<>();
        Set<String> roleNames;
        for (User user : users) {
            UserDto userDto = new UserDto();
            userDto.setId(user.getId());
            userDto.setName(user.getName());
            userDto.setEmail(user.getEmail());
            roleNames = user.getRoles()
                    .stream()
                    .map(Role::getRoleName)
                    .collect(Collectors.toSet());
            userDto.setRoleNames(roleNames);

            userDtos.add(userDto);
        }

        return userDtos;
    }

    @Transactional
    public void deleteUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException());
        Set<Role> roles = new HashSet<>(roleRepository.findAll());
        user.getRoles().removeAll(roles);
        userRepository.save(user);
        userRepository.deleteById(id);
    }

    @Transactional
    public User updateUserRoles(Long id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Set<Role> roles = new HashSet<>();
        for (String roleName : userDto.getRoleNames()) {
            Role role = roleRepository.findByRoleName(RoleName.valueOf(roleName));
            roles.add(role);
        }
        user.setRoles(roles);
        return userRepository.save(user);
    }


    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException());
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());


        return userDto;
    }

}
