package fptAptech.theSun.service;


import fptAptech.theSun.dto.CreateProductDto;
import fptAptech.theSun.dto.ProductDetailDto;
import fptAptech.theSun.dto.ProductViewDto;
import fptAptech.theSun.entity.Products;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    List<ProductViewDto> getAll();

    List<Products> getProductFeatured();

    List<Products> getProductNewest();

    List<Products> getProductPriceAsc();

    List<Products> getProductPriceDesc();

    List<String> getGender();

    List<String> getBrand();

//     Lọc sản phẩm
    List<Products> getProductsByFilters(String gender1, String gender2, String gender3,
                                       String brand1, String brand2 ,String brand3 , String brand4, String brand5,
                                       String category1, String category2, String category3,
                                       String color1, String color2, String color3, String color4, String color5, String color6, String color7,
                                       Boolean discount , Boolean under50, Boolean between50And100, Boolean between100And250, Boolean over250,
                                       String sortDirection, String sortBy);

//    List<Products> getProductsByFilters(List<String>  gender,
//                                        String brand1, String brand2 , String brand3 , String brand4, String brand5,
//                                        String category1, String category2, String category3,
//                                        String color1, String color2, String color3, String color4, String color5, String color6, String color7,
//                                        Boolean discount , Boolean under50, Boolean between50And100, Boolean between100And250, Boolean over250,
//                                        String sortDirection, String sortBy);


    ProductDetailDto getProduct(Long id);

    List<Products> searchProduct(String keyword);

    void createProduct(CreateProductDto dto, MultipartFile image, MultipartFile image1, MultipartFile image2, MultipartFile image3);

}
