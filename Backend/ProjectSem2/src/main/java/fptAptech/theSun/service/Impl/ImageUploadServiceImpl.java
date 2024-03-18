package fptAptech.theSun.service.Impl;

import fptAptech.theSun.service.ImageUploadService;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.Instant;

@Service
public class ImageUploadServiceImpl implements ImageUploadService {
    @Value("${upload.directory}")
    private String uploadDirectory;

    @Override
    public String uploadImage(MultipartFile file) {
        try {
            // Kiểm tra xem có file được upload không
            if (file.isEmpty()) {
                throw new IllegalArgumentException("Please select a file to upload.");
            }

            // Kiểm tra nếu file thuôc dạng hình ảnh
            if (!isImage(file)) {
                throw new IllegalArgumentException("Only image files are allowed.");
            }

            // Tạo thư mục chứa nếu chưa tồn tại
            File directory = new File(uploadDirectory);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Tạo tên riêng cho file
            String originalFilename = file.getOriginalFilename();
            String uniqueFilename = Instant.now().toEpochMilli() + "_" + originalFilename;

            // Lưu file lên server
            String filePath = uploadDirectory + File.separator + uniqueFilename;
            file.transferTo(new File(filePath));

            return filePath;
        } catch (IOException | java.io.IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Kiểm tra file có phải dạng hình ảnh không
    private boolean isImage(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    @Override
    public ResponseEntity<String> deleteImage(String filename) {
        try {
            String filePath = uploadDirectory + "/" + filename;
            File file = new File(filePath);

            if (file.exists()) {
                if (file.delete()) {
                    return ResponseEntity.ok("Image " + filename + " deleted successfully.");
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Failed to delete image " + filename + ".");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Image " + filename + " not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete image " + filename + ".");
        }
    }
}
