package fptAptech.theSun.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.Set;

@Data
@Builder
public class RegisterUserDto implements Serializable {

    @NotNull
    @NotEmpty
    @Size(min=5, max = 30)
    private String username;

    @NotNull
    @NotEmpty
    @Email
    private String email;

    @NotNull
    @Size(min=8, max = 30)
    private String password;

    private Set<String> role;
}
