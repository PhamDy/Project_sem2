package fptAptech.theSun.service;

import fptAptech.theSun.dto.ResetPassworDto;

public interface ResetPasswordService {

    String createOtpReset(String email);

    String checkOtpReset(ResetPassworDto resetPassworDto);

}
