package fptAptech.theSun.controller;

import fptAptech.theSun.dto.CreateProductDto;
import fptAptech.theSun.dto.ProductViewDto;
import fptAptech.theSun.dto.mapper.ObjectMapper;
import fptAptech.theSun.entity.Products;
import fptAptech.theSun.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/filter")
    @Operation(summary = "Lấy ra danh sách sản phẩm theo các tiêu chí lọc")
    public ResponseEntity<?> getProductsByFilters(
            @RequestParam(name = "gender1", required = false) String gender1,
            @RequestParam(name = "gender2", required = false) String gender2,
            @RequestParam(name = "gender3", required = false) String gender3,
//            @RequestParam(name = "gender", required = false) List<String> gender,
            @RequestParam(name = "brand1", required = false) String brand1,
            @RequestParam(name = "brand2", required = false) String brand2,
            @RequestParam(name = "brand3", required = false) String brand3,
            @RequestParam(name = "brand4", required = false) String brand4,
            @RequestParam(name = "brand5", required = false) String brand5,
            @RequestParam(name = "category1", required = false) String category1,
            @RequestParam(name = "category2", required = false) String category2,
            @RequestParam(name = "category3", required = false) String category3,
            @RequestParam(name = "color1", required = false) String color1,
            @RequestParam(name = "color2", required = false) String color2,
            @RequestParam(name = "color3", required = false) String color3,
            @RequestParam(name = "color4", required = false) String color4,
            @RequestParam(name = "color5", required = false) String color5,
            @RequestParam(name = "color6", required = false) String color6,
            @RequestParam(name = "color7", required = false) String color7,
            @RequestParam(name = "discount", required = false, defaultValue = "false") Boolean discount,
            @RequestParam(name = "under50", required = false, defaultValue = "false") Boolean under50,
            @RequestParam(name = "50-100", required = false, defaultValue = "false") Boolean between50And100,
            @RequestParam(name = "100-250", required = false, defaultValue = "false") Boolean between100And250,
            @RequestParam(name = "over250", required = false, defaultValue = "false") Boolean over250,
            @RequestParam(defaultValue = "desc") String sortDirection,
            @RequestParam(defaultValue = "price") String sortBy
    )

    {


        List<Products> products = productService.getProductsByFilters(gender1, gender2, gender3,
                brand1, brand2, brand3, brand4, brand5,
                category1, category2, category3,
                color1, color2, color3, color4, color5, color6, color7,
                discount, under50, between50And100, between100And250, over250,
                sortDirection, sortBy);

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/addProduct")
    @Operation(summary = "Tạo mới sản phẩm, đồn thời tạo mới warehouse")
    public ResponseEntity<?>addProduct(@Valid @ModelAttribute CreateProductDto dto,
                                       @RequestParam("image") MultipartFile image,
                                       @RequestParam("image1") MultipartFile image1,
                                       @RequestParam("image2") MultipartFile image2,
                                       @RequestParam("image3") MultipartFile image3){
        productService.createProduct(dto, image, image1, image2, image3);
        return new ResponseEntity<>("Add product successfully!", HttpStatus.CREATED);
    }



}
