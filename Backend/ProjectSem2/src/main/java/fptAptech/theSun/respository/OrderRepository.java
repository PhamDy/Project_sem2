package fptAptech.theSun.respository;


import fptAptech.theSun.entity.Enum.OrderStatus;
import fptAptech.theSun.entity.Order;
import fptAptech.theSun.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface OrderRepository extends JpaRepository<Order, Long> {

//    Order findByPayment_Id(Long id);

    @Query(value = "SELECT o FROM Order o " +
            "WHERE o.user.id = :userId " +
            "AND o.createdAt = (SELECT MAX(o2.createdAt) FROM Order o2 WHERE o2.user.id = :userId)")
    Order getOrderByUserIdAndCreatedAtNearest(@Param("userId") Long userId);

    Page<Order> findByUser_Email(String email, Pageable pageable);

    Order findByUser_IdAndStatus(Long userId, OrderStatus status);

    Boolean existsByUserAndStatus(User user, OrderStatus status);

    @Query(value = "SELECT SUM(o.total_price) FROM orders o WHERE MONTH(o.created_at) = ?1", nativeQuery = true)
    Double getTotalByMonth(int month);

    @Query(value = "SELECT SUM(o.total_price) FROM orders o WHERE YEAR(o.created_at) = ?1", nativeQuery = true)
    Double getTotalByYear(int year);

    @Query(value = "SELECT COUNT(o.order_id) FROM orders o WHERE o.order_status = 'Confirmed'", nativeQuery = true)
    Integer getOrderPending();

    @Query(value = "SELECT MONTH(created_at) AS month, SUM(total_price) AS total " +
            "FROM orders " +
            "WHERE YEAR(created_at) = YEAR(CURRENT_DATE()) " +
            "GROUP BY MONTH(created_at)", nativeQuery = true)
    List<Map<String, Object>> getTotalByMonthInCurrentYear();
    @Query(value = "SELECT order_id FROM orders WHERE user_id = ?1 ORDER BY order_id DESC LIMIT 1", nativeQuery = true)
    Long getOrderIdEarly(Long userId);

}
