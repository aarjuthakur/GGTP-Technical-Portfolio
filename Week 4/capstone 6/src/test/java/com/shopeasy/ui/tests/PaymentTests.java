// UI tests for payment processing scenarios during checkout on ShopEasy.
// Covers UPI payment above Rs 5,000 (D05) and gateway charge mismatch (D03).
package com.shopeasy.ui.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;
import com.shopeasy.base.BaseTest;
import com.shopeasy.pages.HomePage;
import com.shopeasy.pages.LoginPage;
import com.shopeasy.pages.CartPage;
import com.shopeasy.pages.CheckoutPage;
import java.util.List;

public class PaymentTests extends BaseTest {

    private void loginAddItemAndGoToCheckout() {
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
    }

    @Test(description = "D05: UPI payment should work for orders above Rs 5,000")
    public void testUpiPaymentAbove5000() {
        HomePage homePage = new HomePage(driver);
        homePage.goToLogin();
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login("maya.test@example.com", "Valid#123");
        driver.get(BASE_URL);
        homePage = new HomePage(driver);
        homePage.clickProduct("p6");
        CartPage cartPage = new CartPage(driver);
        cartPage.clickAddToCart();
        driver.get(BASE_URL + "#/cart");
        cartPage = new CartPage(driver);
        cartPage.goToCheckout();
        CheckoutPage checkoutPage = new CheckoutPage(driver);
        checkoutPage.fillAddress("Maya Test", "9876543210", "123 Main St", "560001");
        WebElement upiRadio = driver.findElement(By.cssSelector("input[value='upi']"));
        upiRadio.click();
        WebElement upiId = driver.findElement(By.cssSelector("#upi"));
        upiId.sendKeys("testuser@bank");
        checkoutPage.clickPlaceOrder();
        boolean hasError500 = driver.findElements(By.cssSelector(".err500")).size() > 0;
        String orderId = null;
        if (!hasError500) {
            orderId = checkoutPage.getOrderId();
        }
        try {
            Assert.assertFalse(hasError500,
                    "UPI payment above Rs 5,000 should not return error 500");
            Assert.assertNotNull(orderId, "Order ID should be returned for UPI payment");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D05 DETECTED] UPI payment fails with 500 error for orders above Rs 5,000. " + e.getMessage(), e);
        }
    }

    @Test(description = "D03: Gateway charge should match order total")
    public void testGatewayChargeMatchesOrderTotal() {
        loginAddItemAndGoToCheckout();
        CheckoutPage checkoutPage = new CheckoutPage(driver);
        checkoutPage.fillAddress("Maya Test", "9876543210", "123 Main St", "560001");
        checkoutPage.fillCardDetails("4111111111111111", "12/30", "123");
        checkoutPage.clickPlaceOrder();
        String orderTotal = checkoutPage.getOrderTotal();
        WebElement chargedElem = driver.findElement(By.cssSelector("[data-testid='charged']"));
        String charged = chargedElem.getText();
        try {
            Assert.assertEquals(charged, orderTotal,
                    "Gateway charged amount should match order total");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D03 DETECTED] Gateway charged amount does not match order total. " + e.getMessage(), e);
        }
    }
}
