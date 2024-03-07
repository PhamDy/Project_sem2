package fptAptech.theSun.dto;

import fptAptech.theSun.entity.Enum.PaymenStatus;
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
public class OrderRequestDto implements Serializable {
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

    @NotEmpty
    private String zipCode;

    @NotEmpty
    @Email
    private String email;

    @NotNull
    @Size(min = 10, max = 10)
    private String phone;

    private String note;

    @NotNull
    private Long deliveryId;

    private AddressDto biilingAddress;

    @NotEmpty
    private String paymentMethod;

    private PaymenStatus paymenStatus = PaymenStatus.Unpaid;

}
