package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Enum.ProductColor;
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

    @Query(value = "SELECT p FROM Product p " +
            "INNER JOIN Category c ON p.category.id = c.id " +
            "INNER JOIN QuantityProduct qp ON qp.product.id = p.id " +
            "INNER JOIN Color co ON co.id = qp.color.id WHERE " +
            "(:gender is null OR p.gender = :gender) OR " +
            "(:brand is null OR p.brand = :brand) OR " +
            "(:category is null OR c.name = :category) OR " +
            "(:sport is null OR p.sport = :sport) OR " +
            "(:color is null OR co.color = :color) AND " +
            "((:price < 50 AND p.price < 50) AND " +
            "(:price >= 50 AND :price <= 100 AND p.price >= 50 AND p.price <= 100) AND " +
            "(:price > 100 AND :price <= 250 AND p.price > 100 AND p.price <= 250) AND " +
            "(:price > 250 AND p.price > 250))"
    )
    List<Product> productsByGenderAndColor(
            @Param("gender") ProductGender gender,
            @Param("brand") String brand,
            @Param("category") String category,
            @Param("color") ProductColor color,
            @Param("sport") String sport,
            @Param("price") Double price
    );



}
