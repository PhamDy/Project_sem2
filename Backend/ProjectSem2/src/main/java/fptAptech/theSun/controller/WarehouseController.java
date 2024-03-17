package fptAptech.theSun.controller;

import fptAptech.theSun.service.WarehouseService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/warehouse")
@CrossOrigin(origins = "*",maxAge = 3600)
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;

    @GetMapping("/quantityProduct/{productId}")
    @Operation(summary = "Lấy ra số lượng product thông qua productId, color và size")
    public ResponseEntity<?> getQuantityProduct(@PathVariable Long productId,
                                                @RequestParam(name = "color") String color,
                                                @RequestParam(name = "size") String size) {
        Integer quantity = warehouseService.getQuantityProduct(productId, color, size);
        return new ResponseEntity<>(quantity, HttpStatus.OK);
    }

    @GetMapping("/color/{productId}")
    @Operation(summary = "Lấy ra danh sách color mà productId có")
    public ResponseEntity<?> getColorProduct(@PathVariable Long productId) {
        return new ResponseEntity<>(warehouseService.getByColor(productId), HttpStatus.OK);
    }

    @GetMapping("/size/{productId}")
    @Operation(summary = "Lấy ra danh sách size mà productId có")
    public ResponseEntity<?> getSizeProduct(@PathVariable Long productId) {
        return new ResponseEntity<>(warehouseService.getBySize(productId), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    @Operation(summary = "Update quantity của sản phẩm")
    public ResponseEntity<?> updateQuantity(@PathVariable Long id, @RequestParam(name = "color") String color,
                                            @RequestParam(name = "size") String size, @RequestParam(name = "quantity") Integer quantity) {
        warehouseService.save(id, color, size, quantity);
        return new ResponseEntity<>("Update successfully", HttpStatus.CREATED);
    }


}
