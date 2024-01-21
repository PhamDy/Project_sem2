package fptAptech.theSun.dto;

import fptAptech.theSun.entity.Enum.ProductStatus;
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

    private String gender;

    private double price;

    private String brand;

    private String sport;


    private float discount;

    private ProductStatus status;

    private String catagoryName;

}
