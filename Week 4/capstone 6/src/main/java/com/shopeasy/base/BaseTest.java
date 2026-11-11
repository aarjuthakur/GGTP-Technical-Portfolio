// Base test class for all Selenium UI tests.
// Initializes WebDriver, captures screenshots on failure, and closes after each test.
package com.shopeasy.base;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class BaseTest {

    protected WebDriver driver;
    protected static final String BASE_URL = "http://localhost:8080";
    private String browserName = "chrome";

    @BeforeMethod
    @Parameters({"browser"})
    public void setUp(@Optional("chrome") String browser) {
        this.browserName = browser;
        DriverFactory.initDriver(browser);
        driver = DriverFactory.getDriver();
        driver.get(BASE_URL);
    }

    @AfterMethod
    public void tearDown(ITestResult result) {
        if (result.getStatus() == ITestResult.FAILURE && driver != null) {
            try {
                File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
                Path destDir = Paths.get("target", "screenshots");
                Files.createDirectories(destDir);
                String fileName = result.getTestClass().getRealClass().getSimpleName()
                        + "_" + result.getName() + "_" + browserName + ".png";
                Files.copy(screenshot.toPath(), destDir.resolve(fileName),
                        StandardCopyOption.REPLACE_EXISTING);
            } catch (Exception ignored) {
            }
        }
        DriverFactory.closeDriver();
    }
}
