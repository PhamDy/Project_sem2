package fptAptech.theSun.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ImageUploadService {
    public String uploadImage(MultipartFile file, Long productReviewId);

    public ResponseEntity<String> deleteImage(String filename);

}
