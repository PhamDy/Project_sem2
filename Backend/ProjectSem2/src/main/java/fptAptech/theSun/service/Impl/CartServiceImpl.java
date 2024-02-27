package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.CartDto;
import fptAptech.theSun.dto.mapper.ObjectMapper;
import fptAptech.theSun.entity.CartItem;
import fptAptech.theSun.entity.Carts;
import fptAptech.theSun.entity.Enum.CartsStatus;
import fptAptech.theSun.entity.Enum.ProductStatus;
import fptAptech.theSun.entity.User;
import fptAptech.theSun.entity.Warehouse;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.*;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

//    @Autowired
//    private WarehouseRepository warehouseRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public CartDto addToCart(Long productId, String color, String size, Integer quantity) {
        var product = productRepository.findById(productId).orElseThrow(() ->
                                            new CustomException("Not found product"));

        String email = JwtFilter.CURRENT_USER;
        Optional<User> user;
         user = Optional.ofNullable(userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException("You must login before!")));

        Carts cart;
        CartDto cartDto = new CartDto();
            cart = cartRepository.findByUser_IdAndStatus(user.get().getId(), CartsStatus.Open);
            if (cart == null) {
                cart = new Carts();
                cart.setUser(user.get());
                cart.setStatus(CartsStatus.Open);
                cart.setCreatedBy("CUSTOMER");
                cart = cartRepository.save(cart);
            }

        CartItem cartItem = cartItemRepository.findByCarts_IdAndProducts_IdAndColorAndSize(cart.getId(), product.getId(), color, size);
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setCarts(cart);
            cartItem.setProducts(product);
            cartItem.setColor(color);
            cartItem.setSize(size);
            if (product.getDiscount()>0){
                cartItem.setPrice(product.getPrice()*product.getDiscount());
            } else {
                cartItem.setPrice(product.getPrice());
            }
            cartItem.setQuantity(quantity);
            cartItem.setCreatedBy("CUSTOMER");
            cartItemRepository.save(cartItem);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItemRepository.save(cartItem);
        }
        cartRepository.save(cart);
        Integer count = cartRepository.countItem(cart.getId(), CartsStatus.Open);
        cartDto.setId(cart.getId());
        cartDto.setUserId(user.get().getId());
        cartDto.setTotalPrice(cartDto.getTotalPrice() + cartItem.getSubtotal());
        cartDto.setQuantityItem(count);
        return cartDto;
    }
}
