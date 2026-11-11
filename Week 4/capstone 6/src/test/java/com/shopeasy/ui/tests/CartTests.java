// UI tests for shopping cart functionality on ShopEasy.
// Covers cart badge visibility (D07) and quantity max limit (D01).
package com.shopeasy.ui.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import com.shopeasy.base.BaseTest;
import com.shopeasy.pages.HomePage;
import com.shopeasy.pages.CartPage;
import java.time.Duration;
import java.util.List;

public class CartTests extends BaseTest {

    @Test(description = "D07: Cart badge should show correct count after adding item")
    public void testCartBadgeVisibleAfterAdd() {
        HomePage homePage = new HomePage(driver);
        List<WebElement> products = homePage.getProductCards();
        Assert.assertTrue(products.size() > 0, "Products must be visible");
        products.get(0).click();
        CartPage cartPage = new CartPage(driver);
        cartPage.clickAddToCart();
        try {
            Assert.assertTrue(cartPage.isCartBadgeVisible(), "Cart badge should be visible after adding item");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D07 DETECTED] Cart badge intermittently shows 0 after adding item. " + e.getMessage(), e);
        }
    }

    @Test(description = "D01: Cart should reject quantity above 10")
    public void testQuantityAboveMaximumRejected() {
        HomePage homePage = new HomePage(driver);
        List<WebElement> products = homePage.getProductCards();
        products.get(0).click();
        CartPage cartPage = new CartPage(driver);
        cartPage.addToCartWithQuantity(11);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".err")));
        } catch (Exception ignored) {
        }
        List<WebElement> errors = driver.findElements(By.cssSelector(".err"));
        boolean hasError = errors.stream().anyMatch(e -> e.getText().contains("Maximum quantity is 10"));
        try {
            Assert.assertTrue(hasError, "Adding qty 11 should show 'Maximum quantity is 10' error");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D01 DETECTED] Cart accepts quantity above 10 without validation. " + e.getMessage(), e);
        }
    }
}
