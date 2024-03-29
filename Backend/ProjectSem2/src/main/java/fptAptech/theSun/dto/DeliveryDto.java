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
public class DeliveryDto implements Serializable {
    private Long id;
    private String name;
    private Double price;
    private String img;
}
