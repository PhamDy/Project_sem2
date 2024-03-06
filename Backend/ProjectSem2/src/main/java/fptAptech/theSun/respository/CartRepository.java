package fptAptech.theSun.respository;


import fptAptech.theSun.entity.Carts;
import fptAptech.theSun.entity.Enum.CartsStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Carts, Long> {

    Carts findByUser_IdAndStatus(Long id, CartsStatus status);

//    @Query("SELECT c.id FROM Carts c WHERE c.status = 'Open' AND c.user.id = :userId")
//    Long findOpenCartIdByUserId(@Param("userId") Long userId);

}
