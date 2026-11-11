// Page object for the ShopEasy home page.
// Handles product search, product card clicks, and cart badge reading.
package com.shopeasy.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class HomePage {

    private WebDriver driver;
    private WebDriverWait wait;

    private By searchInput = By.cssSelector("[data-testid='search-input']");
    private By searchBtn = By.cssSelector("[data-testid='search-btn']");
    private By cartBadge = By.cssSelector("[data-testid='cart-badge']");
    private By navCart = By.cssSelector("[data-testid='nav-cart']");
    private By navLogin = By.cssSelector("[data-testid='nav-login']");
    private By navLogout = By.cssSelector("[data-testid='nav-logout']");
    private By navOrders = By.cssSelector("[data-testid='nav-orders']");

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    public void searchProduct(String query) {
        WebElement input = wait.until(ExpectedConditions.elementToBeClickable(searchInput));
        input.clear();
        input.sendKeys(query);
        driver.findElement(searchBtn).click();
    }

    public int getCartBadgeCount() {
        WebElement badge = wait.until(ExpectedConditions.visibilityOfElementLocated(cartBadge));
        String text = badge.getText().trim();
        if (text.isEmpty()) return 0;
        return Integer.parseInt(text);
    }

    public void clickProduct(String productId) {
        By link = By.cssSelector("[data-testid='product-link-" + productId + "']");
        wait.until(ExpectedConditions.elementToBeClickable(link)).click();
    }

    public List<WebElement> getProductCards() {
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("[data-testid^='product-card-']")));
        return driver.findElements(By.cssSelector("[data-testid^='product-card-']"));
    }

    public void goToCart() {
        wait.until(ExpectedConditions.elementToBeClickable(navCart)).click();
    }

    public void goToLogin() {
        wait.until(ExpectedConditions.elementToBeClickable(navLogin)).click();
    }

    public void goToOrders() {
        wait.until(ExpectedConditions.elementToBeClickable(navOrders)).click();
    }

    public boolean isLogoutVisible() {
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(navLogout));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void clickLogout() {
        wait.until(ExpectedConditions.elementToBeClickable(navLogout)).click();
    }
}
