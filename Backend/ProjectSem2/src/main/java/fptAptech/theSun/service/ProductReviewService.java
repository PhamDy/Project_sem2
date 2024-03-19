package fptAptech.theSun.service;

import fptAptech.theSun.entity.ProductReview;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductReviewService {
    void saveProductReview(Long productID, String comment, int star, List<MultipartFile> images);
    void updateReview(Long reviewId, String comment, int star);
    void deleteReview(Long reviewId);
    List<ProductReview> getProductReviewByProductId(Long productId);
}
