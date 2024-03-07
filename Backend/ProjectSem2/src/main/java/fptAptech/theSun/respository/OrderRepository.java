package fptAptech.theSun.respository;


import fptAptech.theSun.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findByPayment_Id(String id);

    @Query(value = "SELECT o FROM Order o " +
            "WHERE o.user.id = :userId " +
            "AND o.createdAt = (SELECT MAX(o2.createdAt) FROM Order o2 WHERE o2.user.id = :userId)")
    Order getOrderByUserIdAndCreatedAtNearest(@Param("userId") Long userId);

}