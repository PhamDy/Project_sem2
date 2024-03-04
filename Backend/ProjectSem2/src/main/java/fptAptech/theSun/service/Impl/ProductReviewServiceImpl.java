package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.ProductReviewDto;
import fptAptech.theSun.entity.ProductReview;
import fptAptech.theSun.entity.Products;
import fptAptech.theSun.entity.User;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.ProductReviewRepository;
import fptAptech.theSun.respository.UserRepository;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.service.ProductReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductReviewServiceImpl implements ProductReviewService {

    @Autowired
    private ProductReviewRepository productReviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductServiceImpl productServiceImpl;

    @Override
    public ProductReview saveProductReview(Long productId, ProductReviewDto productReviewDto) {
        String email = JwtFilter.CURRENT_USER;
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("You must log in before!"));

        Products products = productServiceImpl.getProduct(productId);

        ProductReview productReview = new ProductReview();
        productReview.setUser(user);
        productReview.setProducts(products);
        productReview.setComment(productReviewDto.getComment());
        productReview.setStar(productReviewDto.getStar());
        productReview.setStatus(1);

        return productReviewRepository.save(productReview);
    }

    @Override
    public void updateReview(Long reviewId, String comment, int star) {
        productReviewRepository.updateReview(reviewId, comment, star);
    }

    @Override
    public void deleteReview(Long reviewId) {
        productReviewRepository.deleteReview(reviewId);
    }

    @Override
    public List<ProductReview> getProductReviewByProductId(Long productId) {
        return productReviewRepository.getProductReviewByProductsId(productId);
    }
}
