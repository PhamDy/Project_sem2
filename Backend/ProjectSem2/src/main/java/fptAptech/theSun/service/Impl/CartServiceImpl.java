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

    @Autowired
    private ObjectMapper objectMapper;
// ok

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
            cart = cartRepository.findByUser_IdAndStatus(user.get().getId(), CartsStatus.Open);
            if (cart == null) {
                cart = new Carts();
                cart.setTotalPrice(0.00);
                cart.setUser(user.get());
                cart.setStatus(CartsStatus.Open);
                cart.setCreatedBy("CUSTOMER");
                cart = cartRepository.save(cart);
            }

        CartItem cartItem = cartItemRepository.findByCartsAndProductsAndColorAndSize(cart.getId(), productId, color, size);
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

        cart.setTotalPrice(cart.getTotalPrice() + cartItem.getSubtotal());
        cartRepository.save(cart);

        CartDto cartDto = objectMapper.mapCartsToDto(cart);

        return cartDto;
    }
}
