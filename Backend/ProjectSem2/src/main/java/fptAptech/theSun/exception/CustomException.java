package fptAptech.theSun.exception;

import java.util.function.Supplier;

public class CustomException extends RuntimeException{
    public CustomException(String message) {
        super(message);
    }

    public CustomException(String message,Exception ex) {
        super(message);
    }

    public CustomException(String message, String name) {
    }
}
