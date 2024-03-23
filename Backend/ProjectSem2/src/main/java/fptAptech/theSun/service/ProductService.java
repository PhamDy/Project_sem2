package fptAptech.theSun.service;


import fptAptech.theSun.dto.CreateProductDto;
import fptAptech.theSun.dto.FilterDto;
import fptAptech.theSun.dto.ProductDetailDto;
import fptAptech.theSun.dto.ProductViewDto;
import fptAptech.theSun.entity.Products;

import java.util.List;

public interface ProductService {

    List<ProductViewDto> getAll();

    List<String> getGender();

    List<String> getBrand();

    ProductDetailDto getProduct(Long id);

    List<ProductViewDto> filterProducts(FilterDto dto);

    void createProduct(CreateProductDto dto);

}
