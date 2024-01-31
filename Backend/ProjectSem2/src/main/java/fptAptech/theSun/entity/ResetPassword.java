package fptAptech.theSun.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reset_password")
public class ResetPassword extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reset_id")
    private Long id;

    @Column(name = "ResetPasswordToken")
    private String ResetPasswordToken;

    @Column(name = "ResetPasswordTokenExpiry")
    private LocalDateTime ResetPasswordTokenExpiry;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
