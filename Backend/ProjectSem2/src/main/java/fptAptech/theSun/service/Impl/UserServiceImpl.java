package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.ChangePasswordDto;
import fptAptech.theSun.dto.RegisterUserDto;
import fptAptech.theSun.email.EmailService;
import fptAptech.theSun.email.OtpUtil;
import fptAptech.theSun.entity.Enum.RoleName;
import fptAptech.theSun.entity.Role;
import fptAptech.theSun.entity.User;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.exception.DuplicatedTupleException;
import fptAptech.theSun.respository.RoleRepository;
import fptAptech.theSun.respository.UserRepository;
import fptAptech.theSun.security.jwt.AccessToken;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.security.jwt.JwtService;
import fptAptech.theSun.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    private static Logger LOGGER = LoggerFactory
            .getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpUtil otpUtil;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user;
        }
        return null;
    }

    @Override
    public User getByUsername(String username) {
        return userRepository.findByUserName(username);
    }

    @Override
    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    @Transactional
    public void save(RegisterUserDto registerUserDto) {

        User user = new User();
        user.setUserName(registerUserDto.getUsername());
        user.setCreatedBy("User");
        user.setEmail(registerUserDto.getEmail());

        var checkUsername = getByUsername(user.getUserName());
        var checkEmail = getByEmail(user.getEmail());
        if (checkEmail != null || checkUsername != null) {
            throw new DuplicatedTupleException("User already exists!");
        }

        user.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));
        Set<String> strRoles = registerUserDto.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(RoleName.ROLE_CUSTOMER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                    case "employee":
                        Role employeeRole = roleRepository.findByName(RoleName.ROLE_EMPLOYEE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(employeeRole);
                    default:
                        Role userRole = roleRepository.findByName(RoleName.ROLE_CUSTOMER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);

        String otp = otpUtil.generateOtp();
        user.setOtp(otp);
        user.setOtpGeneratedTime(LocalDateTime.now());
        userRepository.save(user);
        emailService.sendMail(user.getEmail(), "This is your authentication code: " + otp);
    }

    @Override
    @Transactional
    public void verifyAccount(String email, String otp) {
        Optional<User> optionalUser  = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Duration duration = Duration.between(user.getOtpGeneratedTime(), LocalDateTime.now());
            if (user.getOtp().equals(otp) && duration.getSeconds() < (10*60)) {
                user.setEnabled(true);
                userRepository.save(user);
                LOGGER.info("User with email {} successfully verified and enabled.", email);
            } else {
                throw new IllegalArgumentException("Invalid OTP or expired");
            }
        } else {
            LOGGER.error("User not found with email: {}", email);
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public void regenerateOtp(String email) {
        try {
            User user = userRepository.findByEmail(email).orElseThrow();
            String otp = otpUtil.generateOtp();
            user.setOtp(otp);
            user.setOtpGeneratedTime(LocalDateTime.now());
            userRepository.save(user);
            emailService.sendMail(user.getEmail(), "This is your authentication code: " + otp);
            LOGGER.info("OTP regenerated for user with email: {}", email);
        } catch (NoSuchElementException e) {
            LOGGER.error("User not found with email: {}", e);
            throw new NotFoundException("User not found");
        }
    }

//    @Override
//    @Transactional
//    public void changePassword(HttpServletRequest request, ChangePasswordDto dto) {
//
//        String jwt = jwtFilter.getToken(request);
//        String username = jwtService.getUsernameFromToken(jwt);
//        User user;
//        try {
//            user = getByUsername(username);
//            if (user == null) {
//                throw new CustomException("User not found");
//            }
//            boolean matches = passwordEncoder.matches(dto.getPasswordOld(), user.getPassword());
//            if (matches && Objects.equals(dto.getPasswordNew1(), dto.getPasswordNew2())) {
//                user.setPassword(passwordEncoder.encode(dto.getPasswordNew1()));
//                user.setUpdatedBy("User");
//                userRepository.save(user);
//                LOGGER.info("Change password for user with user name: {}", username);
//            } else {
//                throw new RuntimeException("Invalid password or mismatched new passwords");
//            }
//        } catch (Exception e) {
//            LOGGER.error("Error changing password for user with username: {}", username, e);
//            throw new RuntimeException("Error changing password");
//        }
//    }

    @Override
    @Transactional
    public void updatePassword(String email, String newPassword) {
        String password = passwordEncoder.encode(newPassword);
        var user = getByEmail(email);
        user.setPassword(password);
        userRepository.save(user);
    }

    @Override
    public AccessToken authenticate(String usernameOrEmail, String password) {
        var user1 = getByUsername(usernameOrEmail);
       if (user1 == null || !user1.getEnabled()) {

           var user2 = getByEmail(usernameOrEmail);

           if (user2 == null || !user2.getEnabled()) {
               return null;
           }
           user1 = user2;
       }

       boolean matches = passwordEncoder.matches(password, user1.getPassword());
       if (matches) {
           return jwtService.generateToken(user1);
       }
       return null;
    }


}
