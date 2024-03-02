package fptAptech.theSun.service;

import fptAptech.theSun.dto.DeliveryDto;
import fptAptech.theSun.dto.OrderDto;

import java.util.List;

public interface OrderService {

    List<DeliveryDto> getAllDelivery();

    void saveOrder(OrderDto dto);
}
