package fptAptech.theSun.respository;

import fptAptech.theSun.entity.CartItem;
import fptAptech.theSun.entity.Enum.CartsStatus;
import fptAptech.theSun.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query(value = "SELECT ci.products FROM CartItem ci WHERE ci.products.id = ?1")
    Products findProductById(Long id);

    CartItem findByCarts_IdAndProducts_IdAndColorAndSize(Long cartId, Long productId, String color, String size);

    //    @Query(value = "SELECT * FROM CartItem ci WHERE ci.carts.id = ?1")
//    List<CartItem> showCart(Long cartId);

    @Query(value = "SELECT count(ci.id) FROM CartItem ci WHERE ci.carts.id = ?1 AND ci.carts.status =?2")
    Integer countItem(Long cartId, CartsStatus status);

}
