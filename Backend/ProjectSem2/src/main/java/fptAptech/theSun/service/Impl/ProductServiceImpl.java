package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.*;
import fptAptech.theSun.dto.mapper.ObjectMapper;
import fptAptech.theSun.entity.Enum.ProductStatus;
import fptAptech.theSun.entity.Products;
import fptAptech.theSun.entity.Warehouse;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.CategoryRepository;
import fptAptech.theSun.respository.ProductRepository;
import fptAptech.theSun.respository.WarehouseRepository;
import fptAptech.theSun.respository.specification.ProductSpecification;
import fptAptech.theSun.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @Autowired
    private ImageUploadServiceImpl imageUploadService;

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
    public List<ProductViewDto> filterProducts(FilterDto dto) {
        List<Products> products = productRepository.findAll(ProductSpecification.filterProducts(dto));
        List<ProductViewDto> productView = new ArrayList<>();
        for (Products item : products
        ) {
            ProductViewDto productViewDto = new ProductViewDto();
            productViewDto.setId(item.getId());
            productViewDto.setName(item.getName());
            productViewDto.setCategoryName(item.getCategory().getName());
            productViewDto.setBrand(item.getBrand());
            productViewDto.setDiscount(item.getDiscount());
            productViewDto.setPrice(item.getPrice());
            productViewDto.setImg(item.getImg());
            productViewDto.setGender(item.getGender());
            productViewDto.setCreateAt(item.getCreatedAt());
            productView.add(productViewDto);
        }
        return productView;
    }

    @Override
    public void createProduct(CreateProductDto dto, MultipartFile img, MultipartFile img1, MultipartFile img2, MultipartFile img3) {
        var category = categoryRepository.findByName(dto.getCategoryName());
        if (category==null){
            throw new CustomException("Not found category!");
        }
        var product = mapToEntity(dto);
        product.setCategory(category);
        product.setCreatedBy("Admin");
        product.setImg(imageUploadService.uploadImage(img));
        product.setImg1(imageUploadService.uploadImage(img1));
        product.setImg2(imageUploadService.uploadImage(img2));
        product.setImg3(imageUploadService.uploadImage(img3));
        product = productRepository.save(product);

        String[] colors = dto.getColor();
        String[] sizes = dto.getSize();

        var time = LocalDateTime.now();
        int month = time.getMonthValue();

        for (String color: colors
        ) {
            for (String size: sizes
            ) {
                var warehouse = new Warehouse();
                warehouse.setProducts(product);
                warehouse.setColor(color);
                warehouse.setSize(size);
                warehouse.setQuantity(0);
                warehouse.setStatus(ProductStatus.OutOfStock);
                warehouse.setCreatedBy("Admin");
                warehouseRepository.save(warehouse);
            }
        }
    }

    @Override
    public void editProduct(EditProductDto dto, Long productId) {
        var product = productRepository.findById(productId).orElseThrow(() -> new CustomException("Product not found!"));
        var category = categoryRepository.findByName(dto.getCategoryName());
        if (category==null){
            throw new CustomException("Category not found!");
        }
        product.setName(dto.getName());
        product.setCategory(category);
        product.setImg(dto.getImg());
        product.setImg1(dto.getImg1());
        product.setImg2(dto.getImg2());
        product.setImg3(dto.getImg3());
        product.setDescription(dto.getDescription());
        product.setGender(dto.getGender());
        product.setBrand(dto.getBrand());
        product.setPrice(dto.getPrice());
        product.setDiscount(dto.getDiscount());
        productRepository.save(product);
    }

    private Products mapToEntity(CreateProductDto dto){
        return Products.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .gender(dto.getGender())
                .brand(dto.getBrand())
                .price(dto.getPrice())
                .discount(dto.getDiscount())
                .build();
    }

}
