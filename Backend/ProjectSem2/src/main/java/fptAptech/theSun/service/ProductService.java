package fptAptech.theSun.service;


import fptAptech.theSun.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    List<ProductViewDto> getAll();

    List<String> getGender();

    List<String> getBrand();

//     Lọc sản phẩm
    List<ProductViewDto> filterProducts(FilterDto dto);

    ProductDetailDto getProduct(Long id);

    void createProduct(CreateProductDto dto, MultipartFile img, MultipartFile img1, MultipartFile img2, MultipartFile img3);

    void editProduct(EditProductDto dto, Long id);
}
