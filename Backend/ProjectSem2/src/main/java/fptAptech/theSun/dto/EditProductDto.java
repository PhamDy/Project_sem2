package fptAptech.theSun.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EditProductDto implements Serializable {

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

    @NotNull
    private Double discount;

    @NotEmpty
    private String categoryName;
}
