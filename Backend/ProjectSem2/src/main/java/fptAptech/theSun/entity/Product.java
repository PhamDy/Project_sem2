package fptAptech.theSun.entity;

import fptAptech.theSun.entity.Enum.ProductGender;
import fptAptech.theSun.entity.Enum.ProductStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Long id;

    @Column(name = "product_name")
    private String name;

    @Column(name = "avartar_image_product")
    private String img;

    @Column(name = "image1_product")
    private String img1;

    @Column(name = "image2_product")
    private String img2;

    @Column(name = "image3_product")
    private String img3;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductGender gender;

    @Column(name = "size")
    private String size;

    @Column(name = "brand")
    private String brand;

    @Column(name = "color")
    private String color;

    @Column(name = "price")
    private Double price;

    @Column(name = "sport")
    private String sport;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @Column(name = "discount")
    private Float discount;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;


}
