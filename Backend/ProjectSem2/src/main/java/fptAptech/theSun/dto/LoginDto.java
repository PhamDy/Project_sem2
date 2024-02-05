package fptAptech.theSun.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class LoginDto implements Serializable {
    @NotNull
    private String usernameOrEmail;

    @NotNull
    private String password;
}
