package fptAptech.theSun.dto.mapper;

import fptAptech.theSun.dto.ProductViewDto;
import fptAptech.theSun.dto.RegisterUserDto;
import fptAptech.theSun.entity.Enum.RoleName;
import fptAptech.theSun.entity.Products;
import fptAptech.theSun.entity.Role;
import fptAptech.theSun.entity.User;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ObjectMapper {

    // User mapper

    public User mapToUser(RegisterUserDto dto) {

        Set<String> strRoles = dto.getRole();
        Set<Role> roles = new HashSet<>();

        return User.builder()
                .userName(dto.getUsername())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .build();
    }



    // Products mapper

    public ProductViewDto mapProductsToDto(Products products) {
        return ProductViewDto.builder()
                .id(products.getId())
                .name(products.getName())
                .img(products.getImg())
                .price(products.getPrice())
                .discount(products.getDiscount())
                .build();
    }

    public List<ProductViewDto> mapListProductsToDto(List<Products> productsList) {
        return productsList.stream()
                .map(this::mapProductsToDto)
                .collect(Collectors.toList());
    }

}
