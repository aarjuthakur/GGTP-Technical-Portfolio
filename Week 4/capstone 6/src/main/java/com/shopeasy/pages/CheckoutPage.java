// Page object for the ShopEasy checkout page.
// Handles address form, coupon input, payment, and order confirmation.
package com.shopeasy.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class CheckoutPage {

    private WebDriver driver;
    private WebDriverWait wait;

    private By checkoutName = By.cssSelector("[data-testid='checkout-name']");
    private By checkoutPhone = By.cssSelector("[data-testid='checkout-phone']");
    private By checkoutAddress = By.cssSelector("[data-testid='checkout-address']");
    private By checkoutPincode = By.cssSelector("[data-testid='checkout-pincode']");
    private By couponInput = By.cssSelector("[data-testid='coupon-input']");
    private By applyCouponBtn = By.cssSelector("[data-testid='coupon-apply-btn']");
    private By payBtn = By.cssSelector("[data-testid='pay-btn']");
    private By orderTotal = By.cssSelector("[data-testid='order-total']");
    private By orderId = By.cssSelector("[data-testid='order-id']");

    public CheckoutPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    public void fillAddress(String name, String phone, String address, String pincode) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(checkoutName)).sendKeys(name);
        driver.findElement(checkoutPhone).sendKeys(phone);
        driver.findElement(checkoutAddress).sendKeys(address);
        driver.findElement(checkoutPincode).sendKeys(pincode);
    }

    public void applyCoupon(String code) {
        WebElement input = wait.until(ExpectedConditions.visibilityOfElementLocated(couponInput));
        input.clear();
        input.sendKeys(code);
        WebElement totalElement = driver.findElement(orderTotal);
        driver.findElement(applyCouponBtn).click();
        try {
            wait.until(ExpectedConditions.stalenessOf(totalElement));
        } catch (Exception ignored) {
        }
        wait.until(ExpectedConditions.visibilityOfElementLocated(orderTotal));
    }

    public void selectCodPayment() {
        driver.findElement(By.cssSelector("[data-testid='pay-cod']")).click();
    }

    public void fillCardDetails(String number, String expiry, String cvv) {
        driver.findElement(By.cssSelector("[data-testid='card-number']")).sendKeys(number);
        driver.findElement(By.cssSelector("[data-testid='card-expiry']")).sendKeys(expiry);
        driver.findElement(By.cssSelector("[data-testid='card-cvv']")).sendKeys(cvv);
    }

    public void clickPlaceOrder() {
        wait.until(ExpectedConditions.elementToBeClickable(payBtn)).click();
    }

    public String getOrderTotal() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(orderTotal)).getText();
    }

    public String getOrderId() {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(orderId)).getText();
    }
}
