package fptAptech.theSun.dto;

import fptAptech.theSun.entity.Enum.OrderStatus;
import fptAptech.theSun.entity.Order;
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
    private Order order;
    private CartDto cartDto;
}
