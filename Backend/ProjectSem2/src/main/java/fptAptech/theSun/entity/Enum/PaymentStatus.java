package fptAptech.theSun.entity.Enum;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import fptAptech.theSun.exception.CustomException;

public enum PaymentStatus {
    Success(0),Pending(1),Delivering(2),Cancel(3);

    private Integer value;

    PaymentStatus(Integer value) {
        this.value = value;
    }

    @JsonValue
    public int getValue() {
        return value;
    }

    @JsonCreator
    public static PaymentStatus of(Integer value) {
        if (null == value) {
            return null;
        }

        for (PaymentStatus item : PaymentStatus.values()) {
            if (value.equals(item.getValue())) {
                return item;
            }
        }

        throw new CustomException("GenderEnum: unknown value: " + value);
    }

}
