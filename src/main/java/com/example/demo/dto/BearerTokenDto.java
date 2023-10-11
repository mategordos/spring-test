package com.example.demo.dto;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BearerTokenDto {

    private String accessToken ;
    private String tokenType ;

    public BearerTokenDto(String accessToken, String tokenType) {
        this.tokenType = tokenType;
        this.accessToken = accessToken;
    }

}
