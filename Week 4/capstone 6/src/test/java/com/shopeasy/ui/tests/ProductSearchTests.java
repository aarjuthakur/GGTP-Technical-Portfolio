// UI tests for product search functionality on the ShopEasy home page.
// Covers exact search and case sensitivity defect D02.
package com.shopeasy.ui.tests;

import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;
import com.shopeasy.base.BaseTest;
import com.shopeasy.pages.HomePage;
import java.util.List;

public class ProductSearchTests extends BaseTest {

    @Test
    public void testSearchByExactProductName() {
        HomePage homePage = new HomePage(driver);
        homePage.searchProduct("Running Shoes");
        List<WebElement> results = homePage.getProductCards();
        Assert.assertTrue(results.size() > 0, "Search for 'Running Shoes' should return at least one result");
    }

    @Test(description = "D02: Search should be case-insensitive")
    public void testSearchCaseInsensitiveShoes() {
        HomePage homePage = new HomePage(driver);
        homePage.searchProduct("Shoes");
        List<WebElement> capitalResults = homePage.getProductCards();
        int capitalCount = capitalResults.size();
        driver.get(BASE_URL);
        homePage = new HomePage(driver);
        homePage.getProductCards();
        homePage.searchProduct("shoes");
        List<WebElement> lowerResults = homePage.getProductCards();
        try {
            Assert.assertEquals(capitalCount, lowerResults.size(),
                    "Search 'Shoes' and 'shoes' should return same number of results");
            Assert.assertTrue(lowerResults.size() > 0,
                    "Search for 'shoes' should return results (case-insensitive)");
        } catch (AssertionError e) {
            throw new AssertionError("[DEFECT D02 DETECTED] Search is case-sensitive: 'Shoes' and 'shoes' return different results. " + e.getMessage(), e);
        }
    }
}
