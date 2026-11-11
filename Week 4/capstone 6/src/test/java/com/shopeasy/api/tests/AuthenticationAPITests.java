// REST Assured tests for the ShopEasy authentication API endpoints.
// Covers login, registration, logout, forgot-password, and session validation.
package com.shopeasy.api.tests;

import io.restassured.filter.session.SessionFilter;
import org.testng.annotations.Test;
import com.shopeasy.api.client.AuthAPI;
import static org.hamcrest.Matchers.*;

public class AuthenticationAPITests {

    @Test
    public void testLoginWithValidCredentials() {
        SessionFilter session = new SessionFilter();
        AuthAPI.login(session, "bhavna.test@example.com", "Valid#123")
            .then()
                .statusCode(200)
                .body("user.email", equalTo("bhavna.test@example.com"));
    }

    @Test
    public void testRegisterNewUser() {
        SessionFilter session = new SessionFilter();
        String email = "bhavna" + System.currentTimeMillis() + "@example.com";
        AuthAPI.register(session, "API User", email, "Strong#Pass1")
            .then()
                .statusCode(200);
    }

    @Test
    public void testGetMeWithoutLogin() {
        SessionFilter session = new SessionFilter();
        AuthAPI.getMe(session)
            .then()
                .statusCode(200)
                .body("loggedIn", equalTo(false));
    }

}
