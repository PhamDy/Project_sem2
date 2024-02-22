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

    @GetMapping("/quantityProduct/{id}")
    @Operation(summary = "Lấy ra số lượng product thông qua productId, color và size")
    public ResponseEntity<?> getQuantityProduct(@PathVariable Long productId,
                                                @RequestParam(name = "color") String color,
                                                @RequestParam(name = "size") String size) {
        Integer quantity = warehouseService.getQuantityProduct(productId, color, size);
        return new ResponseEntity<>(quantity, HttpStatus.OK);
    }


}
