package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {

    Address findByUser_Id(Long id);

    Address getByUser_Id(Long id);

}
