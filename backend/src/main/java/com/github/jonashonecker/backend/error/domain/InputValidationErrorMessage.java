package com.github.jonashonecker.backend.error.domain;

import java.util.List;
import java.util.stream.Collectors;

public record InputValidationErrorMessage(
        List<InputValidationError> inputValidationErrorList,
        String message
) {
    public InputValidationErrorMessage(List<InputValidationError> inputValidationErrorList) {
        this(inputValidationErrorList, buildMessage(inputValidationErrorList));
    }

    private static String buildMessage(List<InputValidationError> inputValidationErrorList) {
        return "Input validation failed for " + inputValidationErrorList.stream()
                .map(error -> error.field() + " (" + error.errorMessage() + ")")
                .collect(Collectors.joining(" and "));
    }
}
