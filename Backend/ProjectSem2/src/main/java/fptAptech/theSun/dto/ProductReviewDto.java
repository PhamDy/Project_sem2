package fptAptech.theSun.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class ProductReviewDto {
    private String comment;
    private Integer star;
    private List<MultipartFile> images;
}
