package fptAptech.theSun.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDto implements Serializable {

    @NotNull
    @Size(min=5, max = 30)
    private String passwordOld;

    @NotNull
    @Size(min=5, max = 30)
    private String passwordNew1;

    @NotNull
    @Size(min=5, max = 30)
    private String passwordNew2;

}
