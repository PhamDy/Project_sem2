package fptAptech.theSun.dto;

import fptAptech.theSun.entity.Enum.PaymenStatus;
import fptAptech.theSun.entity.Enum.PaymentMethod;
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
    @NotNull
    @NotEmpty
    private String firstName;

    @NotNull
    @NotEmpty
    private String lastName;

    @NotNull
    @NotEmpty
    private String country;

    @NotNull
    @NotEmpty
    private String city;

    @NotNull
    @NotEmpty
    private String address;

    private String optional;

    @NotNull
    @NotEmpty
    private String zipCode;

    @NotNull
    @NotEmpty
    @Email
    private String email;

    @NotNull
    @NotEmpty
    @Size(min = 10, max = 10)
    private String phone;

    private String note;

    @NotNull
    @NotEmpty
    private Long deliveryId;

    @NotNull
    @NotEmpty
    private PaymentMethod paymentMethod;

    private PaymenStatus paymenStatus = PaymenStatus.Unpaid;

}
