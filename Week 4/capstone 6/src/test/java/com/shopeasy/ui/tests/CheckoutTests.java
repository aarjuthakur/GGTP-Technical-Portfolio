// UI tests for the checkout flow on ShopEasy.
// Covers coupon stacking defect (D10) and free shipping boundary (D06).
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

public class CheckoutTests extends BaseTest {

    private void loginAndAddItemToCart() {
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

    @Test(description = "D10: Coupon discount should not stack when applied repeatedly")
    public void testCouponDoesNotStackOnReapply() {
        loginAndAddItemToCart();
        CheckoutPage checkoutPage = new CheckoutPage(driver);
        checkoutPage.fillAddress("Maya Test", "9876543210", "123 Main St", "560001");
        checkoutPage.applyCoupon("SAVE10");
        String totalAfterFirst = checkoutPage.getOrderTotal();
        checkoutPage.applyCoupon("SAVE10");
        String totalAfterSecond = checkoutPage.getOrderTotal();
        try {
            Assert.assertEquals(totalAfterSecond, totalAfterFirst,
                    "Total should not change when same coupon is applied twice");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D10 DETECTED] Coupon discount stacks when applied multiple times. " + e.getMessage(), e);
        }
    }

    @Test(description = "D06: Free shipping at exactly Rs 2,000 subtotal")
    public void testFreeShippingAtExactly2000() {
        HomePage homePage = new HomePage(driver);
        homePage.goToLogin();
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login("maya.test@example.com", "Valid#123");
        driver.get(BASE_URL);
        homePage = new HomePage(driver);
        homePage.clickProduct("p7");
        CartPage cartPage = new CartPage(driver);
        cartPage.addToCartWithQuantity(4);
        driver.get(BASE_URL + "#/cart");
        cartPage = new CartPage(driver);
        cartPage.goToCheckout();
        CheckoutPage checkoutPage = new CheckoutPage(driver);
        checkoutPage.fillAddress("Maya Test", "9876543210", "123 Main St", "560001");
        String total = checkoutPage.getOrderTotal();
        try {
            Assert.assertTrue(total.contains("2,000") || total.contains("2000"),
                    "4 Cotton T-Shirts (Rs 500 x 4 = 2,000) should get free standard shipping");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D06 DETECTED] Free shipping not applied at exactly Rs 2,000 subtotal. " + e.getMessage(), e);
        }
    }
}
