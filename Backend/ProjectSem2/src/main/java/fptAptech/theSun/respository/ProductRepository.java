package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
            "INNER JOIN Category c ON c.id = p.category.id " +
            "INNER JOIN Warehouse wh ON wh.product.id = p.id WHERE " +
            "(:gender is null OR p.gender IN (:gender)) AND " +
            "(:brand is null OR p.brand IN (:brand)) AND " +
            "(:category is null OR c.name IN (:category)) AND " +
            "(:color is null OR wh.color IN (:color)) AND " +
            "(:sport is null OR p.sport IN (:sport)) AND " +
            "(:discount = false OR p.discount > 0) AND " +
            "((:under50 = true AND p.price < 50) OR " +
            "(:between50And100 = true AND p.price >= 50 AND p.price <= 100) OR " +
            "(:between100And250 = true AND p.price > 100 AND p.price <= 250) OR " +
            "(:over250 = true AND p.price > 250) OR " +
            "(:under50 = false AND :between50And100 = false AND :between100And250 = false AND :over250 = false))"
    )
    List<Product> productsByFillterAll(
            @Param("gender") String gender,
            @Param("brand") String brand,
            @Param("category") String category,
            @Param("color") String color,
            @Param("sport") String sport,
            @Param("discount") Boolean discount,
            @Param("under50") Boolean under50,
            @Param("between50And100") Boolean between50And100,
            @Param("between100And250") Boolean between100And250,
            @Param("over250") Boolean over250,
            Sort sort
    );



}
