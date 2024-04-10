package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.AddressDto;
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
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.exception.DuplicatedTupleException;
import fptAptech.theSun.respository.*;
import fptAptech.theSun.security.jwt.AccessToken;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.security.jwt.JwtService;
import fptAptech.theSun.service.ImageUploadService;
import fptAptech.theSun.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import javax.management.relation.RoleStatus;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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
    private ImageUploadService imageUploadService;

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

    @Override
    public AccessToken authenticateAdmin(String username, String password) {
        var user = getByUsername(username);
        if (user==null || !user.getEnabled()) {
            return null;
        }
        boolean matches = passwordEncoder.matches(password, user.getPassword());
        if (matches) {
            for (Role role: user.getRoles()
                 ) {
                if (role.getName() == RoleName.ROLE_ADMIN){
                    return jwtService.generateToken(user);
                }
            }
        }
        return null;
    }

    @Override
    public List<UserDto> getAllUser() {
        var user = userRepository.findAll();
        List<UserDto> list = new ArrayList<>();
        for (User item: user
             ) {
            UserDto userDto = new UserDto();
            userDto.setId(item.getId());
            userDto.setUserName(item.getUserName());
            userDto.setEmail(item.getEmail());
            String roleUser = "";
            for (Role role: item.getRoles()
                 ) {
                roleUser+= role.getName() + ", ";
            }
            if (!roleUser.isEmpty()){
                roleUser = roleUser.substring(0, roleUser.length()-2);
            }
            userDto.setRole(roleUser);
            list.add(userDto);
        }
        return list;
    }

    @Override
    public AddressDto getInforByUserId(Long userId) {
        var infor = addressRepository.findByUser_Id(userId);
        var dto = new AddressDto();
        dto.setFirstName(infor.getFirst_name());
        dto.setLastName(infor.getLast_name());
        dto.setCountry(infor.getCountry());
        dto.setCity(infor.getCity());
        dto.setAddress(infor.getAddress());
        dto.setOptional(infor.getOptional());
        dto.setZipCode(infor.getZipCode());
        dto.setEmail(infor.getEmail());
        dto.setPhone(infor.getPhone());
        return dto;
    }

    @Override
    @Transactional
    public void updateUpRoleUser(Long id, Set<Role> roles) {
        var user = userRepository.findById(id);
        if (user.get().getEmail()=="phamdacdy@gmail.com"){
            throw new CustomException("Can not change Super Admin");
        }
        if (roles.size()==0){
            var roleDefault = roleRepository.findByName(RoleName.ROLE_CUSTOMER);
            roleDefault.get().setCreatedBy("Admin");
            roles.add(roleDefault.get());
        }
        for (Role role: roles
             ) {
            role.setCreatedBy("Admin");
        }
        user.get().setRoles(roles);
        userRepository.save(user.get());
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        var user = userRepository.findById(id);
        if (user.get().getEmail()=="phamdacdy@gmail.com"){
            throw new CustomException("Can not delete Super Admin");
        }
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void updateAvatar(MultipartFile img) {
        String email = JwtFilter.CURRENT_USER;
        var user = userRepository.findByEmail(email).orElseThrow(() -> new CustomException("You must log in before"));
        user.setAvatar(imageUploadService.uploadImage(img));
        userRepository.save(user);
    }
}
