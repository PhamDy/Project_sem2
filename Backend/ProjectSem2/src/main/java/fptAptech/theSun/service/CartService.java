package fptAptech.theSun.service;

import fptAptech.theSun.dto.CartDto;
import fptAptech.theSun.dto.CartItemDto;
import fptAptech.theSun.dto.UpdateQuantityDto;
import fptAptech.theSun.entity.Enum.CartsStatus;

import java.util.List;

public interface CartService {

    CartDto showCart(CartsStatus status);

    void addToCart(Long productId, String color, String size, Integer quantity);

    void updateQuantity(List<UpdateQuantityDto> dtos);

    void deleteCariItem(Long id);

    void changeStatusCart(Long cartId, CartsStatus cartsStatus);

}
