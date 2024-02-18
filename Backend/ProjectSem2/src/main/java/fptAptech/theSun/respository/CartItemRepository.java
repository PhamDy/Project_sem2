package fptAptech.theSun.respository;

import fptAptech.theSun.entity.CartItem;
import fptAptech.theSun.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query(value = "SELECT ci.products FROM CartItem ci WHERE ci.products.id = ?1")
    Products findProductById(Long id);

    @Query(value = "SELECT ci FROM CartItem ci WHERE ci.carts.id = ?1 AND ci.products.id = ?2 AND ci.color = ?3 AND ci.size = ?3")
    CartItem findByCartsAndProductsAndColorAndSize(Long cartId, Long productId, String color, String size);

}
