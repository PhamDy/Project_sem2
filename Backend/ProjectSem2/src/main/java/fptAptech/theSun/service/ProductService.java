package fptAptech.theSun.service;


import fptAptech.theSun.dto.CreateProductDto;
import fptAptech.theSun.dto.FilterDto;
import fptAptech.theSun.dto.ProductDetailDto;
import fptAptech.theSun.dto.ProductViewDto;
import fptAptech.theSun.entity.Products;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    List<ProductViewDto> getAll();

    List<String> getGender();

    List<String> getBrand();

//     Lọc sản phẩm
    List<ProductViewDto> filterProducts(FilterDto dto);

    ProductDetailDto getProduct(Long id);

    void createProduct(CreateProductDto dto, MultipartFile image, MultipartFile image1, MultipartFile image2, MultipartFile image3);

}
