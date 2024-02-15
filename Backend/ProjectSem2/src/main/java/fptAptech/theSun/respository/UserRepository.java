package fptAptech.theSun.respository;

import fptAptech.theSun.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);

    User findByUserName(String username);

    Optional<User> findByEmail(String email);

}
