package fptAptech.theSun.controller;

import fptAptech.theSun.dto.FillterRequestDto;
import fptAptech.theSun.entity.Product;
import fptAptech.theSun.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> getAllProduct() {
        return new ResponseEntity<>(productService.getList(), HttpStatus.OK);
    }
//    public ResponseEntity<List<ProductDto>> getAllProduct() {
//        List<ProductDto> productDtoList = productService.getList();
//        return ResponseEntity.ok(productDtoList);
//    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy ra danh sách sản phẩm theo id", description = "Trả về 1 sản phẩm có trong hệ thống để đọc thông tin chi tiết")
    public ResponseEntity<?> getProduct(@PathVariable int id) {
        return new ResponseEntity<>(productService.getProduct(id), HttpStatus.OK);
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

    @GetMapping("/filter")
    @Operation(summary = "Lấy ra danh sách sản phẩm theo các tiêu chí lọc")
    public ResponseEntity<?> getProductsByFilters(
            @RequestBody(required = false) FillterRequestDto fillterRequestDto,
            @RequestParam(name = "discount", required = false, defaultValue = "false") Boolean discount,
            @RequestParam(name = "under50", required = false, defaultValue = "false") Boolean under50,
            @RequestParam(name = "50-100", required = false, defaultValue = "false") Boolean between50And100,
            @RequestParam(name = "100-250", required = false, defaultValue = "false") Boolean between100And250,
            @RequestParam(name = "over250", required = false, defaultValue = "false") Boolean over250,
            @RequestParam(defaultValue = "desc") String sortDirection,
            @RequestParam(defaultValue = "price") String sortBy)

    {

        List<Product> products = productService.getProductsByFillters(
                fillterRequestDto,
                discount, under50, between50And100, between100And250, over250, sortDirection ,sortBy);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


}
