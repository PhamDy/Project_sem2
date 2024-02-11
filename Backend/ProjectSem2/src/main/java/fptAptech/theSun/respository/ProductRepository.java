package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Products;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Products, Long> {

    @Query(value = "SELECT * FROM Products ORDER BY discount DESC", nativeQuery = true)
    List<Products> getListByFeatured();

    @Query(value = "SELECT * FROM Products ORDER BY created_at DESC", nativeQuery = true)
    List<Products> getListByNewest();

    @Query(value = "SELECT * FROM Products ORDER BY price ASC", nativeQuery = true)
    List<Products> getListByPriceAsc();

    @Query(value = "SELECT * FROM Products ORDER BY price DESC ", nativeQuery = true)
    List<Products> getListByPriceDesc();

    @Query(value = "SELECT p FROM Products p " +
            "INNER JOIN Category c ON c.id = p.category.id " +
            "INNER JOIN Warehouse wh ON wh.products.id = p.id WHERE " +
            "(COALESCE(:gender1, :gender2, :gender3) IS NULL OR p.gender IN (:gender1, :gender2, :gender3)) AND " +
//            "(:gender is null OR p.gender IN (:gender)) AND " +
            "(COALESCE(:brand1, :brand2, :brand3, :brand4, :brand5) IS NULL OR p.brand IN (:brand1, :brand2, :brand3, :brand4, :brand5)) AND " +
            "(COALESCE(:category1, :category2, :category3) IS NULL OR p.category.name IN (:category1, :category2, :category3)) AND " +
            "(COALESCE(:color1, :color2, :color3, :color4, :color5, :color6, :color7) IS NULL OR wh.color IN (:color1, :color2, :color3, :color4, :color5, :color6, :color7)) AND " +
            "(:discount = false OR p.discount > 0) AND " +
            "((:under50 = true AND p.price < 50) OR " +
            "(:between50And100 = true AND p.price >= 50 AND p.price <= 100) OR " +
            "(:between100And250 = true AND p.price > 100 AND p.price <= 250) OR " +
            "(:over250 = true AND p.price > 250) OR " +
            "(:under50 = false AND :between50And100 = false AND :between100And250 = false AND :over250 = false))"
    )
    List<Products> productsByFilterAll(
            @Param("gender1") String gender1,
            @Param("gender2") String gender2,
            @Param("gender3") String gender3,
//            @Param("gender") List<String> gender,
            @Param("brand1") String brand1,
            @Param("brand2") String brand2,
            @Param("brand3") String brand3,
            @Param("brand4") String brand4,
            @Param("brand5") String brand5,
            @Param("category1") String category1,
            @Param("category2") String category2,
            @Param("category3") String category3,
            @Param("color1") String color1,
            @Param("color2") String color2,
            @Param("color3") String color3,
            @Param("color4") String color4,
            @Param("color5") String color5,
            @Param("color6") String color6,
            @Param("color7") String color7,
            @Param("discount") Boolean discount,
            @Param("under50") Boolean under50,
            @Param("between50And100") Boolean between50And100,
            @Param("between100And250") Boolean between100And250,
            @Param("over250") Boolean over250,
            Sort sort
    );

    @Query("SELECT p FROM Products p WHERE LOWER(p.name) LIKE %:keyword%")
    List<Products> searchProduct(String keyword);

    //ok ban oi



}
