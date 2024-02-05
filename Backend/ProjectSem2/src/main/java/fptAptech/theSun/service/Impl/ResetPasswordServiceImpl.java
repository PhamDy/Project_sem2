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

        ResetPassword resetPassword = new ResetPassword(otp, LocalDateTime.now(), user);
        resetPassword.setCreatedBy("User");
        resetPasswordRepository.save(resetPassword);
        emailService.sendMail(email, otp);
        return otp;
    }

    @Override
    @Transactional
    public String checkOtpReset(ResetPassworDto dto) {
        ResetPassword resetPassword = resetPasswordRepository.findByUser_EmailAndOtpReset(dto.getEmail(), dto.getOtpReset());
        if (resetPassword == null) {
            throw new CustomException("Email and Otp Reset not found");
        }

        Duration duration = Duration.between(resetPassword.getResetPasswordOtpExpiry(), LocalDateTime.now());
        if (duration.toMinutes() > (10)) {
            throw new CustomException(("otp has expired"));
        }

        userService.updatePassword(dto.getEmail(), dto.getPasswordNew());
        return "Update password successfully";
    }
}
