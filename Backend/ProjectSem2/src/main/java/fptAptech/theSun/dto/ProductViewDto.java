package fptAptech.theSun.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductViewDto implements Serializable {

    private Long id;

    private String name;

    private String categoryName;

    private String img;

    private String brand;

    private String gender;

    private Double price;

    private Double discount;

    private LocalDateTime createAt;

}
