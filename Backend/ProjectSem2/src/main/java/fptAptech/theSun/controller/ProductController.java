package fptAptech.theSun.controller;

import fptAptech.theSun.dto.ProductDto;
import fptAptech.theSun.entity.Product;
import fptAptech.theSun.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "*",maxAge = 3600)
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    @Operation(summary = "Lấy ra danh sách sản phẩm", description = "Trả về toàn bộ danh sách sản phẩm có trong hệ thống")
    public ResponseEntity<List<Product>> getAllProduct() {
        return ResponseEntity.ok(productService.getList());
    }
//    public ResponseEntity<List<ProductDto>> getAllProduct() {
//        List<ProductDto> productDtoList = productService.getList();
//        return ResponseEntity.ok(productDtoList);
//    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy ra danh sách sản phẩm theo id", description = "Trả về 1 sản phẩm có trong hệ thống để đọc thông tin chi tiết")
    public ResponseEntity<Product> getProduct(@PathVariable int id) {
        return ResponseEntity.ok(productService.getProduct(id));
    }

    @GetMapping("/featured")
    @Operation(summary = "Lấy ra danh sách sản phẩm đặc sắc", description = "Trả về ds sản phẩm có discount nhiều nhất")
    public ResponseEntity<List<Product>> getProductFeatured() {
        return ResponseEntity.ok(productService.getProductFeatured());
    }

    @GetMapping("/newest")
    @Operation(summary = "Lấy ra danh sách sản phẩm mới nhất", description = "Trả về ds sản phẩm khởi tạo gần nhất")
    public ResponseEntity<List<Product>> getProductNewest() {
        return ResponseEntity.ok(productService.getProductNewest());
    }

    @GetMapping("/price-asc")
    @Operation(summary = "Lấy ra danh sách sản phẩm theo giá thấp đến cao")
    public ResponseEntity<List<Product>> getProductPriceAsc() {
        return ResponseEntity.ok(productService.getProductPriceAsc());
    }

    @GetMapping("/price-desc")
    @Operation(summary = "Lấy ra danh sách sản phẩm theo giá cao đến thấp")
    public ResponseEntity<List<Product>> getProductPriceDesc() {
        return ResponseEntity.ok(productService.getProductPriceDesc());
    }


}
