package fptAptech.theSun.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemDto implements Serializable {
    private Long id;
    private Long productId;
    private String productName;
    private String img;
    private String color;
    private String size;
    private Integer quantity;
    private Double price;
    private Double subTotal;
}
