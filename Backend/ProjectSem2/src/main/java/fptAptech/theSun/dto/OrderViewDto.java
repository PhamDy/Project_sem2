package fptAptech.theSun.dto;

import fptAptech.theSun.entity.Enum.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderViewDto implements Serializable {
    private Long id;
    private OrderRequestDto orderRequestDto;
    private CartDto cartDto;
    private String shippingMethod;
    private Double tax;
    private Double shipPrice;
    private Double toal =  cartDto.getTotalPrice() + tax + shipPrice;
    private OrderStatus orderStatus = OrderStatus.Pending;


}
