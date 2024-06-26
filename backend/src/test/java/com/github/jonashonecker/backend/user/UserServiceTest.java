package com.github.jonashonecker.backend.user;

import com.github.jonashonecker.backend.user.exception.UserAuthenticationException;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceTest {

    @Test
    void getCurrentUser_whenPrincipalNotOAuth2User_throwsUserAuthenticationException() {
        //GIVEN
        UserService userService = new UserService();
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(new Object());
        String expectedMessage = "Could not retrieve current user.";

        try (MockedStatic<SecurityContextHolder> mockedSecurityContextHolder = Mockito.mockStatic(SecurityContextHolder.class)) {
            mockedSecurityContextHolder.when(SecurityContextHolder::getContext).thenReturn(securityContext);

            //WHEN
            UserAuthenticationException userAuthenticationException = assertThrows(UserAuthenticationException.class, userService::getCurrentUser);

            //THEN
            assertEquals(expectedMessage, userAuthenticationException.getMessage());
        }
    }
}