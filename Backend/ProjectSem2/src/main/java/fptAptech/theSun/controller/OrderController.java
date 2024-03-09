package fptAptech.theSun.controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import fptAptech.theSun.config.Utils;
import fptAptech.theSun.dto.OrderRequestDto;
import fptAptech.theSun.entity.Enum.CartsStatus;
import fptAptech.theSun.entity.Enum.OrderStatus;
import fptAptech.theSun.entity.Enum.PaymenStatus;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.paypal.PaypalPaymentIntent;
import fptAptech.theSun.paypal.PaypalPaymentMethod;
import fptAptech.theSun.paypal.PaypalService;
import fptAptech.theSun.respository.DeliveryRepository;
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

    @PostMapping("/paypal")
    @Operation(summary = "Khách hàng bấm vào thanh toán với paypal")
    private ResponseEntity<?> placeOrder(HttpServletRequest request, @Valid @RequestBody OrderRequestDto dto){
        String cancelUrl = Utils.getBaseURL(request) + "/api/order/" + URL_PAYPAL_CANCEL;
        String successUrl = Utils.getBaseURL(request) + "/api/order/" + URL_PAYPAL_SUCCESS;

        var delivery = deliveryRepository.findById(dto.getDeliveryId())
                .orElseThrow(() -> new CustomException("Delivery not found"));
        var cart = cartService.showCart(CartsStatus.Open);
        Double tax = getTax(cart.getTotalPrice());
        Double totalOrder = cart.getTotalPrice() + delivery.getPrice() + tax;

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
                    orderService.updateQuantityWarehouse();
                    orderService.saveOrderByDtoPaypal(dto, payment.getId(), tax, totalOrder);
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
                var order = orderService.findByPaymentId(paymentId);
                order.getPayment().setStatus(PaymenStatus.Paid);
                order.setStatus(OrderStatus.Confirmed);
                orderService.saveOrder(order);
                var cart = cartService.showCart(CartsStatus.Open);
                orderService.sendMailOrder(cart, order);
                cartService.changeStatusCart(cart.getId(), CartsStatus.Close);

                URI uri = URI.create("https://aptech.fpt.edu.vn/");
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

        URI uri = URI.create("https://www.google.com/");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(uri);
        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }

    @GetMapping("/showDelivery")
    @Operation(summary = "Show danh sách các phương án vận chuyển để Khách hàng có thể lựa chọn")
    public ResponseEntity<?> showDelivery() {
        return new ResponseEntity<>(orderService.getAllDelivery(), HttpStatus.OK);
    }

    @GetMapping("/testSendMail")
    public ResponseEntity<?> testSendMail() {
        orderService.testSendMail();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/page")
    public ResponseEntity<?> getAllOrder(@PageableDefault(size = 5, sort = "id", direction = Sort.Direction.ASC)
                                         Pageable pageable) {
        return new ResponseEntity<>(orderService.getAllOrder(pageable), HttpStatus.OK);
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

}
