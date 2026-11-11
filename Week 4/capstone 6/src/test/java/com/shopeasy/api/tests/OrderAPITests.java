// REST Assured tests for the ShopEasy order and admin API endpoints.
// Covers placing orders, cancelling, returning, return window expiry, and user filtering.
package com.shopeasy.api.tests;

import io.restassured.filter.session.SessionFilter;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.shopeasy.api.client.AuthAPI;
import com.shopeasy.api.client.CartAPI;
import com.shopeasy.api.client.CheckoutAPI;
import com.shopeasy.api.client.OrderAPI;
import com.shopeasy.api.client.ProductAPI;
import java.util.List;
import static org.hamcrest.Matchers.*;

public class OrderAPITests {

    private SessionFilter session;

    @BeforeMethod
    public void setUp() {
        session = new SessionFilter();
        String email = "ordertest" + System.currentTimeMillis() + "@example.com";
        AuthAPI.register(session, "OrderTestUser", email, "Test#1234");
    }

    private String placeTestOrder() {
        Response products = ProductAPI.getAllProducts();
        String productId = products.jsonPath().getString("[0].id");
        CartAPI.addToCart(session, productId, 1);
        String orderBody = "{\"name\":\"Test User\",\"phone\":\"9876543210\","
                + "\"addressLine\":\"123 Test St\",\"pincode\":\"560001\","
                + "\"shipMethod\":\"standard\"}";
        Response order = CheckoutAPI.placeOrder(session, orderBody);
        return order.jsonPath().getString("id");
    }

    @Test
    public void testPlaceOrderAndGetList() {
        placeTestOrder();
        OrderAPI.getOrders(session)
            .then()
                .statusCode(200)
                .body("size()", greaterThan(0));
    }

    @Test
    public void testCancelOrder() {
        String orderId = placeTestOrder();
        OrderAPI.cancelOrder(session, orderId)
            .then()
                .statusCode(200);
    }

    @Test
    public void testReturnDeliveredOrder() {
        String orderId = placeTestOrder();
        // COD order: Placed -> Packed -> Shipped -> Delivered (3 advances)
        OrderAPI.advanceOrder(orderId);
        OrderAPI.advanceOrder(orderId);
        OrderAPI.advanceOrder(orderId);
        OrderAPI.returnOrder(session, orderId, true)
            .then()
                .statusCode(200);
    }

    @Test
    public void testGetOrdersWithoutLogin() {
        SessionFilter emptySession = new SessionFilter();
        OrderAPI.getOrders(emptySession)
            .then()
                .statusCode(200)
                .body("size()", equalTo(0));
    }

    @Test(description = "D14: Orders API should only return the logged-in user's orders")
    public void testOrdersFilteredByUser() {
        String orderIdUser1 = placeTestOrder();
        Assert.assertNotNull(orderIdUser1, "User 1 order must be placed");

        SessionFilter session2 = new SessionFilter();
        String email2 = "orderuser2_" + System.currentTimeMillis() + "@example.com";
        AuthAPI.register(session2, "OrderUser2", email2, "Test#1234");
        Response products = ProductAPI.getAllProducts();
        String productId = products.jsonPath().getString("[0].id");
        CartAPI.addToCart(session2, productId, 1);
        String orderBody = "{\"name\":\"User Two\",\"phone\":\"9876543210\","
                + "\"addressLine\":\"456 Other St\",\"pincode\":\"560002\","
                + "\"shipMethod\":\"standard\"}";
        Response order2 = CheckoutAPI.placeOrder(session2, orderBody);
        String orderIdUser2 = order2.jsonPath().getString("id");
        Assert.assertNotNull(orderIdUser2, "User 2 order must be placed");

        List<String> user1OrderIds = OrderAPI.getOrders(session).jsonPath().getList("id");
        List<String> user2OrderIds = OrderAPI.getOrders(session2).jsonPath().getList("id");

        try {
            Assert.assertTrue(user1OrderIds.contains(orderIdUser1),
                    "User 1 should see their own order");
            Assert.assertFalse(user1OrderIds.contains(orderIdUser2),
                    "User 1 should NOT see User 2's order");
            Assert.assertTrue(user2OrderIds.contains(orderIdUser2),
                    "User 2 should see their own order");
            Assert.assertFalse(user2OrderIds.contains(orderIdUser1),
                    "User 2 should NOT see User 1's order");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D14 DETECTED] Orders list shows every user's orders (not filtered by user). " + e.getMessage(), e);
        }
    }
}
