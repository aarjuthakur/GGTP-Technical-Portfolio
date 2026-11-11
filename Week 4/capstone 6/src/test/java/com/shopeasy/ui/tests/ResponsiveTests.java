// UI tests for responsive layout at different viewport sizes.
// Covers mobile viewport, pay button overlap (D09), and terms link hover (D13).
package com.shopeasy.ui.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
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
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;
import java.util.List;

public class ResponsiveTests extends BaseTest {

    @Test
    public void testMobileViewport375px() {
        driver.manage().window().setSize(new Dimension(375, 812));
        driver.get(BASE_URL);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("[data-testid^='product-card-']")));
        HomePage homePage = new HomePage(driver);
        List<WebElement> products = homePage.getProductCards();
        Assert.assertTrue(products.size() > 0,
                "Products should be visible at mobile viewport 375px");
    }

    @Test(description = "D09: Pay now button should not overlap address block at 375px")
    public void testPayButtonNoOverlapAt375px() {
        loginAddItemAndGoToCheckout();
        CheckoutPage checkoutPage = new CheckoutPage(driver);
        checkoutPage.fillAddress("Maya Test", "9876543210", "123 Main St", "560001");
        driver.manage().window().setSize(new Dimension(375, 812));
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        wait.until(ExpectedConditions.presenceOfElementLocated(
                By.cssSelector("[data-testid='pay-btn']")));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        Boolean overlaps = (Boolean) js.executeScript(
                "var btn = document.querySelector(\"[data-testid='pay-btn']\");"
                + "var pin = document.querySelector(\"[data-testid='checkout-pincode']\");"
                + "if (!btn || !pin) return false;"
                + "var br = btn.getBoundingClientRect();"
                + "var pr = pin.getBoundingClientRect();"
                + "return br.top < pr.bottom && br.bottom > pr.top"
                + "  && br.left < pr.right && br.right > pr.left;");
        try {
            Assert.assertFalse(overlaps,
                    "Pay button should not overlap address block at 375px viewport");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D09 DETECTED] Pay now button overlaps the address block at 375px viewport. " + e.getMessage(), e);
        }
    }

    @Test(description = "D13: Terms link should have underline on hover")
    public void testTermsLinkUnderlineOnHover() {
        loginAddItemAndGoToCheckout();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        WebElement termsLink = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.cssSelector("[data-testid='terms-link']")));
        Actions actions = new Actions(driver);
        actions.moveToElement(termsLink).perform();
        String textDecoration = termsLink.getCssValue("text-decoration");
        try {
            Assert.assertTrue(textDecoration.contains("underline"),
                    "Terms link should show underline on hover, got: " + textDecoration);
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D13 DETECTED] Terms link has no underline on hover. " + e.getMessage(), e);
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
