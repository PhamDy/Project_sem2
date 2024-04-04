package fptAptech.theSun.entity;

import fptAptech.theSun.entity.Enum.ProductStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "products")
public class Products extends BaseEntity{

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

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "brand")
    private String brand;

    @Column(name = "price")
    private Double price;

    @Column(name = "status", nullable = true)
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @Column(name = "discount")
    private Double discount;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "products", fetch = FetchType.EAGER)
    private List<Warehouse> warehouses;
}
