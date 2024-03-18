package fptAptech.theSun.entity;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
@Table(name = "image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_review_id")
    private ProductReview productReview;

    @Column(name = "image_url")
    private String imageUrl;

}
