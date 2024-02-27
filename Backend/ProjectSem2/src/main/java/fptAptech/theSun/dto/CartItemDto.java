package fptAptech.theSun.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class CartItemDto implements Serializable {
    private Long id;
    private String productName;
    private String img;
    private String color;
    private String size;
    private Integer quantity;
    private Double price;
    private Double subTotal;
}
