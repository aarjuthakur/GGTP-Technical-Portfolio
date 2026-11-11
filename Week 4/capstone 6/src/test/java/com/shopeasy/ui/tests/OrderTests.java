// UI tests for order management on ShopEasy.
// Covers shipped order cancellation defect (D08).
package com.shopeasy.ui.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import com.shopeasy.base.BaseTest;
import com.shopeasy.pages.HomePage;
import com.shopeasy.pages.LoginPage;
import com.shopeasy.pages.CartPage;
import com.shopeasy.pages.CheckoutPage;
import java.time.Duration;
import java.util.List;

public class OrderTests extends BaseTest {

    private String placeOrderAndGetId() {
        HomePage homePage = new HomePage(driver);
        homePage.goToLogin();
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login("maya.test@example.com", "Valid#123");
        driver.get(BASE_URL);
        homePage = new HomePage(driver);
        List<WebElement> products = homePage.getProductCards();
        products.get(0).click();
        CartPage cartPage = new CartPage(driver);
        cartPage.clickAddToCart();
        driver.get(BASE_URL + "#/cart");
        cartPage = new CartPage(driver);
        cartPage.goToCheckout();
        CheckoutPage checkoutPage = new CheckoutPage(driver);
        checkoutPage.fillAddress("Maya Test", "9876543210", "123 Main St", "560001");
        checkoutPage.selectCodPayment();
        checkoutPage.clickPlaceOrder();
        return checkoutPage.getOrderId();
    }

    @Test(description = "D08: Shipped orders should NOT be cancellable")
    public void testCancelShippedOrderShouldFail() {
        String orderId = placeOrderAndGetId();
        Assert.assertNotNull(orderId, "Order ID must not be null");
        com.shopeasy.api.client.OrderAPI.advanceOrder(orderId);
        com.shopeasy.api.client.OrderAPI.advanceOrder(orderId);
        driver.get(BASE_URL + "#/orders");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        wait.until(ExpectedConditions.presenceOfElementLocated(
                By.cssSelector("[data-testid='order-card-" + orderId + "']")));
        boolean cancelVisible = driver.findElements(
                By.cssSelector("[data-action='cancel'][data-id='" + orderId + "']")).size() > 0;
        try {
            Assert.assertFalse(cancelVisible,
                    "Cancel button should NOT be visible for shipped orders");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D08 DETECTED] Shipped order can be cancelled. " + e.getMessage(), e);
        }
    }
}
