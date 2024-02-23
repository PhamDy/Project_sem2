package fptAptech.theSun.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serializable;

@Data
public class ResetPassworDto implements Serializable {

    @NotNull
    private String otpReset;

    @NotNull
    @Size(min=5, max = 30)
    private String passwordNew;
}
