package fptAptech.theSun.controller;

import fptAptech.theSun.dto.ProductReviewDto;
import fptAptech.theSun.entity.ProductReview;
import fptAptech.theSun.service.ProductReviewService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}")
public class ProductReviewController {

    @Autowired
    private ProductReviewService productReviewService;

    @PostMapping("/create")
    @Operation(summary = "Khách hàng tạo đánh giá sản phẩm", description = "Khách hàng nhâp comment và star vào đánh giá")
    public ResponseEntity<ProductReview> createProductReview(
            @PathVariable("productId") Long productId,
            @RequestParam("comment") String comment,
            @RequestParam("star") Integer star,
            @RequestParam("images") MultipartFile images
    ) {
        productReviewService.saveProductReview(productId, comment, star , images);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/update/{reviewId}")
    @Operation(summary = "Khách hàng sửa đánh giá sản phẩm", description = "Khách hàng nhập comment và star mới")
    public ResponseEntity<Void> updateReview(@PathVariable Long reviewId, @RequestBody ProductReviewDto productReviewDto) {
        productReviewService.updateReview(reviewId, productReviewDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{reviewId}")
    @Operation(summary = "Khách hàng xóa đánh giá sản phẩm", description = "Khách hàng xóa đánh giá thông qua id")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        productReviewService.deleteReview(reviewId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/review")
    @Operation(summary = "Lấy ra danh sách đánh giá", description = "Lấy ra danh sách đánh giá của sản phầm được chọn")
    public ResponseEntity<List<ProductReview>> getProductReviewsByProductId(@PathVariable("productId") Long productId) {
        List<ProductReview> reviews = productReviewService.getProductReviewByProductId(productId);
        return ResponseEntity.ok(reviews);
    }
}