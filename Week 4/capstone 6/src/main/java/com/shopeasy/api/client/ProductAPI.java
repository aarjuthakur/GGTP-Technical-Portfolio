// REST Assured client for ShopEasy product endpoints.
// Provides methods to list, search, and get products by ID.
package com.shopeasy.api.client;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import static io.restassured.RestAssured.given;

public class ProductAPI {

    private static final String BASE_URI = "http://localhost:8080";

    public static Response getAllProducts() {
        return given()
                .baseUri(BASE_URI)
            .when()
                .get("/api/products")
            .then()
                .extract().response();
    }

    public static Response searchProducts(String query) {
        return given()
                .baseUri(BASE_URI)
                .queryParam("q", query)
            .when()
                .get("/api/products")
            .then()
                .extract().response();
    }

    public static Response getProductById(String productId) {
        return given()
                .baseUri(BASE_URI)
            .when()
                .get("/api/products/" + productId)
            .then()
                .extract().response();
    }
}
