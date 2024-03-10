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
public class CartDto implements Serializable {
    private Long id;
    private Long userId;
    private Double totalPrice = 0.00;
    private Integer quantityItem = 0;
    private List<CartItemDto> cartItemList;
}


