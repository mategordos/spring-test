package com.example.demo.aws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
    @Autowired
    private S3Client s3;

    @CacheEvict(value = "contents", key = "#key")
    public void putObject(String key, String file) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket("blogging-platform-thesis")
                .key(key)
                .build();
        s3.putObject(objectRequest, RequestBody.fromString(file));
    }

    @Cacheable(value = "contents", key = "#key")
    public byte[] getObject(String key) {
        GetObjectRequest objectRequest = GetObjectRequest.builder()
                .bucket("blogging-platform-thesis")
                .key(key)
                .build();
        ResponseBytes<GetObjectResponse> responseResponseBytes = s3.getObjectAsBytes(objectRequest);
        byte[] data = responseResponseBytes.asByteArray();

        return data;
    }

    @CacheEvict(value = "contents", key = "#key")
    public void deleteObject(String key) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder().bucket("blogging-platform-thesis").key(key).build();
        s3.deleteObject(deleteObjectRequest);

    }

}
