package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Carts;
import fptAptech.theSun.entity.Enum.CartsStatus;
import fptAptech.theSun.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Carts, Long> {

    Carts findByUserAndStatus(User user, CartsStatus status);

    Carts findByGuestIdAndAndStatus(Long id, CartsStatus status);

}
