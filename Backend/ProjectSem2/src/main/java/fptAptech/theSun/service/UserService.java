package fptAptech.theSun.service;

import fptAptech.theSun.dto.RegisterUserDto;
import fptAptech.theSun.dto.UserDto;
import fptAptech.theSun.entity.User;
import fptAptech.theSun.security.jwt.AccessToken;

import java.util.Optional;

public interface UserService {

    UserDto getByEmailDto(String email);

    User save(User user);

    Optional<User> getById(Long id);

    User getByEmail(String email);

    User getByUsername(String username);

    void save(RegisterUserDto RegisterUserDto);

    void verifyAccount(String email, String otp);

    void regenerateOtp(String email);

    AccessToken authenticate(String username, String password);

    void updatePassword(String email, String newPassword);

}
