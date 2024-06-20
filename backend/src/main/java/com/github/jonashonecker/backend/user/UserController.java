package com.github.jonashonecker.backend.user;

import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @GetMapping("/me")
    public TicketScoutUser getMe(@AuthenticationPrincipal OAuth2User user) {
        return new TicketScoutUser(
                user.getAttributes().get("login").toString(),
                user.getAttributes().get("avatar_url").toString()
        );
    }
}