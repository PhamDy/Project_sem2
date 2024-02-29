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
public class UpdateQuantityDto implements Serializable {
    private Long CartItemId;
    private Integer quantityItem;
}
