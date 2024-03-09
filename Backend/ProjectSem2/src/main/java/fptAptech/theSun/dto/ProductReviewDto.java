package fptAptech.theSun.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductReviewDto {
    private String comment;
    private Integer star;
}
