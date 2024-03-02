package fptAptech.theSun.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDetailDto implements Serializable {
    private Long id;
    private String name;
    private String categoryName;
    private String avatar;
    private String img1;
    private String img2;
    private String img3;
    private String desc;
    private String gender;
    private String brand;
    private Double price;
    private Float discount;
    private List<String> size;
    private List<String> color;
}
