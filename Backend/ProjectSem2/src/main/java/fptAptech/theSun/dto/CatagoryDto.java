package fptAptech.theSun.dto;

import fptAptech.theSun.entity.Enum.CategoryStatus;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.io.Serializable;

@Data
public class CatagoryDto implements Serializable {

    private int id;

    @NotEmpty(message = "Category name is required")
    private String name;

    private CategoryStatus status;


}
