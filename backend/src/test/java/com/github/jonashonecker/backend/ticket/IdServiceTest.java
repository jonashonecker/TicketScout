package com.github.jonashonecker.backend.ticket;

import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class IdServiceTest {

    private final IdService idService = new IdService();

    @Test
    void getUUID_whenCalled_returnsValidUUID() {
        //WHEN
        String uuid = idService.getUUID();

        //THEN
        assertDoesNotThrow(() -> UUID.fromString(uuid));
    }
}