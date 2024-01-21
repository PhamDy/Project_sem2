package fptAptech.theSun.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class FillterRequestDto implements Serializable {

    private Set<String> category;

    private Set<String> brand;

    private Set<String> color;

    private Set<String> sport;

    private Set<String> gender;

    public String getFormattedCategory() {
        return setToString(category);
    }

    public String getFormattedBrand() {
        return setToString(brand);
    }

    public String getFormattedColor() {
        return setToString(color);
    }

    public String getFormattedSport() {
        return setToString(sport);
    }

    public String getFormattedGender() {
        return setToString(gender);
    }

    private String setToString(Set<String> set) {
        if (set == null || set.isEmpty()) {
            return "";
        }

        return set.stream().map(Objects::toString).collect(Collectors.joining(","));
    }



}
