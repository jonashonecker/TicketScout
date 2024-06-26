package com.github.jonashonecker.backend.user;

import com.github.jonashonecker.backend.user.domain.TicketScoutUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public TicketScoutUser getMe() {
        return userService.getCurrentUser();
    }
}