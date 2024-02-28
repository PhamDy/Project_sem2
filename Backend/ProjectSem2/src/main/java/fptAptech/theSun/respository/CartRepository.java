package fptAptech.theSun.respository;

import fptAptech.theSun.entity.CartItem;
import fptAptech.theSun.entity.Carts;
import fptAptech.theSun.entity.Enum.CartsStatus;
import fptAptech.theSun.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartRepository extends JpaRepository<Carts, Long> {

    Carts findByUser_IdAndStatus(Long id, CartsStatus status);

}
