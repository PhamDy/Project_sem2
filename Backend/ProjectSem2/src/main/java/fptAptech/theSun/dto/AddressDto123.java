package fptAptech.theSun.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
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
public class AddressDto123 implements Serializable {

    private String firstName;

    private String lastName;

    private String country;

    private String city;


    private String address;

    private String optional;
    private String zipCode;


    private String email;

    private String dayOfBirth;

    private String phone;


}
