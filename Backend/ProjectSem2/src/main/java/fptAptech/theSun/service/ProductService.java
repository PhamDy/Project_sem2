package fptAptech.theSun.service;

import fptAptech.theSun.dto.FillterRequestDto;
import fptAptech.theSun.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> getList();

    List<Product> getProductFeatured();

    List<Product> getProductNewest();

    List<Product> getProductPriceAsc();

    List<Product> getProductPriceDesc();

    List<Product> getProductsByFilters(FillterRequestDto fillterRequestDto, Boolean discount , Boolean under50, Boolean between50And100, Boolean between100And250, Boolean over250, String sortDirection, String sortBy);

    Product getProduct(int id);

}
