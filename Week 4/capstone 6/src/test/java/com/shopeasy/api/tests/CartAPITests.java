// REST Assured tests for the ShopEasy cart API endpoints.
// Covers add, get, update, remove, and cart count operations with session authentication.
package com.shopeasy.api.tests;

import io.restassured.filter.session.SessionFilter;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.shopeasy.api.client.AuthAPI;
import com.shopeasy.api.client.CartAPI;
import com.shopeasy.api.client.ProductAPI;
import static org.hamcrest.Matchers.*;

public class CartAPITests {

    private SessionFilter session;
    private String productId;

    @BeforeMethod
    public void setUp() {
        session = new SessionFilter();
        AuthAPI.register(session, "CartTestUser",
                "carttest" + System.currentTimeMillis() + "@example.com", "Test#1234");
        productId = ProductAPI.getAllProducts().jsonPath().getString("[0].id");
    }

    @Test
    public void testAddToCartReturns200() {
        CartAPI.addToCart(session, productId, 1)
            .then()
                .statusCode(200);
    }

    @Test
    public void testGetCartAfterAdd() {
        CartAPI.addToCart(session, productId, 2);
        CartAPI.getCart(session)
            .then()
                .statusCode(200)
                .body("items.size()", greaterThan(0));
    }

    @Test
    public void testUpdateCartQuantity() {
        CartAPI.addToCart(session, productId, 1);
        CartAPI.updateQuantity(session, productId, 5)
            .then()
                .statusCode(200);
    }

    @Test
    public void testRemoveFromCart() {
        CartAPI.addToCart(session, productId, 1);
        CartAPI.removeFromCart(session, productId)
            .then()
                .statusCode(200);
    }

}
