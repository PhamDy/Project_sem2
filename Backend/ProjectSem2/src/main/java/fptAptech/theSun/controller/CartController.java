package fptAptech.theSun.controller;

import fptAptech.theSun.dto.CartDto;
import fptAptech.theSun.entity.Carts;
import fptAptech.theSun.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*",maxAge = 3600)
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/{id}")
    @Operation(summary = "Khách hàng thêm sản phẩm vào giỏ hàng")
    public ResponseEntity<?> addProductToCart(@PathVariable Long id,
                                                    @RequestParam(name = "color") String color,
                                                    @RequestParam(name = "size") String size,
                                                    @RequestParam(name = "quantity") Integer quantity) {
        CartDto cartDto = cartService.addToCart(id, color, size, quantity);
        return new ResponseEntity<CartDto>(cartDto, HttpStatus.CREATED);
    }


}
