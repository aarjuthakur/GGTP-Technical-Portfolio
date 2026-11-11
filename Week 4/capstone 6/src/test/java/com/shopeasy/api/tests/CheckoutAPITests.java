// REST Assured tests for the ShopEasy checkout API endpoints.
// Covers coupon application, card payment, and COD order placement.
package com.shopeasy.api.tests;

import io.restassured.filter.session.SessionFilter;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.shopeasy.api.client.AuthAPI;
import com.shopeasy.api.client.CartAPI;
import com.shopeasy.api.client.CheckoutAPI;
import static org.hamcrest.Matchers.*;

public class CheckoutAPITests {

    private SessionFilter session;

    @BeforeMethod
    public void setUp() {
        session = new SessionFilter();
        String email = "checkout" + System.currentTimeMillis() + "@example.com";
        AuthAPI.register(session, "Checkout User", email, "Test#1234");
    }

    private void addProductToCart(String productId, int qty) {
        CartAPI.addToCart(session, productId, qty);
    }

    @Test
    public void testApplyValidCoupon() {
        addProductToCart("p1", 1);
        CheckoutAPI.applyCoupon(session, "SAVE10")
            .then()
                .statusCode(200);
    }

    @Test
    public void testPlaceOrderWithCard() {
        addProductToCart("p1", 1);
        String body = "{\"name\":\"Test\",\"phone\":\"9876543210\","
                + "\"addressLine\":\"123 St\",\"pincode\":\"560001\","
                + "\"shipMethod\":\"standard\",\"payMethod\":\"card\","
                + "\"cardNumber\":\"4111111111111111\",\"cardExpiry\":\"12/30\",\"cardCvv\":\"123\"}";
        CheckoutAPI.placeOrder(session, body)
            .then()
                .statusCode(200)
                .body("id", notNullValue());
    }

    @Test
    public void testPlaceOrderCOD() {
        addProductToCart("p1", 1);
        String body = "{\"name\":\"Test\",\"phone\":\"9876543210\","
                + "\"addressLine\":\"123 St\",\"pincode\":\"560001\","
                + "\"shipMethod\":\"standard\"}";
        CheckoutAPI.placeOrder(session, body)
            .then()
                .statusCode(200)
                .body("id", notNullValue());
    }
}
