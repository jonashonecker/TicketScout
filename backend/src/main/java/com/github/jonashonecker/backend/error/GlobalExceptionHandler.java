package com.github.jonashonecker.backend.error;

import com.github.jonashonecker.backend.error.domain.ApiErrorResponse;
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
}
