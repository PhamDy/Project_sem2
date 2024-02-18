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

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    @Transactional
    public CartDto addToCart(Long productId, String color, String size, Integer quantity) {
        var product = productRepository.findById(productId).orElseThrow(() ->
                                            new CustomException("Not found product"));

        String email = JwtFilter.CURRENT_USER;
        Optional<User> user;
        user = userRepository.findByEmail(email);
//        if (user.isEmpty()){
//            Long id = -(UUID.randomUUID().getMostSignificantBits() & Long.MIN_VALUE);
//            System.out.println(id);
//            User newUser = new User();
//            newUser.setId(id);
//            user = Optional.of(newUser);
//        }
//        System.out.println(user.toString());

//        var cart = cartRepository.findByUserAndStatus(user.get(), CartsStatus.Open);
//        if (cart == null) {
//            cart = new Carts();
//            cart.setTotalPrice(0.00);
//            cart.setUser(user.get());
//            if (cart.getUser().getId()<0) {
//                cart.setCreatedBy("ANONYMOUS");
//            } else {
//                cart.setCreatedBy("CUSTOMER");
//            }
//            cartRepository.save(cart);
//        }
//        System.out.println(cart.toString());
//
//        if (cart == null) {
//            cart = new Carts();
//            cart.setTotalPrice(0.00);
//            if (cart.getUser().getId()<0) {
//                cart.setCreatedBy("ANONYMOUS");
//            } else {
//                cart.setCreatedBy("CUSTOMER");
//            }
//            cartRepository.save(cart);
//        }
//        System.out.println(cart.toString());

        Carts cart;
        if (user.isPresent()) {
            cart = cartRepository.findByUserAndStatus(user.get(), CartsStatus.Open);
            if (cart == null) {
                cart = new Carts();
                cart.setTotalPrice(0.00);
                cart.setUser(user.get());
                cart.setStatus(CartsStatus.Open);
                cart.setCreatedBy("CUSTOMER");
                cart.setGuestId(null);
                cart = cartRepository.save(cart);
            }
        } else {
            Long guestId = (UUID.randomUUID().getMostSignificantBits() & Long.MIN_VALUE);
            cart = cartRepository.findByGuestIdAndAndStatus(guestId, CartsStatus.Open);
            if ()
        }

//        var warehouse = warehouseRepository.findByProducts_IdAndColorAndSize(productId, size, color);
        var warehouse1 = warehouseRepository.findById(1L);
        Warehouse warehouse = warehouse1.get();
        if (warehouse == null) {
            throw new CustomException("Warehouse not found");
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
            if (user.get().getId() > 0) {
                cartItem.setCreatedBy("CUSTOMER");
            } else {
                cartItem.setCreatedBy("ANONYMOUS");
            }
            cartItemRepository.save(cartItem);
            warehouse.setQuantity(warehouse.getQuantity() - cartItem.getQuantity());
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItemRepository.save(cartItem);
            warehouse.setQuantity(warehouse.getQuantity() - cartItem.getQuantity());
        }

        if (warehouse.getQuantity() == 0 ){
            warehouse.setStatus(ProductStatus.OutOfStock);
        }
        if (warehouse.getQuantity() < cartItem.getQuantity()) {
            throw new CustomException("Not enough quantity available for product: ", product.getName());
        }
        warehouseRepository.save(warehouse);

        cart.setTotalPrice(cart.getTotalPrice() + cartItem.getSubtotal());
        cartRepository.save(cart);

        CartDto cartDto = objectMapper.mapCartsToDto(cart);

        return cartDto;
    }
}
