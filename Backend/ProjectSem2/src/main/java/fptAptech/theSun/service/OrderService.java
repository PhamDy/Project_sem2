package fptAptech.theSun.service;

import fptAptech.theSun.dto.*;
import fptAptech.theSun.entity.Enum.OrderStatus;
import fptAptech.theSun.entity.Enum.PaymenStatus;
import fptAptech.theSun.entity.Order;
import fptAptech.theSun.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface OrderService {

    List<DeliveryDto> getAllDelivery();

    String sendMailOrder(CartDto cartDto, Order order);

    Order saveOrderByDtoPaypal(OrderRequestDto dto, Double tax, Double toalPrice);

    Order saveOrder(Order order);

    Order findByUserIdAndStatus(Long userId, OrderStatus status);

    void updateQuantityWarehouse();

    void deleteOrderWhenCancelPayment();

    void returnQuantity();

    Page<?> getAllOrder(Pageable pageable);

    Page<?> getOrderByUser(Pageable pageable);

    Page<?> getOrderDetailsByOrderId(Pageable pageable, Long orderId);

    OrderViewAdmin findOrderById(Long orderId);

    void updateOrderStatus(Long orderId, OrderViewAdmin dto);

    void deleteOrder(Long id);

    Double earningsMonthly();

    Double earningsYear();

    Integer getOrderPending();

    List<Map<String, Object>> getTotalByMonthInCurrentYear();

    List<OrderDeatilDto> orderSummary();

}
