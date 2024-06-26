package fptAptech.theSun.controller;

import fptAptech.theSun.dto.CreateProductDto;
import fptAptech.theSun.dto.EditProductDto;
import fptAptech.theSun.dto.FilterDto;
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

//    @GetMapping("/filter")
//    @Operation(summary = "Lấy ra danh sách sản phẩm theo các tiêu chí lọc")
//    public ResponseEntity<?> getProductsByFilters(@RequestBody(required = false) FilterDto dto) {
//        return new ResponseEntity<>(productService.filterProducts(dto), HttpStatus.OK);
//    }

    @GetMapping("/filter")
    @Operation(summary = "Lấy ra danh sách sản phẩm theo các tiêu chí lọc")
    public ResponseEntity<?> getProductsByFilters1(@RequestParam(name = "category", required = false) List<String> category,
                                                    @RequestParam(name = "brand", required = false) List<String> brand,
                                                    @RequestParam(name = "color", required = false) List<String> color,
                                                    @RequestParam(name = "gender", required = false) List<String> gender,
                                                    @RequestParam(name = "discount", required = false) Double discount,
                                                   @RequestParam(name = "price1", required = false) Double price1,
                                                   @RequestParam(name = "price2", required = false) Double price2,
                                                   @RequestParam(name = "price3", required = false) Double price3,
                                                   @RequestParam(name = "price4", required = false) Double price4,
                                                   @RequestParam(name = "sortDirection", required = false) String sortDirection,
                                                   @RequestParam(name = "sortFeatured", required = false) String sortFeatured,
                                                   @RequestParam(name = "sortNewest", required = false) String sortNewest){
        var filter = new FilterDto(category, brand, color, gender, discount, price1, price2, price3, price4, sortDirection, sortFeatured, sortNewest);
        return new ResponseEntity<>(productService.filterProducts(filter), HttpStatus.OK);
    }

    @PostMapping("/addProduct")
    @Operation(summary = "Tạo mới sản phẩm, đồng thời tạo mới warehouse")
    public ResponseEntity<?>addProduct(@Valid @ModelAttribute CreateProductDto dto,
                                       @RequestParam(value = "img") MultipartFile img,
                                       @RequestParam(value = "img1", required = false) MultipartFile img1,
                                       @RequestParam(value = "img2", required = false) MultipartFile img2,
                                       @RequestParam(value = "img3", required = false) MultipartFile img3){
        productService.createProduct(dto, img, img1, img2, img3);
        return new ResponseEntity<>("Add product successfully!", HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Sửa thông tin sản phẩm, không bao gồm size color và số lượng")
    public ResponseEntity<?>editProduct(@Valid @ModelAttribute EditProductDto dto, @PathVariable Long id,
                                        @RequestParam(value = "img", required = false) MultipartFile img,
                                        @RequestParam(value = "img1", required = false) MultipartFile img1,
                                        @RequestParam(value = "img2", required = false) MultipartFile img2,
                                        @RequestParam(value = "img3", required = false) MultipartFile img3){
        productService.editProduct(dto, id, img, img1, img2, img3);
        return new ResponseEntity<>("Edit product successfully!", HttpStatus.OK);
    }

}
