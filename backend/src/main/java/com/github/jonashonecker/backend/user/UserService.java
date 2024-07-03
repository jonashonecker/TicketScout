package com.github.jonashonecker.backend.user;

import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public TicketScoutUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        assert authentication.getPrincipal() instanceof OAuth2User;
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        return new TicketScoutUser(
                oauthUser.getAttributes().get("login").toString(),
                oauthUser.getAttributes().get("avatar_url").toString()
        );
    }

    public String getUsername() {
        return getCurrentUser().name();
    }
}
