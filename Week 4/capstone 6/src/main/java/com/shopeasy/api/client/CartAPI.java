// REST Assured client for ShopEasy cart endpoints.
// Provides methods to get, add, update, remove cart items using session cookies.
package com.shopeasy.api.client;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.filter.session.SessionFilter;
import static io.restassured.RestAssured.given;

public class CartAPI {

    private static final String BASE_URI = "http://localhost:8080";

    public static Response getCart(SessionFilter session) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
            .when()
                .get("/api/cart")
            .then()
                .extract().response();
    }

    public static Response getCartCount(SessionFilter session) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
            .when()
                .get("/api/cart/count")
            .then()
                .extract().response();
    }

    public static Response addToCart(SessionFilter session, String productId, int quantity) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
                .contentType(ContentType.JSON)
                .body("{\"productId\":\"" + productId + "\",\"quantity\":" + quantity + "}")
            .when()
                .post("/api/cart")
            .then()
                .extract().response();
    }

    public static Response updateQuantity(SessionFilter session, String productId, int quantity) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
                .contentType(ContentType.JSON)
                .body("{\"quantity\":" + quantity + "}")
            .when()
                .put("/api/cart/" + productId)
            .then()
                .extract().response();
    }

    public static Response removeFromCart(SessionFilter session, String productId) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
            .when()
                .delete("/api/cart/" + productId)
            .then()
                .extract().response();
    }

    public static Response clearCart(SessionFilter session) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
            .when()
                .delete("/api/cart")
            .then()
                .extract().response();
    }
}
