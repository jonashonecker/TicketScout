package com.github.jonashonecker.backend.user;

import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import com.github.jonashonecker.backend.user.exception.UserAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public TicketScoutUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof OAuth2User oauthUser) {
            return new TicketScoutUser(
                    oauthUser.getAttributes().get("login").toString(),
                    oauthUser.getAttributes().get("avatar_url").toString()
            );
        }
        throw new UserAuthenticationException("Could not retrieve current user.");
    }
}
