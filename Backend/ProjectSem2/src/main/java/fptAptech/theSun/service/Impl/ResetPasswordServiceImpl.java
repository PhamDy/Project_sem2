package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.ResetPassworDto;
import fptAptech.theSun.email.EmailService;
import fptAptech.theSun.email.OtpUtil;
import fptAptech.theSun.entity.ResetPassword;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.ResetPasswordRepository;
import fptAptech.theSun.service.ResetPasswordService;
import fptAptech.theSun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class ResetPasswordServiceImpl implements ResetPasswordService {

    @Autowired
    private ResetPasswordRepository resetPasswordRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpUtil otpUtil;

    @Override
    public String createOtpReset(String email) {
        var user = userService.getByEmail(email);
        if (user == null) {
            throw new NotFoundException("User not found");
        }
        String otp = otpUtil.generateOtp();

        ResetPassword resetPassword = new ResetPassword();
        resetPassword.setOtpReset(otp);
        resetPassword.setResetPasswordOtpExpiry(LocalDateTime.now());
        resetPassword.setUser(user);
        resetPassword.setCreatedBy("User");
        resetPasswordRepository.save(resetPassword);
        emailService.sendMail(email, otp);
        return otp;
    }

    @Override
    @Transactional
    public String checkOtpReset(ResetPassworDto dto) {
        ResetPassword resetPassword = resetPasswordRepository.findByOtpReset(dto.getOtpReset());
        if (resetPassword == null) {
            throw new CustomException("Otp not found");
        }
        Duration duration = Duration.between(resetPassword.getResetPasswordOtpExpiry(), LocalDateTime.now());
        if (duration.toMinutes() > (10)) {
            throw new CustomException(("otp has expired"));
        }
        var user = resetPassword.getUser();
        user.setPassword(passwordEncoder.encode(dto.getPasswordNew()));
        userService.save(user);
        return "Update password successfully";
    }
}
