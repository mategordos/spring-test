package com.example.demo.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegistrationDto {

    String name;
    String email;
    String password ;
}