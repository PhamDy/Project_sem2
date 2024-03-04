package fptAptech.theSun.service;

import fptAptech.theSun.dto.ProductReviewDto;
import fptAptech.theSun.entity.ProductReview;

import java.util.List;

public interface ProductReviewService {
    ProductReview saveProductReview(Long productID, ProductReviewDto productReviewDto);
    void updateReview(Long reviewId, String comment, int star);
    void deleteReview(Long reviewId);
    List<ProductReview> getProductReviewByProductId(Long productId);
}
