package fptAptech.theSun.dto;

import fptAptech.theSun.entity.Enum.CategoryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDto implements Serializable {
    private Long id;
    private String name;
    private CategoryStatus status;
}
