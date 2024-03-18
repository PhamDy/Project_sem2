package fptAptech.theSun.service;

import fptAptech.theSun.dto.ProductReviewDto;
import fptAptech.theSun.entity.ProductReview;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductReviewService {
    ProductReview saveProductReview(Long productID, ProductReviewDto productReviewDto, List<MultipartFile> images);
    void updateReview(Long reviewId, String comment, int star);
    void deleteReview(Long reviewId);
    List<ProductReview> getProductReviewByProductId(Long productId);
}
