package com.example.demo.aws;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Bean
    public S3Client s3Client() {
        S3Client client = S3Client.builder()
                .region(Region.EU_NORTH_1)
                .build();
        return client;
    }
}
