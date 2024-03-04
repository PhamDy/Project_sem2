package fptAptech.theSun.respository;

import fptAptech.theSun.dto.ProductReviewDto;
import fptAptech.theSun.entity.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
    List<ProductReview> getProductReviewByProductsId(Long productId);

    @Modifying
    @Query("UPDATE ProductReview pr SET pr.comment = ?2, pr.star = ?3, pr.updatedAt = CURRENT_TIMESTAMP WHERE pr.id = ?1")
    void updateReview(Long reviewId, String comment, int star);

    @Modifying
    @Query("DELETE FROM ProductReview pr WHERE pr.id = ?1")
    void deleteReview(Long reviewId);
}
