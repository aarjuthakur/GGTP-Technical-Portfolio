// UI tests for user registration functionality on ShopEasy.
// Covers new user registration and 16-char password boundary (D12).
package com.shopeasy.ui.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.shopeasy.base.BaseTest;
import com.shopeasy.pages.HomePage;
import com.shopeasy.pages.RegisterPage;

public class RegisterTests extends BaseTest {

    @Test
    public void testRegisterNewUser() {
        HomePage homePage = new HomePage(driver);
        homePage.goToLogin();
        driver.get(BASE_URL + "#/register");
        RegisterPage registerPage = new RegisterPage(driver);
        String uniqueEmail = "testuser" + System.currentTimeMillis() + "@example.com";
        registerPage.register("Test User", uniqueEmail, "Strong#Pass1");
        Assert.assertTrue(homePage.isLogoutVisible(),
                "Should be logged in after successful registration");
    }

    @Test(description = "D12: 16-char password at upper boundary should be accepted")
    public void testRegisterWith16CharPassword() {
        driver.get(BASE_URL + "#/register");
        RegisterPage registerPage = new RegisterPage(driver);
        String email = "bva16pw" + System.currentTimeMillis() + "@example.com";
        registerPage.register("BVA User", email, "Abcdefgh12345678");
        HomePage homePage = new HomePage(driver);
        try {
            Assert.assertTrue(homePage.isLogoutVisible(),
                    "16-character password should be accepted (BVA upper boundary)");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D12 DETECTED] 16-character password rejected at upper boundary. " + e.getMessage(), e);
        }
    }
}
