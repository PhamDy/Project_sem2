package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {

//    @Query(value = "SELECT Warehouse.quantity FROM Warehouse " +
//            "WHERE Warehouse.products.id = ?1 AND Warehouse.color = ?2 AND Warehouse.size = ?3")
//    Integer getWarehouseByQuantity(Long productId, String color, String size);

//    @Query(value = "SELECT w FROM Warehouse w WHERE w.products.id = ?1 AND w.color = ?2 AND w.size = ?3")
    Warehouse findByProducts_IdAndColorAndSize(Long productId, String color, String size);


}
