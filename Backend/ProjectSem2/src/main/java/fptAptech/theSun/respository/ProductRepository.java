package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Enum.ProductColor;
import fptAptech.theSun.entity.Enum.ProductGender;
import fptAptech.theSun.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

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
            "(:gender is null OR p.gender = :gender) AND " +
            "(:brand is null OR p.brand = :brand) AND " +
            "(:category is null OR c.name = :category) AND " +
            "(:sport is null OR p.sport = :sport) AND " +
            "(:color is null OR co.color = :color) AND " +
            "(:discount = false OR p.discount > 0) AND " +
            "((:under50 = true AND p.price < 50) OR " +
            "(:between50And100 = true AND p.price >= 50 AND p.price <= 100) OR " +
            "(:between100And250 = true AND p.price > 100 AND p.price <= 250) OR " +
            "(:over250 = true AND p.price > 250) OR " +
            "(:under50 = false AND :between50And100 = false AND :between100And250 = false AND :over250 = false))" +
            "ORDER BY " +
            "CASE " +
            "WHEN :sortBy = 'Price: High-Low' THEN p.price " +
            "WHEN :sortBy = 'Price: Low-High' THEN p.price " +
            "WHEN :sortBy = 'Featured' THEN p.discount " +
            "WHEN :sortBy = 'Newest' THEN p.createdAt " +
            "ELSE p.id " +
            "END DESC"
    )
    List<Product> productsByFillterAll(
            @Param("gender") ProductGender gender,
            @Param("brand") String brand,
            @Param("category") String category,
            @Param("color") ProductColor color,
            @Param("sport") String sport,
            @Param("discount") Boolean discount,
            @Param("under50") Boolean under50,
            @Param("between50And100") Boolean between50And100,
            @Param("between100And250") Boolean between100And250,
            @Param("over250") Boolean over250,
            @Param("sortBy") String sortBy
    );



}
