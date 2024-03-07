package fptAptech.theSun.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDto implements Serializable {

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @NotEmpty
    private String country;

    @NotEmpty
    private String city;

    @NotEmpty
    private String address;

    private String optional;
    private String zipCode;

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    @Size(min = 10, max = 10)
    private String phone;


}
