// UI tests for login page security validation on ShopEasy.
// Covers SQL injection attack prevention.
package com.shopeasy.ui.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.shopeasy.base.BaseTest;
import com.shopeasy.pages.HomePage;
import com.shopeasy.pages.LoginPage;

public class LoginTests extends BaseTest {

    @Test
    public void testLoginWithSqlInjection() {
        HomePage homePage = new HomePage(driver);
        homePage.goToLogin();
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login("' OR 1=1 --", "anything");
        Assert.assertFalse(homePage.isLogoutVisible(),
                "SQL injection should not grant access");
    }
}
