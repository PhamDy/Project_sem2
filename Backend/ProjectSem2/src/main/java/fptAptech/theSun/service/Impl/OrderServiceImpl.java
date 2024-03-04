package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.DeliveryDto;
import fptAptech.theSun.dto.OrderRequestDto;
import fptAptech.theSun.dto.OrderViewDto;
import fptAptech.theSun.entity.Enum.OrderStatus;
import fptAptech.theSun.entity.Order;
import fptAptech.theSun.entity.Payment;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.DeliveryRepository;
import fptAptech.theSun.respository.OrderRepository;
import fptAptech.theSun.respository.PaymentRepository;
import fptAptech.theSun.respository.UserRepository;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.service.CartService;
import fptAptech.theSun.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private static int nextOrderId = 1;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentRepository paymentRepository;


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
    public OrderViewDto showOrderView() {
        return null;
    }

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    @Transactional
    public Order saveOrderByDtoPaypal(OrderRequestDto dto, String paymenId, Double tax, Double totalPrice) {

        var order = mapToOrder(dto);

        String email = JwtFilter.CURRENT_USER;
        var user = Optional.ofNullable(userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException("You must log in before!")));
        order.setUser(user.get());

        String code = "#" + nextOrderId++ + UUID.randomUUID().toString().toUpperCase().replaceAll("-", "").substring(0, 12);
        order.setCode(code);

        var delivery = deliveryRepository.findById(dto.getDeliveryId())
                .orElseThrow(() -> new CustomException("Delivery not found"));
        order.setDelivery(delivery);
        order.setTax(tax);
        order.setTotalPrice(totalPrice);


        Payment payment = new Payment();
        payment.setId(paymenId);
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setStatus(dto.getPaymenStatus());
        payment.setCreatedBy(dto.getLastName() + " " + dto.getFirstName());
        paymentRepository.save(payment);
        order.setPayment(payment);

        order.setStatus(OrderStatus.Pending);
        order.setCreatedBy(dto.getLastName() + " " + dto.getFirstName());
        return orderRepository.save(order);
    }

    @Override
    public Order findByPaymentId(String id) {
        var order = orderRepository.findByPayment_Id(id);
        if (order == null) {
            throw new CustomException("Order not found");
        }
        return order;
    }

    public Order mapToOrder(OrderRequestDto dto) {
        Order order = new Order();
        order.setFirst_name(dto.getFirstName());
        order.setLast_name(dto.getLastName());
        order.setCountry(dto.getCountry());
        order.setCity(dto.getCity());
        order.setAddress(dto.getAddress());
        order.setOptional(dto.getOptional());
        order.setZipCode(dto.getZipCode());
        order.setEmail(dto.getEmail());
        order.setPhone(dto.getPhone());
        order.setNote(dto.getNote());
        return order;
    }

}
