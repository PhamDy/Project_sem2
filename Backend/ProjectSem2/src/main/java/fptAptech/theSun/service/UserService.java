package fptAptech.theSun.service;

import fptAptech.theSun.dto.RegisterUserDto;
import fptAptech.theSun.entity.User;
import fptAptech.theSun.security.jwt.AccessToken;

import java.util.Optional;

public interface UserService {

    Optional<User> getById(Long id);

    User getByEmail(String email);

    User getByUsername(String username);

    void save(RegisterUserDto RegisterUserDto);

    void verifyAccount(Long id, String otp);

    AccessToken authenticate(String username, String password);

}
