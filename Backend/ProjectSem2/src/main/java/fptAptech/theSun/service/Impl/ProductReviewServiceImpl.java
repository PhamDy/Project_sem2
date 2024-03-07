package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.ProductReviewDto;
import fptAptech.theSun.entity.ProductReview;
import fptAptech.theSun.entity.Products;
import fptAptech.theSun.entity.User;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.ProductRepository;
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

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ProductReview saveProductReview(Long productId, ProductReviewDto productReviewDto) {
        String email = JwtFilter.CURRENT_USER;
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("You must log in before!"));
        Products products = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException("Product not found!"));
        ProductReview productReview = new ProductReview();
        productReview.setUser(user);
        productReview.setProducts(products);
        productReview.setComment(productReviewDto.getComment());
        productReview.setStar(productReviewDto.getStar());
        productReview.setStatus(1);
        productReview.setCreatedBy("User");

        return productReviewRepository.save(productReview);
    }

    @Override
    public void updateReview(Long reviewId, String comment, int star) {
        ProductReview existingReview = productReviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException("Review not found!"));

        String currentUserEmail = JwtFilter.CURRENT_USER;
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new CustomException("You must log in before!"));

        if (!existingReview.getUser().equals(currentUser)) {
            throw new CustomException("You are not authorized to update this review!");
        }

        existingReview.setComment(comment);
        existingReview.setStar(star);

        productReviewRepository.save(existingReview);
    }


    @Override
    public void deleteReview(Long reviewId) {
        ProductReview existingReview = productReviewRepository.findById(reviewId)
                .orElseThrow(() -> new CustomException("Review not found!"));

        String currentUserEmail = JwtFilter.CURRENT_USER;
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new CustomException("You must log in before!"));

        if (!existingReview.getUser().equals(currentUser)) {
            throw new CustomException("You are not authorized to delete this review!");
        }

        productReviewRepository.delete(existingReview);
    }

    @Override
    public List<ProductReview> getProductReviewByProductId(Long productId) {
        return productReviewRepository.getProductReviewByProductsId(productId);
    }
}