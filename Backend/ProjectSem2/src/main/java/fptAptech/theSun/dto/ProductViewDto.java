package fptAptech.theSun.dto;

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
public class ProductViewDto implements Serializable {

    private Long id;

    private String name;

    private String categoryName;

    private String img;

    private Double price;

    private String brand;

    private String gender;

    private Double discount;

    private LocalDateTime createAt;

}
