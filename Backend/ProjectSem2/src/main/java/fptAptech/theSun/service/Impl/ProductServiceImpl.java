package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.FillterRequestDto;
import fptAptech.theSun.entity.Product;
import fptAptech.theSun.respository.ProductRepository;
import fptAptech.theSun.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getList() {
        return productRepository.findAll();
    }

    @Override
    public Product getProduct(int id) {
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
    public List<Product> getProductFeatured() {
        return productRepository.getListByFeatured();
    }

    @Override
    public List<Product> getProductNewest() {
        return productRepository.getListByNewest();
    }

    @Override
    public List<Product> getProductPriceAsc() {
        return productRepository.getListByPriceAsc();
    }

    @Override
    public List<Product> getProductPriceDesc() {
        return productRepository.getListByPriceDesc();
    }

    @Override
    public List<Product> getProductsByFilters(FillterRequestDto fillterRequestDto, Boolean discount, Boolean under50, Boolean between50And100, Boolean between100And250, Boolean over250, String sortDirection, String sortBy) {
        Sort sort;
        if ("discount".equals(sortBy)) {
            sort = Sort.by(sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "discount");
        } else if ("createdAt".equals(sortBy)) {
            sort = Sort.by(sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "createdAt");
        } else {
            sort = Sort.by(sortDirection.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, "price");
        }

        return productRepository.productsByFillterAll(
                fillterRequestDto.getFormattedGender(),
                fillterRequestDto.getFormattedBrand(),
                fillterRequestDto.getFormattedCategory(),
                fillterRequestDto.getFormattedColor(),
                fillterRequestDto.getFormattedSport(),
                discount,
                under50,
                between50And100,
                between100And250,
                over250,
                sort
        );

    }

}
