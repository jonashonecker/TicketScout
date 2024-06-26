package com.github.jonashonecker.backend.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void getMe_whenUserNotLoggedIn_returnUnauthorized() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(get("/api/auth/me"))
                //THEN
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }


    @Test
    @WithMockUser
    void getMe_whenUserLoggedIn_returnUserInformation() throws Exception {
        //GIVEN
        //WHEN
        mockMvc.perform(get("/api/auth/me").with(oidcLogin().userInfoToken(token -> token
                                .claim("login", "testUser")
                                .claim("avatar_url", "testAvatarUrl")
                        ))
                )
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "name": "testUser",
                            "avatarUrl": "testAvatarUrl"
                        }
                        """));
    }
}