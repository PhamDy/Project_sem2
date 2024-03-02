package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
