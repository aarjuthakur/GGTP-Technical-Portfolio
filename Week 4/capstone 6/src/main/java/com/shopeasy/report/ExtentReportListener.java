// TestNG listener that generates an ExtentReports HTML test report.
// Categorizes tests as "Defect Detection" or "Functional" based on annotations.
package com.shopeasy.report;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import org.testng.annotations.Test;

import java.lang.reflect.Method;

public class ExtentReportListener implements ITestListener {

    private static ExtentReports extent;
    private static final ThreadLocal<ExtentTest> test = new ThreadLocal<>();

    @Override
    public void onStart(ITestContext context) {
        if (extent == null) {
            ExtentSparkReporter spark = new ExtentSparkReporter("target/ShopEasy-Test-Report.html");
            spark.config().setDocumentTitle("ShopEasy Test Report");
            spark.config().setReportName("ShopEasy QA Capstone - Test Results");
            spark.config().setTheme(Theme.STANDARD);
            extent = new ExtentReports();
            extent.attachReporter(spark);
            extent.setSystemInfo("Application", "ShopEasy");
            extent.setSystemInfo("Environment", "localhost:8080");
            extent.setSystemInfo("Test Framework", "Selenium + REST Assured + TestNG");
        }
    }

    @Override
    public void onTestStart(ITestResult result) {
        String className = result.getTestClass().getRealClass().getSimpleName();
        String methodName = result.getMethod().getMethodName();
        String description = getDescription(result);

        ExtentTest extentTest = extent.createTest(className + "." + methodName, description);

        if (isDefectTest(description)) {
            String defectId = description.substring(0, description.indexOf(":")).trim();
            extentTest.assignCategory("Defect Detection");
            extentTest.assignCategory(defectId);
        } else {
            extentTest.assignCategory("Functional");
        }

        test.set(extentTest);
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        test.get().log(Status.PASS, "Test passed");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        String description = getDescription(result);
        if (isDefectTest(description)) {
            String defectId = description.substring(0, description.indexOf(":")).trim();
            test.get().log(Status.WARNING, "SEEDED DEFECT " + defectId + " DETECTED");
            test.get().log(Status.FAIL, result.getThrowable().getMessage());
        } else {
            test.get().log(Status.FAIL, "Test failed: " + result.getThrowable().getMessage());
        }
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        test.get().log(Status.SKIP, "Test skipped");
    }

    @Override
    public void onFinish(ITestContext context) {
        if (extent != null) {
            extent.flush();
        }
    }

    private String getDescription(ITestResult result) {
        Method method = result.getMethod().getConstructorOrMethod().getMethod();
        Test annotation = method.getAnnotation(Test.class);
        if (annotation != null && !annotation.description().isEmpty()) {
            return annotation.description();
        }
        return "";
    }

    private boolean isDefectTest(String description) {
        return description.matches("^D\\d+:.*");
    }
}
