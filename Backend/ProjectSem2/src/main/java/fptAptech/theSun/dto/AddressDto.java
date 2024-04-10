package fptAptech.theSun.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

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
    private String dayOfBirth;

    @NotEmpty
    @Size(min = 10, max = 10)
    private String phone;


}
