// Creates and manages WebDriver instances per thread.
// Supports Chrome, Firefox, and Edge in headed mode via WebDriverManager.
package com.shopeasy.base;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class DriverFactory {

    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    public static WebDriver getDriver() {
        return driver.get();
    }

    public static void setDriver(WebDriver wd) {
        driver.set(wd);
    }

    public static void initDriver(String browser) {
        if (browser.equalsIgnoreCase("chrome")) {
            WebDriverManager.chromedriver().setup();
            WebDriver driverObj = new ChromeDriver();
            setDriver(driverObj);
        } else if (browser.equalsIgnoreCase("firefox")) {
            WebDriverManager.firefoxdriver().setup();
            WebDriver driverObj = new FirefoxDriver();
            setDriver(driverObj);
        } else if (browser.equalsIgnoreCase("edge")) {
            WebDriverManager.edgedriver().setup();
            WebDriver driverObj = new EdgeDriver();
            setDriver(driverObj);
        } else {
            throw new IllegalArgumentException("Unsupported browser: " + browser);
        }
        getDriver().manage().window().maximize();
    }

    public static void closeDriver() {
        if (getDriver() != null) {
            getDriver().quit();
            driver.remove();
        }
    }
}