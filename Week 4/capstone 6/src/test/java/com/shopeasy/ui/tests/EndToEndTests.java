// End-to-end test covering the full ShopEasy user journey.
// Register, login, search, add to cart, checkout, verify order, logout.
package com.shopeasy.ui.tests;

import com.shopeasy.base.BaseTest;
import com.shopeasy.pages.*;
import org.testng.Assert;
import org.testng.annotations.Test;

public class EndToEndTests extends BaseTest {

    @Test(description = "Complete user journey: register, login, search, add to cart, checkout with COD, verify order, logout")
    public void testFullPurchaseFlow() {
        HomePage homePage = new HomePage(driver);
        LoginPage loginPage = new LoginPage(driver);
        RegisterPage registerPage = new RegisterPage(driver);
        CartPage cartPage = new CartPage(driver);
        CheckoutPage checkoutPage = new CheckoutPage(driver);
        OrdersPage ordersPage = new OrdersPage(driver);

        String email = "e2e_" + System.currentTimeMillis() + "@example.com";
        String password = "Strong#Pass1";

        // Step 1: Register a new user
        driver.get(BASE_URL + "#/register");
        registerPage.register("E2E User", email, password);

        // Step 2: Login with the new account
        driver.get(BASE_URL + "#/login");
        loginPage.login(email, password);
        Assert.assertTrue(homePage.isLogoutVisible(),
                "User should be logged in after login");

        // Step 3: Search for a product
        homePage.searchProduct("Running Shoes");
        Assert.assertFalse(homePage.getProductCards().isEmpty(),
                "Search should return at least one product");

        // Step 4: Click on first product and add to cart
        homePage.getProductCards().get(0).click();
        cartPage.clickAddToCart();

        // Step 5: Go to cart and proceed to checkout
        homePage.goToCart();
        cartPage.goToCheckout();

        // Step 6: Fill address and place order with COD
        checkoutPage.fillAddress("E2E User", "9876543210", "100 Test Street", "560001");
        checkoutPage.selectCodPayment();
        checkoutPage.clickPlaceOrder();

        // Step 7: Verify order was created
        String confirmedOrderId = checkoutPage.getOrderId();
        Assert.assertNotNull(confirmedOrderId,
                "Order ID should be displayed after placing order");
        Assert.assertFalse(confirmedOrderId.isEmpty(),
                "Order ID should not be empty");

        // Step 8: Verify order appears in orders page
        ordersPage.goToOrdersPage();
        Assert.assertTrue(ordersPage.isOrderDisplayed(confirmedOrderId),
                "Placed order should appear in orders list");

        // Step 9: Logout
        homePage.clickLogout();
        Assert.assertFalse(homePage.isLogoutVisible(),
                "Logout link should disappear after logging out");
    }
}
