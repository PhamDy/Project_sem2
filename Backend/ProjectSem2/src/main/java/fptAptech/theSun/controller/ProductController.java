package fptAptech.theSun.controller;

import fptAptech.theSun.dto.ProductDto;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private fptAptech.theSun.service.productService productService;

    @GetMapping("/")
    @Operation(summary = "Lấy ra danh sách sản phẩm", description = "Trả về toàn bộ danh sách sản phẩm có trong hệ thống")
    public ResponseEntity<List<ProductDto>> getAllProduct() {
        List<ProductDto> productDtoList = productService.getList();
        return ResponseEntity.ok(productDtoList);
    }


}
