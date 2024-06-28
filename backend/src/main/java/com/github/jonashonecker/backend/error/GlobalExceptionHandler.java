package com.github.jonashonecker.backend.error;

import com.github.jonashonecker.backend.error.domain.ApiErrorResponse;
import com.github.jonashonecker.backend.ticket.exception.NoSuchTicketException;
import com.github.jonashonecker.backend.user.exception.UserAuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse handleValidationExceptions(MethodArgumentNotValidException ex) {

        return new ApiErrorResponse(
                "Input validation failed for " + ex.getBindingResult().getFieldErrors().stream()
                        .map(error -> error.getField() + " (" + error.getDefaultMessage() + ")")
                        .collect(Collectors.joining(" and ")
                        )
        );
    }

    @ExceptionHandler(UserAuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiErrorResponse handleUserAuthenticationException(UserAuthenticationException ex) {

        return new ApiErrorResponse(
                "There is an issue with your user login. Please contact support."
        );
    }

    @ExceptionHandler(NoSuchTicketException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse handleNoSuchTicketException(NoSuchTicketException ex) {

        return new ApiErrorResponse(
                ex.getMessage()
        );
    }
}
