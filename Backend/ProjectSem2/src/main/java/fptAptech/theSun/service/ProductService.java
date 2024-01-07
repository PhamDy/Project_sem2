package fptAptech.theSun.service;

import fptAptech.theSun.dto.ProductDto;
import fptAptech.theSun.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> getList();

    List<Product> getProductFeatured();

    List<Product> getProductNewest();

    List<Product> getProductPriceAsc();

    List<Product> getProductPriceDesc();

    Product getProduct(int id);


}
