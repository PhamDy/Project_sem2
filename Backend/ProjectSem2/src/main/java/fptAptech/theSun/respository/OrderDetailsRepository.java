package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Order_details;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<Order_details, Long> {

    boolean existsByProducts_Id(Long id);
    Page<Order_details> findByOrder_Id(Long id, Pageable pageable);

}
