package fptAptech.theSun.entity.Enum;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import fptAptech.theSun.exception.CustomException;

public enum OrderStatus {
    Success(0),Pending(1),Delivering(2),Cancel(3);

    private Integer value;

    OrderStatus(Integer value) {
        this.value = value;
    }

    @JsonValue
    public int getValue() {
        return value;
    }

    @JsonCreator
    public static OrderStatus of(Integer value) {
        if (null == value) {
            return null;
        }

        for (OrderStatus item : OrderStatus.values()) {
            if (value.equals(item.getValue())) {
                return item;
            }
        }

        throw new CustomException("GenderEnum: unknown value: " + value);
    }

}
