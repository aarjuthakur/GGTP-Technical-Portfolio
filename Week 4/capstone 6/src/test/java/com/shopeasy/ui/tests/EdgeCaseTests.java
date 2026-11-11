// UI tests for boundary values and edge cases on ShopEasy.
// Covers pincode BVA (D11) and XSS in search.
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

public class EdgeCaseTests extends BaseTest {

    @Test
    public void testSearchWithSpecialCharacters() {
        HomePage homePage = new HomePage(driver);
        homePage.searchProduct("<script>alert(1)</script>");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        wait.until(ExpectedConditions.urlContains("#/products"));
        String source = driver.getPageSource();
        Assert.assertFalse(source.contains("<script>alert(1)</script>"),
                "XSS attempt should not inject unescaped script into the page");
    }

    @Test(description = "D11: 5-digit pincode should be rejected")
    public void testPincode5DigitsRejected() {
        loginAddItemAndGoToCheckout();
        CheckoutPage checkoutPage = new CheckoutPage(driver);
        checkoutPage.fillAddress("Maya Test", "9876543210", "123 Main St", "40001");
        checkoutPage.clickPlaceOrder();
        List<WebElement> errors = driver.findElements(By.cssSelector("#e-apin"));
        boolean hasError = errors.stream().anyMatch(e -> e.getText().contains("6-digit pincode"));
        try {
            Assert.assertTrue(hasError, "5-digit pincode should show '6-digit pincode' error");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D11 DETECTED] 5-digit pincode is accepted instead of requiring 6 digits. " + e.getMessage(), e);
        }
    }

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
}
