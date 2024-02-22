package fptAptech.theSun.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class UserDto implements Serializable {
    private Long id;
    private String userName;
    private String email;
    private String role;
}
