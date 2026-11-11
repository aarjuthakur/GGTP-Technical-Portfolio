// REST Assured client for ShopEasy checkout endpoints.
// Provides methods for pricing, coupons, and placing orders using session cookies.
package com.shopeasy.api.client;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.filter.session.SessionFilter;
import static io.restassured.RestAssured.given;

public class CheckoutAPI {

    private static final String BASE_URI = "http://localhost:8080";

    public static Response getPricing(SessionFilter session, String shipMethod) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
                .queryParam("ship", shipMethod)
            .when()
                .get("/api/checkout/pricing")
            .then()
                .extract().response();
    }

    public static Response applyCoupon(SessionFilter session, String code) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
                .contentType(ContentType.JSON)
                .body("{\"code\":\"" + code + "\"}")
            .when()
                .post("/api/checkout/coupon")
            .then()
                .extract().response();
    }

    public static Response removeCoupon(SessionFilter session) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
            .when()
                .delete("/api/checkout/coupon")
            .then()
                .extract().response();
    }

    public static Response placeOrder(SessionFilter session, String body) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
                .contentType(ContentType.JSON)
                .body(body)
            .when()
                .post("/api/checkout")
            .then()
                .extract().response();
    }
}
