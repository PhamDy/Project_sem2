package fptAptech.theSun.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class CartDto implements Serializable {
    private Long id;
    private Long userId;
    private Double totalPrice;
}
