package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Order_details;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<Order_details, Long> {
}
