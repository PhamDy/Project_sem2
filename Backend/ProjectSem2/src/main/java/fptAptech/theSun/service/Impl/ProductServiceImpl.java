package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.CreateProductDto;
import fptAptech.theSun.dto.FilterDto;
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
import fptAptech.theSun.respository.specification.ProductSpecification;
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
    public List<ProductViewDto> filterProducts(FilterDto dto) {
        List<Products> products = productRepository.findAll(ProductSpecification.filterProducts(dto));
        List<ProductViewDto> productView = new ArrayList<>();
        for (Products item: products
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
