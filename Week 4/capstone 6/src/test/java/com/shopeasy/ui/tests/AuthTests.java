// UI tests for login and account locking on ShopEasy.
// Covers valid login and account lock after 5 failures (D04).
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
import java.time.Duration;
import java.util.List;

public class AuthTests extends BaseTest {

    @Test
    public void testValidLogin() {
        HomePage homePage = new HomePage(driver);
        homePage.goToLogin();
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login("maya.test@example.com", "Valid#123");
        Assert.assertTrue(homePage.isLogoutVisible(),
                "Logout button should be visible after successful login");
    }

    @Test(description = "D04: Account should lock after 5 failed login attempts")
    public void testAccountLockAfter5FailedAttempts() {
        HomePage homePage = new HomePage(driver);
        homePage.goToLogin();
        LoginPage loginPage = new LoginPage(driver);
        for (int i = 0; i < 5; i++) {
            loginPage.login("lock.test@example.com", "WrongPass" + i);
            driver.get(BASE_URL + "#/login");
            loginPage = new LoginPage(driver);
        }
        loginPage.login("lock.test@example.com", "Valid#123");
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        try {
            wait.until(ExpectedConditions.textToBePresentInElementLocated(By.cssSelector(".err"), "locked"));
        } catch (Exception ignored) {
        }
        List<WebElement> errors = driver.findElements(By.cssSelector(".err"));
        boolean isLocked = errors.stream().anyMatch(e -> e.getText().toLowerCase().contains("locked"));
        try {
            Assert.assertTrue(isLocked, "Account should be locked after 5 failed attempts");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D04 DETECTED] Account is not locked after 5 consecutive failed login attempts. " + e.getMessage(), e);
        }
    }
}
