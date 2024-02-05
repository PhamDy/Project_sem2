package fptAptech.theSun.email;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class OtpUtil {

    public String generateOtp() {
        Random random = new Random();
        int otpNumber = 10000 + random.nextInt(90000);
        return String.valueOf(otpNumber);
    }


}
