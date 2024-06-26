package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.CartDto;
import fptAptech.theSun.dto.CartItemDto;
import fptAptech.theSun.dto.UpdateQuantityDto;
import fptAptech.theSun.entity.CartItem;
import fptAptech.theSun.entity.Carts;
import fptAptech.theSun.entity.Enum.CartsStatus;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.*;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Override
    public CartDto showCart(CartsStatus status) {
        String email = JwtFilter.CURRENT_USER;
        var user = Optional.ofNullable(userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException("You must log in before!")));

        var cart = cartRepository.findByUser_IdAndStatus(user.get().getId(), status);

        if (cart == null) {
            return new CartDto();
        }
        var cartDto = new CartDto();
        var cartItems = cartItemRepository.getByCarts_Id(cart.getId());
        Double total = 0.00;
        if (cartItems != null) {
            for (CartItem i: cartItems
            ) {
                total += i.getSubtotal();
            }
        }
        var cartItemsListDto = convertToListCartItem(cartItems);

        cartDto.setId(cart.getId());
        cartDto.setUserId(cart.getUser().getId());
        cartDto.setQuantityItem(cartItemRepository.countItem(cart.getId(), CartsStatus.Open));
        cartDto.setTotalPrice(total);
        cartDto.setCartItemList(cartItemsListDto);
        return cartDto;
    }

    @Override
    @Transactional
    public void addToCart(Long productId, String color, String size, Integer quantity) {
        var product = productRepository.findById(productId).orElseThrow(() ->
                                            new CustomException("Not found product"));

        String email = JwtFilter.CURRENT_USER;
         var user = Optional.ofNullable(userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException("You must log in before!")));

         var cart = cartRepository.findByUser_IdAndStatus(user.get().getId(), CartsStatus.Open);
            if (cart == null) {
                cart = new Carts();
                cart.setUser(user.get());
                cart.setStatus(CartsStatus.Open);
                cart.setCreatedBy("User");
                cart = cartRepository.save(cart);
            }

         var warehouse = warehouseRepository.findByProducts_IdAndColorAndSize(productId, color, size);
        var cartItem = cartItemRepository.findByCarts_IdAndProducts_IdAndColorAndSize(cart.getId(), product.getId(), color, size);
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setCarts(cart);
            cartItem.setProducts(product);
            cartItem.setColor(color);
            cartItem.setSize(size);
            if (product.getDiscount()>0){
                cartItem.setPrice(product.getPrice() - (product.getPrice()*product.getDiscount()/100));
            } else {
                cartItem.setPrice(product.getPrice());
            }
            if (quantity > warehouse.getQuantity()) {
                throw new CustomException("Order quantity exceeds inventory quantity");
            }
            cartItem.setQuantity(quantity);
            cartItem.setCreatedBy("User");
            cartItemRepository.save(cartItem);
        } else {
            if ((cartItem.getQuantity() + quantity) > warehouse.getQuantity()) {
                throw new CustomException("Order quantity exceeds inventory quantity");
            }
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItemRepository.save(cartItem);
        }
        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void updateQuantity(List<UpdateQuantityDto> cartItems) {
        if (cartItems.isEmpty()) {
            throw new  CustomException("The product has not been added to the cart");
        }
        for (UpdateQuantityDto item: cartItems
             ) {
            cartItemRepository.updateQuantityItem(item.getCartItemId(), item.getQuantityItem());
        }
    }

    @Override
    @Transactional
    public void changeStatusCart(Long cartId, CartsStatus cartsStatus) {
        var cart = cartRepository.findById(cartId).orElseThrow(() ->
                new CustomException("Cart not found"));
        cart.setStatus(cartsStatus);
        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void deleteCariItem(Long id) {
        cartItemRepository.deleteById(id);
    }

    public List<CartItemDto> convertToListCartItem(List<CartItem> cartItemList) {
        List<CartItemDto> cartItemDtos = cartItemList.stream()
                .map(cartItem -> {
                    var cartItemDto = new CartItemDto();
                    cartItemDto.setId(cartItem.getId());
                    cartItemDto.setProductId(cartItem.getProducts().getId());
                    cartItemDto.setProductName(cartItem.getProducts().getName());
                    cartItemDto.setImg(cartItem.getProducts().getImg());
                    cartItemDto.setColor(cartItem.getColor());
                    cartItemDto.setSize(cartItem.getSize());
                    cartItemDto.setQuantity(cartItem.getQuantity());
                    cartItemDto.setPrice(cartItem.getPrice());
                    cartItemDto.setSubTotal(cartItem.getSubtotal());
                    cartItemDto.setDiscount(cartItem.getProducts().getDiscount());
                    return cartItemDto;
                })
                .collect(Collectors.toList());
        return cartItemDtos;
    }


}
