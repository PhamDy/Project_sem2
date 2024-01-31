package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.RegisterUserDto;
import fptAptech.theSun.email.EmailService;
import fptAptech.theSun.entity.Enum.RoleName;
import fptAptech.theSun.entity.Role;
import fptAptech.theSun.entity.User;
import fptAptech.theSun.exception.DuplicatedTupleException;
import fptAptech.theSun.respository.RoleRepository;
import fptAptech.theSun.respository.UserRepository;
import fptAptech.theSun.security.jwt.AccessToken;
import fptAptech.theSun.security.jwt.JwtService;
import fptAptech.theSun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

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


    @Override
    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
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

        String otp = generateOtp();
        user.setOtp(otp);
        user.setOtpGeneratedTime(LocalDateTime.now());
        userRepository.save(user);
        emailService.sendMail(user.getEmail(), "This is your authentication code: " + otp);
    }

    @Override
    @Transactional
    public void verifyAccount(Long id, String otp) {
        Optional<User> optionalUser  = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Duration duration = Duration.between(user.getOtpGeneratedTime(), LocalDateTime.now());
            if (user.getOtp().equals(otp) && duration.getSeconds() < (1 * 60)) {
                user.setEnabled(true);
                userRepository.save(user);
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public AccessToken authenticate(String username, String password) {
       var user = getByUsername(username);
       if (user == null || !user.getEnabled()) {
           return null;
       }

       boolean matches = passwordEncoder.matches(password, user.getPassword());
       if (matches) {
           return jwtService.generateToken(user);
       }
       return null;
    }

    private String generateOtp() {
        Random random = new Random();
        int otpNumber = 10000 + random.nextInt(90000);
        return String.valueOf(otpNumber);
    }

}
