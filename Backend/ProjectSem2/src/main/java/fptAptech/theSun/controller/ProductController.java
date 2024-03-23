package fptAptech.theSun.controller;

import fptAptech.theSun.dto.CreateProductDto;
import fptAptech.theSun.dto.EditProductDto;
import fptAptech.theSun.dto.FilterDto;
import fptAptech.theSun.dto.ProductViewDto;
import fptAptech.theSun.dto.mapper.ObjectMapper;
import fptAptech.theSun.entity.Products;
import fptAptech.theSun.respository.ProductRepository;
import fptAptech.theSun.respository.specification.ProductSpecification;
import fptAptech.theSun.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*",maxAge = 3600)
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    @Operation(summary = "Lấy ra danh sách sản phẩm", description = "Trả về toàn bộ danh sách sản phẩm có trong hệ thống")
    public ResponseEntity<?> getAllProduct() {
        return new ResponseEntity<>(productService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy ra danh sách sản phẩm theo id", description = "Trả về 1 sản phẩm có trong hệ thống để đọc thông tin chi tiết")
    public ResponseEntity<?> getProduct(@PathVariable Long id) {
        return new ResponseEntity<>(productService.getProduct(id), HttpStatus.OK);
    }

    @GetMapping("/getGender")
    @Operation(summary = "Lấy ra danh sách Gender")
    public ResponseEntity<?> getGender() {
        return new ResponseEntity<>(productService.getGender(), HttpStatus.OK);
    }

    @GetMapping("/getBrand")
    @Operation(summary = "Lấy ra danh sách Brand")
    public ResponseEntity<?> getBrand() {
        return new ResponseEntity<>(productService.getBrand(), HttpStatus.OK);
    }

    @PostMapping("/addProduct")
    @Operation(summary = "Tạo mới sản phẩm, đồn thời tạo mới warehouse")
    public ResponseEntity<?>addProduct(@Valid @RequestBody CreateProductDto dto){
        productService.createProduct(dto);
        return new ResponseEntity<>("Add product successfully!", HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Sửa thông tin sản phẩm, không bao gồm size color và số lượng")
    public ResponseEntity<?>editProduct(@Valid @RequestBody EditProductDto dto, @PathVariable Long id){
        productService.editProduct(dto, id);
        return new ResponseEntity<>("Edit product successfully!", HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<?>testfilter(@RequestBody(required = false) FilterDto dto){
        return new ResponseEntity<>(productService.filterProducts(dto), HttpStatus.OK);
    }

}
