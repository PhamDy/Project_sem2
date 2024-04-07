package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.*;
import fptAptech.theSun.email.EmailService;
import fptAptech.theSun.entity.*;
import fptAptech.theSun.entity.Enum.CartsStatus;
import fptAptech.theSun.entity.Enum.OrderStatus;
import fptAptech.theSun.entity.Enum.PaymenStatus;
import fptAptech.theSun.entity.Enum.ProductStatus;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.*;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.service.CartService;
import fptAptech.theSun.service.OrderService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    private static int i = 1;
    private static int nextOrderId = i++;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private BillingAddressRepository billingAddressRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AddressRepository addressRepository;


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
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    @Transactional
    public Order saveOrderByDtoPaypal(OrderRequestDto dto, Double tax, Double totalPrice) {
        String email = JwtFilter.CURRENT_USER;
        var user = userRepository.findByEmail(email).orElseThrow(() ->
            new CustomException("You must log in before")
        );

        if (orderRepository.existsByUserAndStatus(user, OrderStatus.Pending)) {
            var order = orderRepository.findByUser_IdAndStatus(user.getId(), OrderStatus.Pending);
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
            order.setDelivery(deliveryRepository.findById(dto.getDeliveryId()).get());
            order.setTax(tax);
            order.setTotalPrice(totalPrice);
            order.setUser(user);

            var billingAddress = order.getBillingAddress();
            billingAddress.setFirst_name(dto.getBiilingAddress().getFirstName());
            billingAddress.setLast_name(dto.getBiilingAddress().getLastName());
            billingAddress.setCountry(dto.getBiilingAddress().getCountry());
            billingAddress.setCity(dto.getBiilingAddress().getCity());
            billingAddress.setAddress(dto.getBiilingAddress().getAddress());
            billingAddress.setOptional(dto.getBiilingAddress().getOptional());
            billingAddress.setZipCode(dto.getBiilingAddress().getZipCode());
            billingAddress.setEmail(dto.getBiilingAddress().getEmail());
            billingAddress.setPhone(dto.getBiilingAddress().getPhone());
            billingAddress.setCreatedBy("User");
            billingAddressRepository.save(billingAddress);
            order.setBillingAddress(billingAddress);

            return orderRepository.save(order);
        }

        var order = mapToOrder(dto);
        order.setUser(user);

        String code = "#" + nextOrderId++ + UUID.randomUUID().toString().toUpperCase().replaceAll("-", "").substring(0, 12);
        order.setCode(code);

        var delivery = deliveryRepository.findById(dto.getDeliveryId())
                .orElseThrow(() -> new CustomException("Delivery not found"));
        order.setDelivery(delivery);
        order.setTax(tax);
        order.setTotalPrice(totalPrice);

        Payment payment = new Payment();
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setStatus(dto.getPaymenStatus());
        payment.setCreatedBy(dto.getLastName() + " " + dto.getFirstName());
        payment = paymentRepository.save(payment);
        order.setPayment(payment);

        order.setStatus(OrderStatus.Pending);
        order.setCreatedBy(dto.getLastName() + " " + dto.getFirstName());

        var billingAddress = mapToBilling(dto.getBiilingAddress());
        billingAddressRepository.save(billingAddress);
        order.setBillingAddress(billingAddress);

        var orders = orderRepository.save(order);

        var cart = cartService.showCart(CartsStatus.Open);
        List<CartItemDto> list = new ArrayList<>();
        list.addAll(cart.getCartItemList());
        List<Order_details> orderDetails = new ArrayList<>();

        for (CartItemDto item: list
             ) {
            var orderDetail = new Order_details();
            var product = productRepository.findById(item.getProductId());
            orderDetail.setOrder(orders);
            orderDetail.setProducts(product.get());
            orderDetail.setColor(item.getColor());
            orderDetail.setSize(item.getSize());
            orderDetail.setQuantity(item.getQuantity());
            orderDetail.setPrice(item.getPrice());
            orderDetail.setDiscount(item.getDiscount());
            orderDetail.setCreatedBy("User");
            orderDetails.add(orderDetail);
        }
        orderDetailsRepository.saveAll(orderDetails);

        return orders;
    }

    @Override
    public Order findByUserIdAndStatus(Long userId, OrderStatus status) {
        return orderRepository.findByUser_IdAndStatus(userId, status);
    }

    @Override
    @Transactional
    public void deleteOrderWhenCancelPayment() {
        var cart = cartService.showCart(CartsStatus.Open);
        var order = orderRepository.getOrderByUserIdAndCreatedAtNearest(cart.getUserId());
        orderRepository.deleteById(order.getId());
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

    private BillingAddress mapToBilling(AddressDto dto) {
        BillingAddress billingAddress = new BillingAddress();
        billingAddress.setFirst_name(dto.getFirstName());
        billingAddress.setLast_name(dto.getLastName());
        billingAddress.setCountry(dto.getCountry());
        billingAddress.setCity(dto.getCity());
        billingAddress.setAddress(dto.getAddress());
        billingAddress.setOptional(dto.getOptional());
        billingAddress.setZipCode(dto.getZipCode());
        billingAddress.setEmail(dto.getEmail());
        billingAddress.setPhone(dto.getPhone());
        billingAddress.setCreatedBy("User");
        return billingAddress;
    }

    @Override
    @Transactional
    public void updateQuantityWarehouse() {
        var cart = cartService.showCart(CartsStatus.Open);
        List<CartItemDto> list = new ArrayList<>();
        list.addAll(cart.getCartItemList());

        for (CartItemDto itemDto: list
        ) {
            var warehouse =
                    warehouseRepository.findByProducts_IdAndColorAndSize(itemDto.getProductId(), itemDto.getColor(), itemDto.getSize());
            if (itemDto.getQuantity()>warehouse.getQuantity()){
                throw new CustomException("Exceed the allowed quantity");
            } else {
                warehouse.setQuantity(warehouse.getQuantity()-itemDto.getQuantity());
            }
            if (warehouse.getQuantity()==0){
                warehouse.setStatus(ProductStatus.OutOfStock);
            }
            warehouseRepository.save(warehouse);
        }
    }

    @Override
    @Transactional
    public void returnQuantity() {
        var carts = cartService.showCart(CartsStatus.Open);
        List<CartItemDto> list = new ArrayList<>();
        list.addAll(carts.getCartItemList());

        for (CartItemDto item: list
             ) {
            var warehouse =
                    warehouseRepository.findByProducts_IdAndColorAndSize(item.getProductId(), item.getColor(), item.getSize());
            warehouse.setQuantity(warehouse.getQuantity() + item.getQuantity());
        }
    }

    @Override
    public Page<?> getAllOrder(Pageable pageable) {
        var list = orderRepository.findAll(pageable);
        List<OrderViewAdmin> listDto = new ArrayList<>();
        for (Order item: list
             ) {
            OrderViewAdmin dto = new OrderViewAdmin();
            dto.setId(item.getId());
            dto.setOrderCode(item.getCode());
            dto.setCreatAt(item.getCreatedAt());
            dto.setCustomerName(item.getFirst_name() + " " + item.getLast_name());
            dto.setTotal(item.getTotalPrice());
            dto.setPhone(item.getPhone());
            dto.setAddress(item.getAddress() + " " + item.getCity());
            dto.setPaymentMethod(item.getPayment().getPaymentMethod());
            dto.setPaymenStatus(item.getPayment().getStatus());
            dto.setStatus(item.getStatus());
            dto.setUsername(item.getUser().getEmail());
            listDto.add(dto);
        }
        return new PageImpl<>(listDto, list.getPageable(), list.getTotalPages());
    }

    @Override
    public Page<?> getOrderByUser(Pageable pageable) {
        String email = JwtFilter.CURRENT_USER;
        userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException("You must log in before"));
        var list = orderRepository.findByUser_Email(email, pageable);
        List<OrderViewAdmin> listDto = new ArrayList<>();
        for (Order item: list
        ) {
            OrderViewAdmin dto = new OrderViewAdmin();
            dto.setId(item.getId());
            dto.setOrderCode(item.getCode());
            dto.setCreatAt(item.getCreatedAt());
            dto.setCustomerName(item.getFirst_name() + " " + item.getLast_name());
            dto.setTotal(item.getTotalPrice());
            dto.setAddress(item.getAddress() + " " + item.getCity());
            dto.setPaymentMethod(item.getPayment().getPaymentMethod());
            dto.setPaymenStatus(item.getPayment().getStatus());
            dto.setStatus(item.getStatus());
            dto.setUsername(item.getUser().getEmail());
            listDto.add(dto);
        }
        return new PageImpl<>(listDto, list.getPageable(), list.getTotalPages() );
    }

    @Override
    public OrderViewAdmin findOrderById(Long orderId) {
        var item = orderRepository.findById(orderId);
        OrderViewAdmin dto = new OrderViewAdmin();
        dto.setId(item.get().getId());
        dto.setOrderCode(item.get().getCode());
        dto.setCreatAt(item.get().getCreatedAt());
        dto.setCustomerName(item.get().getFirst_name() + " " + item.get().getLast_name());
        dto.setPhone(item.get().getPhone());
        dto.setTotal(item.get().getTotalPrice());
        dto.setAddress(item.get().getAddress() + " " + item.get().getCity());
        dto.setPaymentMethod(item.get().getPayment().getPaymentMethod());
        dto.setPaymenStatus(item.get().getPayment().getStatus());
        dto.setStatus(item.get().getStatus());
        dto.setUsername(item.get().getUser().getEmail());
        return dto;
    }

    @Override
    public Page<?> getOrderDetailsByOrderId(Pageable pageable, Long orderId) {
        var list = orderDetailsRepository.findByOrder_Id(orderId, pageable);
        List<OrderDeatilDto> listDto = new ArrayList<>();
        for (Order_details item: list
             ) {
            OrderDeatilDto dto = new OrderDeatilDto();
            dto.setId(item.getId());
            dto.setProductName(item.getProducts().getName());
            dto.setColor(item.getColor());
            dto.setSize(item.getSize());
            dto.setDiscount(item.getDiscount());
            dto.setQuantity(item.getQuantity());
            dto.setPrice(item.getPrice());
            dto.setSubtotal(item.getSubtotal());
            listDto.add(dto);
        }
        return new PageImpl<>(listDto, list.getPageable(), list.getTotalPages());
    }

    @Override
    @Transactional
    public void updateOrderStatus(Long orderId, OrderViewAdmin dto) {
        var order = orderRepository.findById(orderId);
        var payment = paymentRepository.findById(order.get().getPayment().getId());
        if (order.get().getStatus()==OrderStatus.Success){
            throw new  CustomException("Can not change order");
        }
        payment.get().setStatus(dto.getPaymenStatus());
        var paymentSave = paymentRepository.save(payment.get());
        order.get().setStatus(dto.getStatus());
        order.get().setPayment(paymentSave);
        orderRepository.save(order.get());
    }

    @Override
    public void deleteOrder(Long id) {
        var order = orderRepository.findById(id);
        if (order.isEmpty()) {
            throw new CustomException("Invoice do not existed");
        }
        if (order.get().getStatus() == OrderStatus.Success){
            throw new CustomException("You can not delete When Order success");
        }
        orderRepository.deleteById(id);
    }

    @Override
    public Double earningsMonthly() {
        int month = LocalDateTime.now().getMonthValue();
        return orderRepository.getTotalByMonth(month);
    }

    @Override
    public Double earningsYear() {
        int year = LocalDateTime.now().getYear();
        return orderRepository.getTotalByYear(year);
    }

    @Override
    public Integer getOrderPending() {
        return orderRepository.getOrderPending();
    }

    @Override
    public List<Map<String, Object>> getTotalByMonthInCurrentYear() {
        return orderRepository.getTotalByMonthInCurrentYear();
    }

    @Override
    public List<OrderDeatilDto> orderSummary() {
        String email = JwtFilter.CURRENT_USER;
        var user = userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException("You must log in before")
        );

        Long orderId = orderRepository.getOrderIdEarly(user.getId());
        var listoOrderDetails = orderDetailsRepository.getByOrderId(orderId);
        List<OrderDeatilDto> listDto = new ArrayList<>();
        for (Order_details item: listoOrderDetails
             ) {
            var dto = new OrderDeatilDto();
            dto.setId(item.getId());
            dto.setProductName(item.getProducts().getName());
            dto.setSize(item.getSize());
            dto.setColor(item.getColor());
            dto.setQuantity(item.getQuantity());
            dto.setPrice(item.getPrice());
            dto.setDiscount(item.getDiscount());
            dto.setSubtotal(item.getSubtotal());
            listDto.add(dto);
        }
        return listDto;
    }

    @Override
    public String sendMailOrder(CartDto cart, Order order) {
        StringBuilder productsHtml = new StringBuilder();

        for (CartItemDto item : cart.getCartItemList()) {
            String productHtml = "<tr>\n" +
                    "<td style=\"vertical-align: middle;padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\"><img src=\"" + item.getImg() + "\" alt=\"Product\" style=\"max-width: 50px;height: auto;margin-bottom: 10px;vertical-align: middle;\"> " + item.getProductName() + "</td>\n" +
                    "<td style=\"vertical-align: middle;padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\">" + item.getColor() + "/" + item.getSize() + "</td>\n" +
                    "<td style=\"vertical-align: middle;padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\">" + item.getQuantity() + "</td>\n" +
                    "<td style=\"vertical-align: middle;padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\">" + item.getPrice() + "</td>\n" +
                    "<td style=\"vertical-align: middle;padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\">" + item.getDiscount() + "</td>\n" +
                    "<td style=\"vertical-align: middle;padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\">" + item.getSubTotal() + "</td>\n" +
                    "</tr>\n";
            productsHtml.append(productHtml);
        }

        String htmlContent = "<div class=\"container\" style=\"font-family: Arial, sans-serif;\n" +
                "    background-color: #f4f4f4;\n" +
                "    margin: 0;\n" +
                "    padding: 0;\">\n" +
                "    <div style=\"@media screen and (max-width: 600px) { max-width: 100%; border-radius: 0; }; max-width: 600px;\n" +
                "    margin: 20px auto;\n" +
                "    background-color: #fff;\n" +
                "    padding: 20px;\n" +
                "    border-radius: 8px;\n" +
                "    box-shadow: 0 0 10px rgba(0,0,0,0.1); \">\n" +
                "        <h2 style=\"color: #333;\">Order Successfully</h2>\n" +
                "        <div class=\"customer-info\">\n" +
                "            <h3>Customer Information</h3>\n" +
                "            <p><strong>Name: </strong>" + order.getFirst_name() + " " + order.getLast_name() + " </p>\n" +
                "            <p><strong>Email: </strong>" + order.getEmail() + "  </p>\n" +
                "            <p><strong>Address: </strong>" + order.getAddress() + " " + order.getCity() + " </p>\n" +
                "        </div>\n" +
                "        <div class=\"product-info\">\n" +
                "            <h3>Product Information</h3>\n" +
                "            <table style=\"width: 100%;\n" +
                "            border-collapse: collapse;\n" +
                "            margin-top: 20px;\">\n" +
                "                <tr>\n" +
                "                    <th style=\" background-color: #f2f2f2; padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\">Name</th>\n" +
                "                    <th style=\" background-color: #f2f2f2; padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\">Color/Size</th>\n" +
                "                    <th style=\" background-color: #f2f2f2; padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\">Quantity</th>\n" +
                "                    <th style=\" background-color: #f2f2f2; padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\">Price</th>\n" +
                "                    <th style=\" background-color: #f2f2f2; padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\">Discount</th>\n" +
                "                    <th style=\" background-color: #f2f2f2; padding: 10px;text-align: left;border-bottom: 1px solid #ddd;\">Subtotal</th>\n" +
                "                </tr>\n" +
                productsHtml.toString() +
                "            </table>\n" +
                "        </div>\n" +
                "        <div class=\"total-wrapper\" style=\"margin-top: 20px; text-align: right;\">\n" +
                "            <p style=\"margin-bottom: 0;\"><strong>Subtotal:</strong> $" + Math.round(cart.getTotalPrice() * 100.0) / 100.0 + "</p>\n" +
                "            <p style=\"margin-bottom: 0;\"><strong>Tax:</strong> $" + Math.round(order.getTax() * 100.0) / 100.0 + "</p>\n" +
                "            <p style=\"margin-bottom: 0;\"><strong>Shipping:</strong> $" + Math.round(order.getDelivery().getPrice() * 100.0) / 100.0 + "</p>\n" +
                "            <p style=\"display: inline-block; margin-left: 20px; margin-bottom: 0;\"><strong>Total:</strong> $" + Math.round(order.getTotalPrice() * 100.0) / 100.0 + "</p>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>\n" +
                "\n";
        emailService.sendMail(order.getEmail(), "Orders by " + order.getLast_name() + " " + order.getFirst_name(), htmlContent);
        return "Send mail successfully";
    }
}
