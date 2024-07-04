package com.github.jonashonecker.backend.ticket.utils;

import com.github.jonashonecker.backend.ticket.domain.ticket.Status;
import com.github.jonashonecker.backend.ticket.domain.ticket.Ticket;
import com.github.jonashonecker.backend.ticket.domain.ticket.TicketResponseDTO;
import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UtilsTest {
    @Test
    void ticketToDtoMapper_mapsAllFieldsCorrectly() {
        //GIVEN
        Ticket ticket = new Ticket(
                "test-id",
                "test-project",
                "test-title",
                "test-description",
                Status.OPEN,
                new TicketScoutUser("test-name", "test-avatarUrl"),
                List.of(1.2D, 3.4D)
        );

        TicketResponseDTO expectedDto = new TicketResponseDTO(
                "test-id",
                "test-project",
                "test-title",
                "test-description",
                Status.OPEN,
                new TicketScoutUser("test-name", "test-avatarUrl")
        );

        //WHEN
        TicketResponseDTO resultDto = Utils.ticketToDtoMapper.apply(ticket);

        //THEN
        assertEquals(expectedDto, resultDto);
    }

    @Test
    void testConstructorIsPrivate() throws NoSuchMethodException {
        Constructor<Utils> constructor = Utils.class.getDeclaredConstructor();
        assertTrue(Modifier.isPrivate(constructor.getModifiers()));
        constructor.setAccessible(true);
        InvocationTargetException exception = assertThrows(InvocationTargetException.class, constructor::newInstance);
        assertTrue(exception.getCause() instanceof IllegalStateException);
    }
}