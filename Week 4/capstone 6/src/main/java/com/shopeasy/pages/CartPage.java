// Page object for the ShopEasy cart page.
// Handles cart item display, quantity changes, and badge count reading.
package com.shopeasy.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class CartPage {

    private WebDriver driver;
    private WebDriverWait wait;

    private By cartBadge = By.cssSelector("[data-testid='cart-badge']");
    private By qtyInput = By.cssSelector("[data-testid='qty-input']");
    private By addToCartBtn = By.cssSelector("[data-testid='add-to-cart-btn']");
    private By checkoutBtn = By.cssSelector("[data-testid='checkout-btn']");

    public CartPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    public int getCartBadgeCount() {
        WebElement badge = wait.until(ExpectedConditions.visibilityOfElementLocated(cartBadge));
        String text = badge.getText().trim();
        if (text.isEmpty()) return 0;
        return Integer.parseInt(text);
    }

    public boolean isCartBadgeVisible() {
        return driver.findElements(cartBadge).size() > 0;
    }

    public void setQuantity(int quantity) {
        WebElement input = wait.until(ExpectedConditions.visibilityOfElementLocated(qtyInput));
        input.clear();
        input.sendKeys(String.valueOf(quantity));
    }

    public void clickAddToCart() {
        wait.until(ExpectedConditions.elementToBeClickable(addToCartBtn)).click();
    }

    public void addToCartWithQuantity(int quantity) {
        setQuantity(quantity);
        clickAddToCart();
    }

    public void goToCheckout() {
        wait.until(ExpectedConditions.elementToBeClickable(checkoutBtn)).click();
    }
}
