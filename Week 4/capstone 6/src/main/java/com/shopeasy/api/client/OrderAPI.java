// REST Assured client for ShopEasy order and admin endpoints.
// Provides methods to list, cancel, return orders and admin setup operations.
package com.shopeasy.api.client;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.filter.session.SessionFilter;
import static io.restassured.RestAssured.given;

public class OrderAPI {

    private static final String BASE_URI = "http://localhost:8080";

    public static Response getOrders(SessionFilter session) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
            .when()
                .get("/api/orders")
            .then()
                .extract().response();
    }

    public static Response getOrderById(SessionFilter session, String orderId) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
            .when()
                .get("/api/orders/" + orderId)
            .then()
                .extract().response();
    }

    public static Response cancelOrder(SessionFilter session, String orderId) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
            .when()
                .post("/api/orders/" + orderId + "/cancel")
            .then()
                .extract().response();
    }

    public static Response returnOrder(SessionFilter session, String orderId, boolean unused) {
        return given()
                .filter(session)
                .baseUri(BASE_URI)
                .contentType(ContentType.JSON)
                .body("{\"unused\":" + unused + "}")
            .when()
                .post("/api/orders/" + orderId + "/return")
            .then()
                .extract().response();
    }

    public static Response advanceOrder(String orderId) {
        return given()
                .baseUri(BASE_URI)
                .header("X-Admin-Pin", "qa-lead")
            .when()
                .post("/api/admin/orders/" + orderId + "/advance")
            .then()
                .extract().response();
    }

    public static Response ageOrder(String orderId) {
        return given()
                .baseUri(BASE_URI)
                .header("X-Admin-Pin", "qa-lead")
            .when()
                .post("/api/admin/orders/" + orderId + "/age")
            .then()
                .extract().response();
    }

    public static Response resetData() {
        return given()
                .baseUri(BASE_URI)
                .header("X-Admin-Pin", "qa-lead")
            .when()
                .post("/api/admin/reset")
            .then()
                .extract().response();
    }
}
