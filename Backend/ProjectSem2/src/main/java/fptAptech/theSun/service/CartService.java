package fptAptech.theSun.service;

import fptAptech.theSun.dto.CartDto;
import fptAptech.theSun.dto.CartItemDto;

import java.util.List;

public interface CartService {

    CartDto showCart(Long cartId);

    CartDto addToCart(Long productId, String color, String size, Integer quantity);




}
