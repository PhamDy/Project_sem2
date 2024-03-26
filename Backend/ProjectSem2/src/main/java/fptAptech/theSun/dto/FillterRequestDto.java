package fptAptech.theSun.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Data
public class FillterRequestDto implements Serializable {

    private List<String> category;

    private List<String> brand;

    private List<String> color;

    private String gender1;

    private String gender2;

    private String gender3;

    public String getFormattedGender1() {
        return "Men";
    }

    public String getFormattedGender2() {
        return "Woman";
    }

    public String getFormattedGender3() {
        return "Unisex";
    }

    public String getFormattedCategory() {
        return setToString(category);
    }

    public String getFormattedBrand() {
        return setToString(brand);
    }





    private String setToString(List<String> list) {
        if (list == null || list.isEmpty()) {
            return null;
        }

        return list.stream().map(Objects::toString).collect(Collectors.joining(","));
    }



}
