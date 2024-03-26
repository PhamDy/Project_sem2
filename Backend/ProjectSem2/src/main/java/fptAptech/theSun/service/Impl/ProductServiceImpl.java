package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.CreateProductDto;
import fptAptech.theSun.dto.ProductDetailDto;
import fptAptech.theSun.dto.ProductViewDto;
import fptAptech.theSun.dto.mapper.ObjectMapper;
import fptAptech.theSun.entity.Enum.ProductStatus;
import fptAptech.theSun.entity.Products;
import fptAptech.theSun.entity.Warehouse;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.CategoryRepository;
import fptAptech.theSun.respository.ProductRepository;
import fptAptech.theSun.respository.WarehouseRepository;
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

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public List<ProductViewDto> getAll() {
        var list = productRepository.findAll();
        var productViews = objectMapper.mapListProductsToDto(list);
        return productViews;
    }

    @Override
    public ProductDetailDto getProduct(Long id) {
        var product = productRepository.findById(id).orElseThrow( () -> new NotFoundException("Not Found Product With Id: " + id));
        var dto = new ProductDetailDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setCategoryName(product.getCategory().getName());
        dto.setAvatar(product.getImg());
        dto.setImg1(product.getImg1());
        dto.setImg2(product.getImg2());
        dto.setImg3(product.getImg3());
        dto.setDesc(product.getDescription());
        dto.setBrand(product.getBrand());
        dto.setPrice(product.getPrice());
        dto.setDiscount(product.getDiscount());
        var sizeList = warehouseRepository.getBySize(id);
        var colorList = warehouseRepository.getByColor(id);
        dto.setSize(sizeList);
        dto.setColor(colorList);
        return dto;
    }

    @Override
    public List<String> getGender() {
        return productRepository.getByGender();
    }

    @Override
    public List<String> getBrand() {
        return productRepository.getByBrand();
    }

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

    @Override
    public void createProduct(CreateProductDto dto) {
        var category = categoryRepository.findByName(dto.getCategoryName());
        if (category==null){
            throw new CustomException("Not found category!");
        }
        var product = mapToEntity(dto);
        product.setCategory(category);
        product.setCreatedBy("Admin");
        product = productRepository.save(product);

        var warehouse = new Warehouse();
        warehouse.setProducts(product);
        warehouse.setColor(dto.getColor());
        warehouse.setSize(dto.getSize());
        warehouse.setQuantity(dto.getQuantity());
        warehouse.setCreatedBy("Admin");
        warehouse.setStatus(dto.getQuantity() == 0 ? ProductStatus.OutOfStock : ProductStatus.InStock);
        warehouseRepository.save(warehouse);
    }

    private Products mapToEntity(CreateProductDto dto){
        return Products.builder()
                .name(dto.getName())
                .img(dto.getImg())
                .img1(dto.getImg1())
                .img2(dto.getImg2())
                .img3(dto.getImg3())
                .description(dto.getDescription())
                .gender(dto.getGender())
                .brand(dto.getBrand())
                .price(dto.getPrice())
                .discount(dto.getDiscount())
                .build();
    }

}
