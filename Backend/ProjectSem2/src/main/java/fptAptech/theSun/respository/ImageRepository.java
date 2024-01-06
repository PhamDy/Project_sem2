package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Product_image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Product_image, Integer> {
}
