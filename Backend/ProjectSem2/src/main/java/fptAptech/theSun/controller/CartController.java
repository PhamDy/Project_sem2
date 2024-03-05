package fptAptech.theSun.controller;

import fptAptech.theSun.dto.UpdateQuantityDto;
import fptAptech.theSun.entity.Enum.CartsStatus;
import fptAptech.theSun.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*",maxAge = 3600)
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/showCart")
    @Operation(summary = "Show giỏ hàng cho khách hàng xem")
    public ResponseEntity<?> showCart() {
        return new ResponseEntity<>(cartService.showCart(CartsStatus.Open), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    @Operation(summary = "Khách hàng thêm sản phẩm vào giỏ hàng")
    public ResponseEntity<?> addProductToCart(@PathVariable Long id,
                                                    @RequestParam(name = "color") String color,
                                                    @RequestParam(name = "size") String size,
                                                    @RequestParam(name = "quantity") Integer quantity) {
        cartService.addToCart(id, color, size, quantity);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/updateQuantity")
    @Operation(summary = "Cập nhập số lượng item có trong giỏ hàng khi click vào nút Update Cart", description = "Update số lượng item theo cartItemId")
    public ResponseEntity<?> updateQuantity(@RequestBody List<UpdateQuantityDto> dtos) {
        cartService.updateQuantity(dtos);
        return new ResponseEntity<>("Items has been updated " , HttpStatus.OK);
    }

    @DeleteMapping("/deleteItem/{id}")
    @Operation(summary = "Xóa item sản phẩm có trong giỏ hàng", description = "Xóa CartItem có trong Cart dựa theo cartItemId")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long id) {
        cartService.deleteCariItem(id);
        return new ResponseEntity<>("Cart Item id: " + id + " removed your cart" ,HttpStatus.OK);
    }


}
