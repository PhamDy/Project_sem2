package fptAptech.theSun.controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import fptAptech.theSun.config.Utils;
import fptAptech.theSun.dto.OrderRequestDto;
import fptAptech.theSun.email.EmailService;
import fptAptech.theSun.entity.Enum.PaymenStatus;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.paypal.PaypalPaymentIntent;
import fptAptech.theSun.paypal.PaypalPaymentMethod;
import fptAptech.theSun.respository.DeliveryRepository;
import fptAptech.theSun.respository.PaymentRepository;
import fptAptech.theSun.service.CartService;
import fptAptech.theSun.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
    private EmailService emailService;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @PostMapping("/paypal")
    @Operation(summary = "Khách hàng bấm vào thanh toán với paypal")
    private ResponseEntity<?> placeOrder(HttpServletRequest request, @RequestBody OrderRequestDto dto){
        String cancelUrl = Utils.getBaseURL(request) + "/api/order/" + URL_PAYPAL_CANCEL;
        String successUrl = Utils.getBaseURL(request) + "/api/order/" + URL_PAYPAL_SUCCESS;

        var delivery = deliveryRepository.findById(dto.getDeliveryId())
                .orElseThrow(() -> new CustomException("Delivery not found"));
        var cart = cartService.showCart();
        Double tax;
        if (cart.getTotalPrice()<= 100 && cart.getTotalPrice()>0) {
            tax = cart.getTotalPrice()*0.1;
        } else if (cart.getTotalPrice()>100 && cart.getTotalPrice()<=500) {
            tax = cart.getTotalPrice()*0.08;
        } else {
            tax = cart.getTotalPrice()*0.05;
        }
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
                    var order = orderService.saveOrderByDtoPaypal(dto, payment.getId(), tax, totalOrder);
//                    return ResponseEntity.ok(Map.of("approvalUrl", links.getHref(), "paymentId", payment.getId()));
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
                orderService.saveOrder(order);
                return ResponseEntity.status(HttpStatus.OK).body("Payment success");
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
        return ResponseEntity.status(HttpStatus.OK).body("Payment canceled");
    }

    @GetMapping("/showDelivery")
    @Operation(summary = "Show danh sách các phương án vận chuyển để Khách hàng có thể lựa chọn")
    public ResponseEntity<?> showDelivery() {
        return new ResponseEntity<>(orderService.getAllDelivery(), HttpStatus.OK);
    }



}
