package fptAptech.theSun.service.Impl;

import fptAptech.theSun.entity.Products;
import fptAptech.theSun.respository.ProductRepository;
import fptAptech.theSun.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Products> getAll() {
        return productRepository.findAll();
    }

    @Override
    public Products getProduct(Long id) {
        return productRepository.findById(id).orElseThrow( () -> new NotFoundException("Not Found Product With Id: " + id));
    }

    //    public List<ProductDto> getList() {
//        return productRepository
//                .findAll(Sort.by("id").ascending())
//                .stream()
//                .map(this::convertEntityToDo)
//                .collect(Collectors.toList());
//    }

//    public ProductDto convertEntityToDo(Product product) {
//        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
//
//        Converter<Category, Integer> categoryConverter = context -> context.getSource() == null ? null : context.getSource().getId();
//        modelMapper.typeMap(Product.class, ProductDto.class)
//                .addMappings(mapper -> mapper.using(categoryConverter).map(Product::getCategory, ProductDto::setCategory_id));
//
//
//        return modelMapper.map(product, ProductDto.class);
//    }

    @Override
    public List<Products> getProductFeatured() {
        return productRepository.getListByFeatured();
    }

    @Override
    public List<Products> getProductNewest() {
        return productRepository.getListByNewest();
    }

    @Override
    public List<Products> getProductPriceAsc() {
        return productRepository.getListByPriceAsc();
    }

    @Override
    public List<Products> getProductPriceDesc() {
        return productRepository.getListByPriceDesc();
    }

    @Override
    public List<Products> getProductsByFilters(String gender1, String gender2, String gender3,
                                              String brand1, String brand2, String brand3, String brand4, String brand5,
                                              String category1, String category2, String category3,
                                              String color1, String color2, String color3, String color4, String color5, String color6, String color7,
                                              Boolean discount, Boolean under50, Boolean between50And100, Boolean between100And250, Boolean over250,
                                              String sortDirection, String sortBy) {
        Sort sort;
        if ("discount".equals(sortBy)) {
            sort = Sort.by(sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "discount");
        } else if ("createdAt".equals(sortBy)) {
            sort = Sort.by(sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "createdAt");
        } else {
            sort = Sort.by(sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "price");
        }
        return productRepository.productsByFilterAll(gender1, gender2, gender3,
                brand1, brand2, brand3, brand4, brand5,
                category1, category2, category3,
                color1, color2, color3, color4, color5, color6, color7,
                discount, under50, between50And100, between100And250, over250,
                sort);
    }

//    public List<Products> getProductsByFilters(List<String> gender,
//                                               String brand1, String brand2, String brand3, String brand4, String brand5,
//                                               String category1, String category2, String category3,
//                                               String color1, String color2, String color3, String color4, String color5, String color6, String color7,
//                                               Boolean discount, Boolean under50, Boolean between50And100, Boolean between100And250, Boolean over250,
//                                               String sortDirection, String sortBy) {
//        Sort sort;
//        if ("discount".equals(sortBy)) {
//            sort = Sort.by(sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "discount");
//        } else if ("createdAt".equals(sortBy)) {
//            sort = Sort.by(sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "createdAt");
//        } else {
//            sort = Sort.by(sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "price");
//        }
//
//        return productRepository.productsByFilterAll(gender,
//                brand1, brand2, brand3, brand4, brand5,
//                category1, category2, category3,
//                color1, color2, color3, color4, color5, color6, color7,
//                discount, under50, between50And100, between100And250, over250,
//                sort);
//    }


    @Override
    public List<Products> searchProduct(String keyword) {
        List<Products> result = productRepository.searchProduct(keyword);
        return result;
    }
}
