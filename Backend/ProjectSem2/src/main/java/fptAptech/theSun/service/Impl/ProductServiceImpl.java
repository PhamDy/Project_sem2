package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.ProductDto;
import fptAptech.theSun.entity.Product;
import fptAptech.theSun.respository.ProductRepository;
import fptAptech.theSun.service.productService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements productService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ProductDto> getList() {
        return productRepository
                .findAll(Sort.by("id").ascending())
                .stream()
                .map(this::convertEntityToDo)
                .collect(Collectors.toList());
    }

    public ProductDto convertEntityToDo(Product product) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(product, ProductDto.class);
    }

}
