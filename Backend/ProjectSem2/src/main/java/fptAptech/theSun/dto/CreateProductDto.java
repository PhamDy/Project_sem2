package fptAptech.theSun.dto;

import fptAptech.theSun.entity.Enum.ProductStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateProductDto {
    @NotEmpty
    private String name;

    @NotEmpty
    private String img;

    private String img1 ="";
    private String img2 ="";
    private String img3 ="";

    @NotEmpty
    private String description;

    @NotEmpty
    private String gender;

    @NotEmpty
    private String brand;

    @NotNull
    private Double price;

    private ProductStatus status;

    @NotNull
    private Double discount = 0.00;

    @NotEmpty
    private String categoryName;

    @NotEmpty
    private String color;

    @NotEmpty
    private String size;

    @NotNull
    private Integer quantity;


}
