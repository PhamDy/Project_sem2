package fptAptech.theSun.dto;

import fptAptech.theSun.entity.Enum.OrderStatus;
import fptAptech.theSun.entity.Enum.PaymenStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderViewAdmin implements Serializable {
    private Long id;
    private String orderCode;
    private LocalDateTime creatAt;
    private String customerName;
    private String phone;
    private String address;
    private Double total;
    private Double tax;
    private Double shipping;
    private String paymentMethod;
    private PaymenStatus paymenStatus;
    private OrderStatus status;
    private String username;
}
