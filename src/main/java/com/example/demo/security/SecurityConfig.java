package com.example.demo.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;



    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception
    { http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.disable())
            .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests((authz) -> authz

            .requestMatchers(HttpMethod.PUT, "/users/**").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.POST,"/users/**").anonymous()
            .requestMatchers(HttpMethod.DELETE, "/users/**").hasAuthority("ADMIN")
            .requestMatchers("/users/**").permitAll()

            .requestMatchers(HttpMethod.PUT, "/blogposts/vote/**").hasAnyAuthority("USER","BLOGGER","ADMIN")
            .requestMatchers(HttpMethod.PUT, "/blogposts/**").hasAuthority("BLOGGER")
            .requestMatchers(HttpMethod.POST,"/blogposts/**").hasAuthority("BLOGGER")
            .requestMatchers(HttpMethod.DELETE, "/blogposts/**").hasAuthority("BLOGGER")
            .requestMatchers("/blogposts/**").permitAll()

            .requestMatchers(HttpMethod.POST,"/content/**").hasAuthority("BLOGGER")
            .requestMatchers(HttpMethod.DELETE,"/content/**").hasAuthority("BLOGGER")
            .requestMatchers(HttpMethod.PUT,"/content/**").hasAuthority("BLOGGER")
            .requestMatchers("/content/**").permitAll()

            .requestMatchers(HttpMethod.POST,"/comments/**").hasAnyAuthority("USER","BLOGGER","ADMIN")
            .requestMatchers("/comments/**").permitAll()

            .requestMatchers(HttpMethod.POST,"/categories/**").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.PUT,"/categories/**").hasAuthority("ADMIN")
            .requestMatchers(HttpMethod.DELETE,"/categories/**").hasAuthority("ADMIN")
            .requestMatchers("/categories/**").permitAll());
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception
    { return authenticationConfiguration.getAuthenticationManager();}


    @Bean
    public PasswordEncoder passwordEncoder()
    { return new BCryptPasswordEncoder(); }

}
