package fptAptech.theSun.entity;

import fptAptech.theSun.entity.Enum.ImageExtension;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "product_image")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product_image extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_image_id", nullable = false)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column
    @Enumerated(EnumType.STRING)
    private ImageExtension extension;

    @ManyToOne()
    @JoinColumn(name = "product_id")
    private Product product;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] file;

}
