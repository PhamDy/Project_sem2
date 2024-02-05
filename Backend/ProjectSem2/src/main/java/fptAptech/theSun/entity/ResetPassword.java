package fptAptech.theSun.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "reset_password")
public class ResetPassword extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reset_id")
    private Long id;

    @Column(name = "otpReset")
    private String otpReset;

    @Column(name = "reset_password_otp_expiry")
    private LocalDateTime ResetPasswordOtpExpiry;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private User user;

    public ResetPassword(String otpReset, LocalDateTime resetPasswordOtpExpiry, User user) {
        this.otpReset = otpReset;
        this.ResetPasswordOtpExpiry = resetPasswordOtpExpiry;
        this.user = user;
    }
}
