package fptAptech.theSun.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class ProductViewDto implements Serializable {

    private Long id;

    private String name;

    private String categoryName;

    private String img;

    private Double price;

    private Float discount;

}
