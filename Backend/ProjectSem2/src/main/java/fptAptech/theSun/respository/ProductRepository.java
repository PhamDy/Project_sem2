package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Enum.ProductGender;
import fptAptech.theSun.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "SELECT * FROM Product ORDER BY discount DESC", nativeQuery = true)
    List<Product> getListByFeatured();

    @Query(value = "SELECT * FROM Product ORDER BY created_at DESC", nativeQuery = true)
    List<Product> getListByNewest();

    @Query(value = "SELECT * FROM Product ORDER BY price ASC", nativeQuery = true)
    List<Product> getListByPriceAsc();

    @Query(value = "SELECT * FROM Product ORDER BY price DESC ", nativeQuery = true)
    List<Product> getListByPriceDesc();

    @Query("SELECT p FROM Product p WHERE p.gender = :gender OR p.brand = :brand")
    List<Product> productsByGenderAndColor(@Param("gender") ProductGender gender, @Param("brand") String brand);


}
