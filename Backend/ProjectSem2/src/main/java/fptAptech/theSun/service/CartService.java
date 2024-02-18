package fptAptech.theSun.service;

import fptAptech.theSun.dto.CartDto;

public interface CartService {

    CartDto addToCart(Long productId, String color, String size, Integer quantity);




}
