package fptAptech.theSun.controller;

import fptAptech.theSun.dto.ChangePasswordDto;
import fptAptech.theSun.dto.LoginDto;
import fptAptech.theSun.dto.RegisterUserDto;
import fptAptech.theSun.dto.ResetPassworDto;
import fptAptech.theSun.entity.User;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.exception.DuplicatedTupleException;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.security.jwt.JwtService;
import fptAptech.theSun.service.ResetPasswordService;
import fptAptech.theSun.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*",maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ResetPasswordService resetPasswordService;

    @PostMapping("/register")
    @Operation(summary = "Khách hàng đăng ký tài khoản cá nhân", description = "Lưu thông tin tài khoản vào database")
    public ResponseEntity<?> save(@Valid @RequestBody RegisterUserDto dto) {
        try {
            userService.save(dto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DuplicatedTupleException exception) {
            Map<String, String> jsonResul = Map.of("error", exception.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(jsonResul);
        }
    }

    @PatchMapping("/verify")
    @Operation(summary = "Khách hàng nhập mã otp", description = "Kiểm tra thông tin OTP chuẩn không, nếu chuẩn thì enable cho khách hàng có thể đăng nhập")
    public ResponseEntity<?>authtotp(@RequestParam(name = "otp") String otp) {
        userService.verifyAccount(otp);
        return ResponseEntity.ok().build();
    }

    @PostMapping("verify/regenerateOtp")
    @Operation(summary = "Khách hàng nhập lấy otp khi đã hết thời hạn", description = "Gửi lại mã otp cho khách hàng qua mail để khách hàng xác thực")
    private ResponseEntity<?> regenerateOtp(@RequestParam String email) {
        userService.regenerateOtp(email);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/changePassword")
    @Operation(summary = "Khách hàng thay đổi mật khẩu khi đã đăng nhập")
    public ResponseEntity<?>changePassword(HttpServletRequest request,
            @Valid @RequestBody ChangePasswordDto changePasswordDto) {
        String jwt = jwtFilter.getToken(request);
        String username = jwtService.getUsernameFromToken(jwt);
        String email = jwtService.getEmailFromToken(jwt);
        System.out.println("JWT: " + jwt);
        System.out.println("username: " + username);
        System.out.println("email: " + email);
        User user;
        try {
            user = userService.getByUsername(username);
            if (user == null) {
                throw new CustomException("User not found");
            }
            boolean matches = passwordEncoder.matches(changePasswordDto.getPasswordOld(), user.getPassword());
            if (matches && Objects.equals(changePasswordDto.getPasswordNew1(), changePasswordDto.getPasswordNew2())) {
                user.setPassword(passwordEncoder.encode(changePasswordDto.getPasswordNew1()));
                user.setUpdatedBy("User");
                userService.save(user);
            } else {
                throw new RuntimeException("Invalid password or mismatched new passwords");
            }
        } catch (Exception e) {

            throw new RuntimeException("Error changing password");
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    @Operation(summary = "Khách hàng đăng nhập tài khoản cá nhân", description = "Kiểm tra thông tin có chuẩn không, nếu chuẩn thì cung cấp cho khách hàng 1 token")
    public ResponseEntity<?>authticate(@Valid @RequestBody LoginDto loginDto) {
        var token = userService.authenticate(loginDto.getUsernameOrEmail(), loginDto.getPassword());
        if (token==null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(token);
    }

    @PostMapping("/create-otpReset")
    @Operation(summary = "Cung cấp mã otp để khách hàng đặt lại mật khẩu")
    public ResponseEntity<?>createOtpReset(@RequestParam String email) {
        return new ResponseEntity<>(resetPasswordService.createOtpReset(email), HttpStatus.OK);
    }

    @PatchMapping("/check-otpReset")
    @Operation(summary = "Kiểm tra mã otp trước khi cho khách hàng cập nhập lại mật khẩu")
    public ResponseEntity<?>checkOtpReset(@Valid @RequestBody ResetPassworDto dto) {
        return new ResponseEntity<>(resetPasswordService.checkOtpReset(dto), HttpStatus.OK);
    }


}

