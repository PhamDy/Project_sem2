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
    private int id;

    @Column(name = "product_name")
    private String name;

    @Column(name = "image_product")
    private String img;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "gender")
    private ProductGender gender;

    @Column(name = "size")
    private String size;

    @Column(name = "brand")
    private String brand;

    @Column(name = "color")
    private String color;

    @Column(name = "price")
    private double price;

    @Column(name = "sport")
    private String sport;

    @Column(name = "status")
    private ProductStatus status;

    @Column(name = "discount")
    private float discount;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, targetEntity = Product_image.class)
    private Set<Product_image> images = new HashSet<>();

}
