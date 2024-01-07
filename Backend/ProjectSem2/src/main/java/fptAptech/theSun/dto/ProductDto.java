package fptAptech.theSun.dto;

import fptAptech.theSun.entity.Category;
import fptAptech.theSun.entity.Enum.ProductGender;
import fptAptech.theSun.entity.Enum.ProductStatus;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
public class ProductDto implements Serializable {

    private int id;

    private String name;

    private String img;

    private String img1;

    private String img2;

    private String img3;

    private int quantity;

    private String description;

    private ProductGender gender;

    private double price;

    private String brand;

    private String sport;

    private String size;

    private String color;

    private float discount;

    private ProductStatus status;

    private int category_id;

    private CatagoryDto catagory;

}
