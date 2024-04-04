package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Products;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Products, Long>, JpaSpecificationExecutor {

    @Query(value = "SELECT p.gender FROM Products p GROUP BY p.gender")
    List<String> getByGender();

    @Query(value = "SELECT p.brand FROM Products p group by p.brand")
    List<String> getByBrand();

}
