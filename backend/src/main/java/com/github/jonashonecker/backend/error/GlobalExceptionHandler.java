package com.github.jonashonecker.backend.error;

import com.github.jonashonecker.backend.error.domain.ApiErrorResponse;
import com.github.jonashonecker.backend.error.domain.InputValidationError;
import com.github.jonashonecker.backend.error.domain.InputValidationErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse handleValidationExceptions(MethodArgumentNotValidException ex) {
    List<InputValidationError> inputValidationErrorList = ex.getBindingResult().getFieldErrors().stream()
        .map(error -> new InputValidationError(error.getField(), error.getDefaultMessage()))
        .toList();
    InputValidationErrorMessage inputValidationErrorMessage = new InputValidationErrorMessage(inputValidationErrorList);
    return new ApiErrorResponse(
            inputValidationErrorMessage.message()
    );
}
}
