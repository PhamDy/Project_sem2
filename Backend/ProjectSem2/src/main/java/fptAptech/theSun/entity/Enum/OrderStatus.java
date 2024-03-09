package fptAptech.theSun.entity.Enum;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import fptAptech.theSun.exception.CustomException;

public enum OrderStatus {
    Success, Pending, Confirmed, Delivering, Cancel;

//    Success(0),Pending(1), Confirmed(2), Delivering(3),Cancel(4);
//
//    private Integer value;
//
//    OrderStatus(Integer value) {
//        this.value = value;
//    }
//
//    @JsonValue
//    public int getValue() {
//        return value;
//    }
//
//    @JsonCreator
//    public static OrderStatus of(Integer value) {
//        if (null == value) {
//            return null;
//        }
//
//        for (OrderStatus item : OrderStatus.values()) {
//            if (value.equals(item.getValue())) {
//                return item;
//            }
//        }
//
//        throw new CustomException("GenderEnum: unknown value: " + value);
//    }

}
