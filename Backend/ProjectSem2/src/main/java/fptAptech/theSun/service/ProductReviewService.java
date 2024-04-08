package fptAptech.theSun.service;

import fptAptech.theSun.dto.ProductReviewDto;
import fptAptech.theSun.entity.ProductReview;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductReviewService {
    void saveProductReview(Long productID, String comment, int star, MultipartFile images);
    void updateReview(Long reviewId, ProductReviewDto productReviewDto);
    void deleteReview(Long reviewId);
    List<ProductReview> getProductReviewByProductId(Long productId);
}
