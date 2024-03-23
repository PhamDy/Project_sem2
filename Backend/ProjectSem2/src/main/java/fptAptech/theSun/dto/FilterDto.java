package fptAptech.theSun.dto;

import lombok.*;

import java.io.Serializable;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FilterDto implements Serializable {

    private List<String> category;
    private List<String> brand;
    private List<String> color;
    private List<String> gender;
    private Double discount;
    private Double price1;
    private Double price2;
    private Double price3;
    private Double price4;
    private String sortDirection;
    private String sortFeatured;
    private String sortNewest;

}
