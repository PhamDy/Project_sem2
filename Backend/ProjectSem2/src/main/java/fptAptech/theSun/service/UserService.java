package fptAptech.theSun.service;

import fptAptech.theSun.dto.AddressDto;
import fptAptech.theSun.dto.RegisterUserDto;
import fptAptech.theSun.dto.UserDto;
import fptAptech.theSun.entity.Enum.RoleName;
import fptAptech.theSun.entity.Role;
import fptAptech.theSun.entity.User;
import fptAptech.theSun.security.jwt.AccessToken;
import org.springframework.web.multipart.MultipartFile;

import javax.management.relation.RoleStatus;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserService {

    UserDto getByEmailDto(String email);

    User save(User user);

    Optional<User> getById(Long id);

    User getByEmail(String email);

    User getByUsername(String username);

    void save(RegisterUserDto RegisterUserDto);

    void verifyAccount(String otp);

    void regenerateOtp(String email);

    AccessToken authenticate(String username, String password);

    AccessToken authenticateAdmin(String username, String password);

    void updatePassword(String email, String newPassword);

    List<UserDto> getAllUser();

    AddressDto getInforByUserId(Long userId);

    void updateUpRoleUser(Long id, Set<Role> roleName);

    void deleteById(Long id);

    void updateAvatar(MultipartFile img);

}
