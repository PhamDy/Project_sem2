package fptAptech.theSun.service;

import fptAptech.theSun.dto.ProductDto;
import fptAptech.theSun.entity.Enum.ProductColor;
import fptAptech.theSun.entity.Enum.ProductGender;
import fptAptech.theSun.entity.Product;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public interface ProductService {

    List<Product> getList();

    List<Product> getProductFeatured();

    List<Product> getProductNewest();

    List<Product> getProductPriceAsc();

    List<Product> getProductPriceDesc();

    List<Product> getProductsByFilters(ProductGender gender, String brand, String category, ProductColor color, String sport, Boolean discount , Boolean under50, Boolean between50And100, Boolean between100And250, Boolean over250);

    Product getProduct(int id);




}
