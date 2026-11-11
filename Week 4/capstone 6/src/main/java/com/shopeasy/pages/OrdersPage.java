// Page object for the ShopEasy orders page.
// Handles order list display, cancel, and return actions.
package com.shopeasy.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class OrdersPage {

    private WebDriver driver;
    private WebDriverWait wait;

    private By navOrders = By.cssSelector("[data-testid='nav-orders']");

    public OrdersPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    public void goToOrdersPage() {
        wait.until(ExpectedConditions.elementToBeClickable(navOrders)).click();
    }

    public boolean isOrderDisplayed(String orderId) {
        By orderLocator = By.cssSelector("[data-testid='order-id-" + orderId + "']");
        return driver.findElements(orderLocator).size() > 0;
    }

    public void cancelOrder(String orderId) {
        By cancelBtn = By.cssSelector("[data-testid='cancel-order-" + orderId + "']");
        wait.until(ExpectedConditions.elementToBeClickable(cancelBtn)).click();
    }

    public void returnOrder(String orderId) {
        By returnBtn = By.cssSelector("[data-testid='return-order-" + orderId + "']");
        wait.until(ExpectedConditions.elementToBeClickable(returnBtn)).click();
    }
}
