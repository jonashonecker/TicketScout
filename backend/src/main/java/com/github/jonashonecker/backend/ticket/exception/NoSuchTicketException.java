package com.github.jonashonecker.backend.ticket.exception;

import java.util.NoSuchElementException;

public class NoSuchTicketException extends NoSuchElementException {
    public NoSuchTicketException(String message) {
        super(message);
    }
}
