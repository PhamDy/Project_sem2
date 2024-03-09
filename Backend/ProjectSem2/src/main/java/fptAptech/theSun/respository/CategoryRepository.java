package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Boolean existsByName(String name);

}
