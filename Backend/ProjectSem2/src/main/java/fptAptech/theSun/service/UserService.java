package fptAptech.theSun.service;

import fptAptech.theSun.dto.ChangePasswordDto;
import fptAptech.theSun.dto.RegisterUserDto;
import fptAptech.theSun.entity.User;
import fptAptech.theSun.security.jwt.AccessToken;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Optional;

public interface UserService {

    User save(User user);

    Optional<User> getById(Long id);

    User getByEmail(String email);

    User getByUsername(String username);

    void save(RegisterUserDto RegisterUserDto);

    void verifyAccount(String email, String otp);

    void regenerateOtp(String email);

    AccessToken authenticate(String username, String password);

//    void changePassword(HttpServletRequest request, ChangePasswordDto changePasswordDto);

    void updatePassword(String email, String newPassword);

}
