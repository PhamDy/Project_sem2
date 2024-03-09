package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.RegisterUserDto;
import fptAptech.theSun.dto.UserDto;
import fptAptech.theSun.dto.mapper.ObjectMapper;
import fptAptech.theSun.email.EmailService;
import fptAptech.theSun.email.OtpUtil;
import fptAptech.theSun.entity.Address;
import fptAptech.theSun.entity.Carts;
import fptAptech.theSun.entity.Enum.CartsStatus;
import fptAptech.theSun.entity.Enum.RoleName;
import fptAptech.theSun.entity.Role;
import fptAptech.theSun.entity.User;
import fptAptech.theSun.exception.DuplicatedTupleException;
import fptAptech.theSun.respository.*;
import fptAptech.theSun.security.jwt.AccessToken;
import fptAptech.theSun.security.jwt.JwtService;
import fptAptech.theSun.service.UserService;
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
    private CartRepository cartRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private OtpUtil otpUtil;

    @Autowired
    private ObjectMapper objectMapper;

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
    public UserDto getByEmailDto(String email) {
        var user = userRepository.findByEmail(email);
        return objectMapper.mapUserToDto(user.get());
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
        user.setAvatar("https://img.upanh.tv/2024/03/08/defaultuserimg.jpg");

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
        emailService.sendMail(user.getEmail(), "Send to OTP from WalkZ Shop" ,"This is your authentication code: " + otp);
    }

    @Override
    @Transactional
    public void verifyAccount(String otp) {
        var user = userRepository.findByOtp(otp);
        if (user!=null) {
            Duration duration = Duration.between(user.getOtpGeneratedTime(), LocalDateTime.now());
            if (user.getOtp().equals(otp) && duration.getSeconds() < (10*60)) {
                user.setEnabled(true);
                userRepository.save(user);
                Carts carts = new Carts();
                carts.setUser(user);
                carts.setCreatedBy("User");
                carts.setStatus(CartsStatus.Open);
                cartRepository.save(carts);

                Address address = new Address();
                address.setUser(user);
                address.setEmail(user.getEmail());
                address.setCreatedBy("User");
                addressRepository.save(address);

                LOGGER.info("User with email {} successfully verified and enabled.", user.getEmail());
            } else {
                throw new IllegalArgumentException("Invalid OTP or expired");
            }
        } else {
            LOGGER.error("User not found with email: {}", user.getEmail());
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
            emailService.sendMail(user.getEmail(), "Send to OTP from WalkZ Shop" ,"This is your authentication code: " + otp);
            LOGGER.info("OTP regenerated for user with email: {}", email);
        } catch (NoSuchElementException e) {
            LOGGER.error("User not found with email: {}", e);
            throw new NotFoundException("User not found");
        }
    }

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
