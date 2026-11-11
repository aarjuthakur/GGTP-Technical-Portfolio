// UI tests for shipping validation on ShopEasy checkout.
// Covers valid pincode acceptance for order placement.
package com.shopeasy.ui.tests;

import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;
import com.shopeasy.base.BaseTest;
import com.shopeasy.pages.HomePage;
import com.shopeasy.pages.LoginPage;
import com.shopeasy.pages.CartPage;
import com.shopeasy.pages.CheckoutPage;
import java.util.List;

public class ShippingTests extends BaseTest {

    @Test
    public void testCheckoutWithValidPincode() {
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
        String orderId = checkoutPage.getOrderId();
        Assert.assertNotNull(orderId, "Order should be placed with valid 6-digit pincode");
    }
}
