// Page object for the ShopEasy registration page.
// Handles name/email/password entry and register button click.
package com.shopeasy.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class RegisterPage {

    private WebDriver driver;
    private WebDriverWait wait;

    private By registerName = By.cssSelector("[data-testid='register-name']");
    private By registerEmail = By.cssSelector("[data-testid='register-email']");
    private By registerPassword = By.cssSelector("[data-testid='register-password']");
    private By registerBtn = By.cssSelector("[data-testid='register-btn']");

    public RegisterPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    public void enterName(String name) {
        WebElement field = wait.until(ExpectedConditions.visibilityOfElementLocated(registerName));
        field.clear();
        field.sendKeys(name);
    }

    public void enterEmail(String email) {
        WebElement field = wait.until(ExpectedConditions.visibilityOfElementLocated(registerEmail));
        field.clear();
        field.sendKeys(email);
    }

    public void enterPassword(String password) {
        WebElement field = wait.until(ExpectedConditions.visibilityOfElementLocated(registerPassword));
        field.clear();
        field.sendKeys(password);
    }

    public void clickRegister() {
        wait.until(ExpectedConditions.elementToBeClickable(registerBtn)).click();
    }

    public void register(String name, String email, String password) {
        enterName(name);
        enterEmail(email);
        enterPassword(password);
        clickRegister();
    }

    public boolean isRegisterPageDisplayed() {
        return driver.findElements(registerPassword).size() > 0;
    }
}
