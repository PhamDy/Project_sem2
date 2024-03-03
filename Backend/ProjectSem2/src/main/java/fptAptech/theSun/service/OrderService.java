package fptAptech.theSun.service;

import fptAptech.theSun.dto.DeliveryDto;
import fptAptech.theSun.dto.OrderDto;
import fptAptech.theSun.entity.Order;

import java.util.List;

public interface OrderService {

    List<DeliveryDto> getAllDelivery();

    Order saveOrderByDto(OrderDto dto, String id);

    Order saveOrder(Order order);

    Order findByPaymentId(String id);
}
