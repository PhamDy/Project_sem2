package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

//    @Query(value = "SELECT d.price FROM Delivery d where d.id = ?1")
//    Double getByPrice(Long deliveryId);

}
