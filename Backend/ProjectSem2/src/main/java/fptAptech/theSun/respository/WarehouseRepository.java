package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {

    Warehouse findByProducts_IdAndColorAndSize(Long productId, String color, String size);

    @Query(value = "SELECT w.color FROM Warehouse w GROUP BY w.color")
    List<String> getAllColor();

    @Query(value = "SELECT DISTINCT w.color FROM Warehouse w WHERE w.products.id = ?1")
    List<String> getByColor(Long productId);

    @Query(value = "SELECT DISTINCT w.size FROM Warehouse w WHERE w.products.id = ?1")
    List<String> getBySize(Long productId);




}
