package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.*;
import fptAptech.theSun.email.EmailService;
import fptAptech.theSun.entity.BillingAddress;
import fptAptech.theSun.entity.Enum.CartsStatus;
import fptAptech.theSun.entity.Enum.OrderStatus;
import fptAptech.theSun.entity.Enum.ProductStatus;
import fptAptech.theSun.entity.Order;
import fptAptech.theSun.entity.Order_details;
import fptAptech.theSun.entity.Payment;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.*;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.service.CartService;
import fptAptech.theSun.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    private static int i = 1;
    private static int nextOrderId = i++;
    private static final long TIMEOUT_DURATION_MS = 10 * 1000;

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
    public OrderViewDto sendMailOrder(CartDto cartDto, Order order) {
        OrderViewDto view = new OrderViewDto();
        view.setOrder(order);
        view.setCartDto(cartDto);
        emailService.sendMail(order.getEmail(), "Orders by " + order.getLast_name() + " " + order.getFirst_name(),view.toString() + test);
        return view;
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

        var billingAddress = new BillingAddress();
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
    public Order findByPaymentId(String id) {
        var order = orderRepository.findByPayment_Id(id);
        if (order == null) {
            throw new CustomException("Order not found");
        }
        return order;
    }

    @Override
    @Transactional
    public void deleteOrderWhenCancelPayment() {
        var cart = cartService.showCart(CartsStatus.Open);
        var order = orderRepository.getOrderByUserIdAndCreatedAtNearest(cart.getUserId());
        orderRepository.deleteById(order.getId());
//        paymentRepository.deleteById(order.getPayment().getId());
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
    public void testSendMail() {
        String email = JwtFilter.CURRENT_USER;
        var user = Optional.ofNullable(userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException("You must log in before!")));
        var cart = cartService.showCart(CartsStatus.Open);

        String htmlContent = "<html><body>" +
                "<h1>Thông tin đơn hàng</h1>" +
                "<p>Mã đơn hàng: " + cart.getId() + "</p>" +
                "<p>Email khách hàng: " + cart.getTotalPrice() + "</p>" +
                "<p>Sản phẩm: " + user.get().getUserName() + "</p>" +
                //Thêm các thông tin khác nếu cần
                "</body></html>";

        emailService.sendMail(user.get().getEmail(), "Order By Walkz", test);
    }

    public static String test = "    <div class=\"container-fluid my-5  d-flex  justify-content-center\">\n" +
            "        <div class=\"card card-1\">\n" +
            "            <div class=\"card-header bg-white\">\n" +
            "                <div class=\"media flex-sm-row flex-column-reverse justify-content-between  \">\n" +
            "                    <div class=\"col my-auto\"> <h4 class=\"mb-0\">Thanks for your Order,<span class=\"change-color\">Anjali</span> !</h4> </div>\n" +
            "                    <div class=\"col-auto text-center  my-auto pl-0 pt-sm-4\"> <img class=\"img-fluid my-auto align-items-center mb-0 pt-3\"  src=\"https://i.imgur.com/7q7gIzR.png\" width=\"115\" height=\"115\"> <p class=\"mb-4 pt-0 Glasses\">Glasses For Everyone</p>  </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"card-body\">\n" +
            "                <div class=\"row justify-content-between mb-3\">\n" +
            "                    <div class=\"col-auto\"> <h6 class=\"color-1 mb-0 change-color\">Receipt</h6> </div>\n" +
            "                    <div class=\"col-auto  \"> <small>Receipt Voucher : 1KAU9-84UIL</small> </div>\n" +
            "                </div>\n" +
            "                <div class=\"row\">\n" +
            "                    <div class=\"col\">\n" +
            "                        <div class=\"card card-2\">\n" +
            "                            <div class=\"card-body\">\n" +
            "                                <div class=\"media\">\n" +
            "                                    <div class=\"sq align-self-center \"> <img class=\"img-fluid  my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0\" src=\"https:https://i.postimg.cc/6p2JCr26/adidas1-1.jpg\" width=\"135\" height=\"135\" /> </div>\n" +
            "                                    <div class=\"media-body my-auto text-right\">\n" +
            "                                        <div class=\"row  my-auto flex-column flex-md-row\">\n" +
            "                                            <div class=\"col my-auto\"> <h6 class=\"mb-0\"> Jack Jacs</h6>  </div>\n" +
            "                                            <div class=\"col-auto my-auto\"> <small>Golden Rim </small></div>\n" +
            "                                            <div class=\"col my-auto\"> <small>Size : M</small></div>\n" +
            "                                            <div class=\"col my-auto\"> <small>Qty : 1</small></div>\n" +
            "                                            <div class=\"col my-auto\"><h6 class=\"mb-0\">&#8377;3,600.00</h6>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            "                                <hr class=\"my-3 \">\n" +
            "                                <div class=\"row\">\n" +
            "                                    <div class=\"col-md-3 mb-3\"> <small> Track Order <span><i class=\" ml-2 fa fa-refresh\"  aria-hidden=\"true\"></i></span></small> </div>\n" +
            "                                    <div class=\"col mt-auto\">\n" +
            "                                        <div class=\"progress my-auto\"> <div class=\"progress-bar progress-bar  rounded\" style=\"width: 62%\" role=\"progressbar\" aria-valuenow=\"25\" aria-valuemin=\"0\"  aria-valuemax=\"100\"></div> </div>\n" +
            "                                        <div class=\"media row justify-content-between \">\n" +
            "                                            <div class=\"col-auto text-right\"><span> <small  class=\"text-right mr-sm-2\"></small> <i class=\"fa fa-circle active\"></i> </span></div>\n" +
            "                                            <div class=\"flex-col\"> <span> <small class=\"text-right mr-sm-2\">Out for delivary</small><i class=\"fa fa-circle active\"></i></span></div>\n" +
            "                                            <div class=\"col-auto flex-col-auto\"><small  class=\"text-right mr-sm-2\">Delivered</small><span> <i  class=\"fa fa-circle\"></i></span></div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <div class=\"row mt-4\">\n" +
            "                    <div class=\"col\">\n" +
            "                        <div class=\"card card-2\">\n" +
            "                            <div class=\"card-body\">\n" +
            "                                <div class=\"media\">\n" +
            "                                    <div class=\"sq align-self-center \"> <img class=\"img-fluid  my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0\" src=\"https://i.postimg.cc/XJgTnxhL/adidas2-1.jpg\" width=\"135\" height=\"135\" /> </div>\n" +
            "                                    <div class=\"media-body my-auto text-right\">\n" +
            "                                        <div class=\"row  my-auto flex-column flex-md-row\">\n" +
            "                                            <div class=\"col-auto my-auto \"> <h6 class=\"mb-0\"> Michel Mark</h6> </div>\n" +
            "                                            <div class=\"col my-auto  \"> <small>Black Rim </small></div>\n" +
            "                                            <div class=\"col my-auto  \"> <small>Size : L</small></div>\n" +
            "                                            <div class=\"col my-auto  \"> <small>Qty : 1</small></div>\n" +
            "                                            <div class=\"col my-auto \">  <h6 class=\"mb-0\">&#8377;1,235.00</h6>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            "                                <hr class=\"my-3 \">\n" +
            "                                <div class=\"row \">\n" +
            "                                    <div class=\"col-md-3 mb-3\">  <small> Track Order <span><i class=\" ml-2 fa fa-refresh\" aria-hidden=\"true\"></i></span></small> </div>\n" +
            "                                    <div class=\"col mt-auto\">\n" +
            "                                        <div class=\"progress\"><div class=\"progress-bar progress-bar  rounded\" style=\"width: 18%\"  role=\"progressbar\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div> </div>\n" +
            "                                        <div class=\"media row justify-content-between \">\n" +
            "                                            <div class=\"col-auto text-right\"><span> <small  class=\"text-right mr-sm-2\"></small> <i class=\"fa fa-circle active\"></i> </span></div>\n" +
            "                                            <div class=\"flex-col\"> <span> <small class=\"text-right mr-sm-2\">Out for delivary</small><i class=\"fa fa-circle\"></i></span></div>\n" +
            "                                            <div class=\"col-auto flex-col-auto\"><smallclass=\"text-right mr-sm-2>Delivered</small><span> <i class=\"fa fa-circle\"></i></span></div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <div class=\"row mt-4\">\n" +
            "                    <div class=\"col\">\n" +
            "                        <div class=\"row justify-content-between\">\n" +
            "                            <div class=\"col-auto\"><p class=\"mb-1 text-dark\"><b>Order Details</b></p></div>\n" +
            "                            <div class=\"flex-sm-col text-right col\"> <p class=\"mb-1\"><b>Total</b></p> </div>\n" +
            "                            <div class=\"flex-sm-col col-auto\"> <p class=\"mb-1\">&#8377;4,835</p> </div>\n" +
            "                        </div>\n" +
            "                        <div class=\"row justify-content-between\">\n" +
            "                            <div class=\"flex-sm-col text-right col\"><p class=\"mb-1\"> <b>Discount</b></p> </div>\n" +
            "                            <div class=\"flex-sm-col col-auto\"><p class=\"mb-1\">&#8377;150</p></div>\n" +
            "                        </div>\n" +
            "                        <div class=\"row justify-content-between\">\n" +
            "                            <div class=\"flex-sm-col text-right col\"><p class=\"mb-1\"><b>GST 18%</b></p></div>\n" +
            "                            <div class=\"flex-sm-col col-auto\"><p class=\"mb-1\">843</p></div>\n" +
            "                        </div>\n" +
            "                        <div class=\"row justify-content-between\">\n" +
            "                            <div class=\"flex-sm-col text-right col\"><p class=\"mb-1\"><b>Delivery Charges</b></p></div>\n" +
            "                            <div class=\"flex-sm-col col-auto\"><p class=\"mb-1\">Free</p></div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <div class=\"row invoice \">\n" +
            "                    <div class=\"col\"><p class=\"mb-1\"> Invoice Number : 788152</p><p class=\"mb-1\">Invoice Date : 22 Dec,2019</p><p class=\"mb-1\">Recepits Voucher:18KU-62IIK</p></div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"card-footer\">\n" +
            "                <div class=\"jumbotron-fluid\">\n" +
            "                    <div class=\"row justify-content-between \">\n" +
            "                        <div class=\"col-sm-auto col-auto my-auto\"><img class=\"img-fluid my-auto align-self-center \" src=\"https://i.imgur.com/7q7gIzR.png\" width=\"115\" height=\"115\"></div>\n" +
            "                        <div class=\"col-auto my-auto \"><h2 class=\"mb-0 font-weight-bold\">TOTAL PAID</h2></div>\n" +
            "                        <div class=\"col-auto my-auto ml-auto\"><h1 class=\"display-3 \">&#8377; 5,528</h1></div>\n" +
            "                    </div>\n" +
            "                    <div class=\"row mb-3 mt-3 mt-md-0\">\n" +
            "                        <div class=\"col-auto border-line\"> <small class=\"text-white\">PAN:AA02hDW7E</small></div>\n" +
            "                        <div class=\"col-auto border-line\"> <small class=\"text-white\">CIN:UMMC20PTC </small></div>\n" +
            "                        <div class=\"col-auto \"><small class=\"text-white\">GSTN:268FD07EXX </small> </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "        <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">\n" +
            "        <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js\">\n" +
            "        <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js\">    \n" +
            "    </div>\n";
}
