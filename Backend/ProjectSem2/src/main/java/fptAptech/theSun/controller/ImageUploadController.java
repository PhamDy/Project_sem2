package fptAptech.theSun.controller;

import fptAptech.theSun.service.ImageUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
public class ImageUploadController {
    @Autowired
    private ImageUploadService imageUploadService;

    @PostMapping("/image/{id}")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id) {
        String filePath = imageUploadService.uploadImage(file, id);
        if (filePath != null) {
            return ResponseEntity.ok(filePath);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    @DeleteMapping("/{filename}")
    public ResponseEntity<String> deleteImage(@PathVariable String filename) {
        return imageUploadService.deleteImage(filename);
    }

}
