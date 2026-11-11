// REST Assured client for ShopEasy authentication endpoints.
// Provides login, register, logout, forgot-password, and current user methods.
package com.shopeasy.api.client;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.filter.session.SessionFilter;
import static io.restassured.RestAssured.given;

public class AuthAPI {

    private static final String BASE_URI = "http://localhost:8080";

    public static Response login(SessionFilter session, String email, String password) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
                .contentType(ContentType.JSON)
                .body("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}")
            .when()
                .post("/api/auth/login")
            .then()
                .extract().response();
    }

    public static Response register(SessionFilter session, String name, String email, String password) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
                .contentType(ContentType.JSON)
                .body("{\"name\":\"" + name + "\",\"email\":\"" + email + "\",\"password\":\"" + password + "\"}")
            .when()
                .post("/api/auth/register")
            .then()
                .extract().response();
    }

    public static Response logout(SessionFilter session) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
            .when()
                .post("/api/auth/logout")
            .then()
                .extract().response();
    }

    public static Response getMe(SessionFilter session) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
            .when()
                .get("/api/auth/me")
            .then()
                .extract().response();
    }

    public static Response forgotPassword(String email, String newPassword) {
        return given()
                .baseUri(BASE_URI)
                .contentType(ContentType.JSON)
                .body("{\"email\":\"" + email + "\",\"newPassword\":\"" + newPassword + "\"}")
            .when()
                .post("/api/auth/forgot-password")
            .then()
                .extract().response();
    }
}
