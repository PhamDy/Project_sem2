package fptAptech.theSun.controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import fptAptech.theSun.config.Utils;
import fptAptech.theSun.dto.OrderRequestDto;
import fptAptech.theSun.dto.OrderViewAdmin;
import fptAptech.theSun.entity.Enum.CartsStatus;
import fptAptech.theSun.entity.Enum.OrderStatus;
import fptAptech.theSun.entity.Enum.PaymenStatus;
import fptAptech.theSun.entity.Enum.RoleName;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.paypal.PaypalPaymentIntent;
import fptAptech.theSun.paypal.PaypalPaymentMethod;
import fptAptech.theSun.paypal.PaypalService;
import fptAptech.theSun.respository.DeliveryRepository;
import fptAptech.theSun.respository.UserRepository;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.service.CartService;
import fptAptech.theSun.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;


@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "*",maxAge = 3600)
public class OrderController {

    public static final String URL_PAYPAL_SUCCESS = "pay/success";
    public static final String URL_PAYPAL_CANCEL = "pay/cancel";

    private Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaypalService paypalService;

    @Autowired
    private CartService cartService;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/paypal")
    @Operation(summary = "Khách hàng bấm vào thanh toán với paypal")
    private ResponseEntity<?> placeOrder(HttpServletRequest request, @Valid @RequestBody OrderRequestDto dto){
        String cancelUrl = Utils.getBaseURL(request) + "/api/order/" + URL_PAYPAL_CANCEL;
        String successUrl = Utils.getBaseURL(request) + "/api/order/" + URL_PAYPAL_SUCCESS;

        var delivery = deliveryRepository.findById(dto.getDeliveryId())
                .orElseThrow(() -> new CustomException("Delivery not found"));
        var cart = cartService.showCart(CartsStatus.Open);
        Double tax = getTax(cart.getTotalPrice());
        Double totalOrder1 = cart.getTotalPrice() + delivery.getPrice() + tax;

        Double totalOrder = Math.round(totalOrder1 * 100.0) / 100.0;

        try {
            Payment payment = paypalService.createPayment(
                    totalOrder,
                    "USD",
                    PaypalPaymentMethod.paypal,
                    PaypalPaymentIntent.sale,
                    "payment description",
                    cancelUrl,
                    successUrl);

            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    orderService.saveOrderByDtoPaypal(dto, tax, totalOrder);
                    return ResponseEntity.ok(links.getHref());
                }
            }
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the payment.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to retrieve payment approval URL.");
    }

    // URL_PAYPAL_SUCCESS = http://localhost:8080/api/order/pay/success
    @GetMapping(URL_PAYPAL_SUCCESS)
    @Operation(summary = "Khi khách hàng thanh toán với Paypal thành công, cập nhập trạng thái thanh toán của đơn hàng sang paid")
    public ResponseEntity<?> successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try{
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if(payment.getState().equals("approved")){
                String email = JwtFilter.CURRENT_USER;
                var user = userRepository.findByEmail(email).orElseThrow(() ->
                        new CustomException("You must log in before")
                );
                orderService.updateQuantityWarehouse();
                var order = orderService.findByUserIdAndStatus(user.getId(), OrderStatus.Pending);
                order.getPayment().setStatus(PaymenStatus.Paid);
                order.setStatus(OrderStatus.Confirmed);
                orderService.saveOrder(order);
                var cart = cartService.showCart(CartsStatus.Open);
                orderService.sendMailOrder(cart, order);
                cartService.changeStatusCart(cart.getId(), CartsStatus.Close);

                URI uri = URI.create("http://127.0.0.1:5500/ordersuccess.html");
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.setLocation(uri);
                return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
            }
        }		 catch (PayPalRESTException e) {
            log.error(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment not approved.");
    }

    // URL_PAYPAL_CANCEL = http://localhost:8080/api/order/pay/cancel
    @GetMapping(URL_PAYPAL_CANCEL)
    @Operation(summary = "Khi khách hàng thanh toán với Paypal thất bại")
    private ResponseEntity<?> cancelPaypal(){
        orderService.deleteOrderWhenCancelPayment();
        orderService.returnQuantity();

        URI uri = URI.create("http://127.0.0.1:5500/ordersuccess.html");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(uri);
        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }

    @GetMapping("/orderSummary")
    @Operation(summary = "Show ra đơn hàng Summary khách hàng vừa đặt")
    public ResponseEntity<?> showOrderSummary() {
        return new ResponseEntity<>(orderService.orderSummary(), HttpStatus.OK);
    }

    @GetMapping("/showDelivery")
    @Operation(summary = "Show danh sách các phương án vận chuyển để Khách hàng có thể lựa chọn")
    public ResponseEntity<?> showDelivery() {
        return new ResponseEntity<>(orderService.getAllDelivery(), HttpStatus.OK);
    }

    @GetMapping("/")
    @Operation(summary = "Show danh sách các đơn hàng trong trang Admin và tối đa 5 đơn hàng trong 1 trang")
    public ResponseEntity<?> getAllOrder(@PageableDefault(size = 5, sort = "id", direction = Sort.Direction.ASC)
                                         Pageable pageable) {
        return new ResponseEntity<>(orderService.getAllOrder(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Hiển thị thông tin Order bằng Id")
    public ResponseEntity<?> getOrderById(@PathVariable(name = "id") Long id) {
        return new ResponseEntity<>(orderService.findOrderById(id) ,HttpStatus.OK);
    }

    @GetMapping("/page/user")
    @Operation(summary = "Show danh sách các đơn hàng trong trang Admin của User nào đó ta tìm kiếm và tối đa 5 đơn hàng trong 1 trang")
    public ResponseEntity<?> getOrderByUser(@PageableDefault(size = 15, sort = "id", direction = Sort.Direction.ASC)
                                                 Pageable pageable) {
        return new ResponseEntity<>(orderService.getOrderByUser(pageable), HttpStatus.OK);
    }

    @GetMapping("/page/orderDetails/{id}")
    @Operation(summary = "Show danh sách order details trong order theo orderId trong trang Admin và tối đa 5 đơn hàng trong 1 trang")
    public ResponseEntity<?> getOrderByUser(@PathVariable(name = "id") Long id,
            @PageableDefault(size = 5, sort = "id", direction = Sort.Direction.ASC)
                                                    Pageable pageable) {
        return new ResponseEntity<>(orderService.getOrderDetailsByOrderId(pageable, id), HttpStatus.OK);
    }

//    @Secured({"ROLE_ADMIN"})
    @PatchMapping("/{id}")
    @Operation(summary = "Admin thay đổi statusOrder hoặc paymenStatus trong order")
    public ResponseEntity<?> updateOrder(@PathVariable(name = "id") Long id,
                                         @RequestBody OrderViewAdmin orderViewAdmin) {
        orderService.updateOrderStatus(id, orderViewAdmin);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN"})
    @DeleteMapping("/{id}")
    @Operation(summary = "Admin xóa order theo id")
    public ResponseEntity<?> deleteOrderById(@PathVariable(name = "id") Long id) {
        orderService.deleteOrder(id);
        return new ResponseEntity<>("Order id " + id + " was deleted",HttpStatus.OK);
    }

    public Double getTax(Double total) {
        if (total<= 100 && total>0) {
            return total*0.1;
        } else if (total>100 && total<=500) {
            return total*0.08;
        } else {
            return total*0.05;
        }
    }

    @GetMapping("/toalByMonth")
    @Operation(summary = "Lấy ra doanh thu theo tháng hiện tại")
    public ResponseEntity<?> earningsMonthly() {
        return new ResponseEntity<>(orderService.earningsMonthly(), HttpStatus.OK);
    }

    @GetMapping("/toalByYear")
    @Operation(summary = "Lấy ra doanh thu theo năm hiện tại")
    public ResponseEntity<?> earningsYear() {
        return new ResponseEntity<>(orderService.earningsYear(), HttpStatus.OK);
    }

    @GetMapping("/orderPending")
    @Operation(summary = "Lấy ra số lượng order đang xử lý")
    public ResponseEntity<?> getOrderPending() {
        return new ResponseEntity<>(orderService.getOrderPending(), HttpStatus.OK);
    }

    @GetMapping("/totalOrders")
    @Operation(summary = "Show ra đơn hàng Summary khách hàng vừa đặt")
    public ResponseEntity<?> getCountOrdersByMonth() {
        return new ResponseEntity<>(orderService.getCountOrdersByMonth(), HttpStatus.OK);
    }

    @GetMapping("/orderSuccess")
    @Operation(summary = "Lấy ra số lượng order đã thành công")
    public ResponseEntity<?> getOrderSuccess() {
        return new ResponseEntity<>(orderService.getOrderSuccess(), HttpStatus.OK);
    }

    @GetMapping("/orderCancel")
    @Operation(summary = "Lấy ra số lượng order bị hủy")
    public ResponseEntity<?> getOrderCancel() {
        return new ResponseEntity<>(orderService.getOrderCancel(), HttpStatus.OK);
    }

    @GetMapping("/revenue")
    @Operation(summary = "Lấy ra doanh thu theo tháng hiện tại")
    public ResponseEntity<?> getTotalByMonthInCurrentYear() {
        return new ResponseEntity<>(orderService.getTotalByMonthInCurrentYear(), HttpStatus.OK);
    }

}
