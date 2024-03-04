package fptAptech.theSun.dto;

import fptAptech.theSun.entity.Products;
import fptAptech.theSun.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductReviewDto {
    private String comment;
    private Integer star;
}
