package fptAptech.theSun.entity;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_review_id")
    private ProductReview review;

    @Column(name = "image_url")
    private String imageUrl;

}
