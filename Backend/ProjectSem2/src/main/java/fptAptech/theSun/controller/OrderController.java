package fptAptech.theSun.controller;

import fptAptech.theSun.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "*",maxAge = 3600)
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/showDelivery")
    @Operation(summary = "Show danh sách các phương án vận chuyển để Khách hàng có thể lựa chọn")
    public ResponseEntity<?> showDelivery() {
        return new ResponseEntity<>(orderService.getAllDelivery(), HttpStatus.OK);
    }


}
