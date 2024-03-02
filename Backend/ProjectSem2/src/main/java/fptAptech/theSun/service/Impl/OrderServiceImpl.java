package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.DeliveryDto;
import fptAptech.theSun.dto.OrderDto;
import fptAptech.theSun.respository.DeliveryRepository;
import fptAptech.theSun.service.CartService;
import fptAptech.theSun.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private CartService cartService;

    @Autowired
    private DeliveryRepository deliveryRepository;


    @Override
    public List<DeliveryDto> getAllDelivery() {
        var deliverys = deliveryRepository.findAll();
        List<DeliveryDto> deliveryDtos = deliverys.stream()
                .map(i -> {
                    var deliveryDto = new DeliveryDto();
                    deliveryDto.setId(i.getId());
                    deliveryDto.setName(i.getName());
                    deliveryDto.setPrice(i.getPrice());
                    deliveryDto.setImg(i.getImg());
                    return deliveryDto;
                })
                .collect(Collectors.toList());
        return deliveryDtos;
    }

    @Override
    public void saveOrder(OrderDto dto) {

    }
}
