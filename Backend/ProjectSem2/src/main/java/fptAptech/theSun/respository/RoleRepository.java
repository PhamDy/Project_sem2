package fptAptech.theSun.respository;

import fptAptech.theSun.entity.Enum.RoleName;
import fptAptech.theSun.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);


}
