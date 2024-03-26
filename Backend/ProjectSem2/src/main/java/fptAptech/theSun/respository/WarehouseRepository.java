package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Warehouse;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {

    Warehouse findByProducts_IdAndColorAndSize(Long productId, String color, String size);

    @Query(value = "SELECT w.color FROM Warehouse w WHERE w.products.id = ?1 GROUP BY w.color")
    List<String> getByColor(Long productId);

    @Query(value = "SELECT w.size FROM Warehouse w WHERE w.products.id = ?1 GROUP BY w.size")
    List<String> getBySize(Long productId);




}
