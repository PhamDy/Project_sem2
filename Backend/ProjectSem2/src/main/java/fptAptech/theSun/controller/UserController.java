package fptAptech.theSun.controller;

import fptAptech.theSun.dto.ChangePasswordDto;
import fptAptech.theSun.dto.LoginDto;
import fptAptech.theSun.dto.RegisterUserDto;
import fptAptech.theSun.exception.DuplicatedTupleException;
import fptAptech.theSun.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*",maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

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

    @PatchMapping("/verify/{id}")
    @Operation(summary = "Khách hàng nhập mã otp", description = "Kiểm tra thông tin OTP chuẩn không, nếu chuẩn thì enable cho khách hàng có thể đăng nhập")
    public ResponseEntity<?>authtotp(@PathVariable Long id,
                                     @RequestParam(name = "otp") String otp) {
        userService.verifyAccount(id, otp);
        return ResponseEntity.ok().build();
    }

    @PostMapping("verify/{id}/regenerateOtp")
    @Operation(summary = "Khách hàng nhập lấy otp khi đã hết thời hạn", description = "Gửi lại mã otp cho khách hàng qua mail để khách hàng xác thực")
    private ResponseEntity<?> regenerateOtp(@PathVariable Long id) {
        userService.regenerateOtp(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/changePassword")
    @Operation(summary = "Khách hàng thay đổi mật khẩu")
    public ResponseEntity<?>changePassword(@PathVariable Long id,
                                           @Valid @RequestBody ChangePasswordDto changePasswordDto) {
        userService.changePassword(id, changePasswordDto);
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

}
