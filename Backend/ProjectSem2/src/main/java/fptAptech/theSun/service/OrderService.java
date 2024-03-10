package fptAptech.theSun.service;

import fptAptech.theSun.dto.*;
import fptAptech.theSun.entity.Enum.OrderStatus;
import fptAptech.theSun.entity.Enum.PaymenStatus;
import fptAptech.theSun.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {

    List<DeliveryDto> getAllDelivery();

    String sendMailOrder(CartDto cartDto, Order order);

    Order saveOrderByDtoPaypal(OrderRequestDto dto, String paymentId, Double tax, Double toalPrice);

    Order saveOrder(Order order);

    Order findByPaymentId(String id);

    void updateQuantityWarehouse();

    void deleteOrderWhenCancelPayment();

    void testSendMail();

    void returnQuantity();

    Page<?> getAllOrder(Pageable pageable);

    Page<?> getOrderByUser(Pageable pageable);

    Page<?> getOrderDetailsByOrderId(Pageable pageable, Long orderId);

    OrderViewAdmin findOrderById(Long orderId);

    void updateOrderStatus(Long orderId, OrderViewAdmin dto);

    void deleteOrder(Long id);

}
