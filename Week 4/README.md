# Arju Thakur - Week 4: Capstone Projects and Integration

Week 4 brings together everything learned in the program through three capstone projects spanning UI automation, API testing, and a standalone tooling project.

## Projects

### Capstone 5 - Microsoft Forms Test Automation

**Path:** [`capstone 5/`](./capstone%205/)

A Playwright + TypeScript test automation framework for a published Microsoft Forms Customer Satisfaction Survey with 15 input types, 6 pages, and 3 conditional branches.

- **Architecture:** Dual-target testing (local HTML replica + live published form)
- **Test Coverage:** 44 test cases across 12 modules (smoke, functional, conditional logic, validation, E2E, cross-browser, responsive, data-driven, multilingual, regression, integration)
- **Results:** 44/44 passing on replica, 35/41 on live form. 15 defects found (6 platform, 9 functional). PASS gate decision.
- **Tech:** Playwright 1.64.0, TypeScript, http-server, 10 browser projects configured

---

### Capstone 6 - ShopEasy Selenium + REST Assured

**Path:** [`capstone 6/`](./capstone%206/)

Java-based automated testing of the ShopEasy e-commerce application using Selenium WebDriver for UI testing and REST Assured for API testing, orchestrated with Maven and TestNG.

- **UI Tests:** 20 test methods across 11 test classes (auth, registration, product search, cart, checkout, payment, shipping, orders, edge cases, responsive)
- **API Tests:** 18 test methods across 5 test classes (authentication, products, cart, checkout, orders)
- **Results:** 38 test methods, 58 executions per run (Chrome + Firefox + API), all 14/14 seeded defects found
- **Tech:** Java 17, Selenium 4.18.1, REST Assured 5.4.0, TestNG 7.9.0, WebDriverManager, ExtentReports

---

### CP 4 - Enterprise E-Commerce Automation

**Path:** [`cp 4/`](./cp%204/)

Production-ready Playwright TypeScript automation framework for automationexercise.com with advanced testing capabilities beyond standard functional tests.

- **Test Cases:** TC01-TC07 (Registration, Login, Logout, Product Search, Cart, Checkout, Contact Form) plus accessibility, network mocking, and visual regression tests
- **Advanced Features:** axe-core accessibility audits, pixelmatch visual regression, network interception/mocking, data-driven testing, comprehensive Excel reporting
- **Architecture:** Page Object Model, custom fixtures, cross-browser (Chromium/Firefox/WebKit)
- **Tech:** Playwright 1.64.0, TypeScript 7.0.2, axe-core, pixelmatch

---

## Skills Learned in Week 4

| Category | Skills |
|----------|--------|
| Languages | Java 17, TypeScript, SQL |
| UI Automation | Selenium WebDriver, Playwright, Page Object Model, cross-browser testing |
| API Automation | REST Assured, API endpoint validation, auth token management |
| Build Tools | Maven, npm, TestNG XML suites |
| Reporting | ExtentReports, Playwright HTML reports, Excel deliverables |
| Advanced Testing | Accessibility (axe-core), visual regression (pixelmatch), network mocking, dual-target architecture |
| Integration | MCP SDK, CSV-driven form generation, conditional branch testing |
