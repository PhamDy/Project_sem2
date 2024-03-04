package fptAptech.theSun.service;

import fptAptech.theSun.dto.DeliveryDto;
import fptAptech.theSun.dto.OrderRequestDto;
import fptAptech.theSun.dto.OrderViewDto;
import fptAptech.theSun.entity.Order;

import java.util.List;

public interface OrderService {

    List<DeliveryDto> getAllDelivery();

    OrderViewDto showOrderView();

    Order saveOrderByDtoPaypal(OrderRequestDto dto, String paymentId, Double tax, Double toalPrice);

    Order saveOrder(Order order);

    Order findByPaymentId(String id);

}
