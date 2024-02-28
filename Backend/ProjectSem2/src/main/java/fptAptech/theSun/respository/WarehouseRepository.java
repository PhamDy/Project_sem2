package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {

    Warehouse findByProducts_IdAndColorAndSize(Long productId, String color, String size);


}
