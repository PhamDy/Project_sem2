package fptAptech.theSun.respository;

import fptAptech.theSun.entity.ResetPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ResetPasswordRepository extends JpaRepository<ResetPassword, Long> {

//    Optional<ResetPassword> findByOtp_reset(Long aLong);

//    @Query(value = "SELECT rp FROM ResetPassword rp INNER JOIN User u ON rp.user.id = u.id WHERE u.email = :email AND rp.otpReset = :otpReset")
//    ResetPassword findByUser_EmailAndOtpReset(@Param("email") String email, @Param("otpReset") String otpReset);

      ResetPassword findByOtpReset(String otpReset);

}
