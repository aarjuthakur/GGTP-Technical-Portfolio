# ShopEasy E-Commerce - Automated Testing (Capstone 6)

## Project Objective

Test the ShopEasy e-commerce web application automatically using two approaches:
- **Selenium WebDriver** - Opens a real browser and interacts with the website (clicking buttons, filling forms, checking what appears on screen)
- **REST Assured** - Sends HTTP requests directly to the backend API (no browser needed) to test data operations

The application has **14 seeded defects** (D01-D14) intentionally placed by the development team. The goal is to write automated tests that find all 14 defects and generate evidence (screenshots + reports).

---

## Modules Tested

### Selenium UI Tests (20 tests across 11 classes)

| Module | Test Class | What It Tests | Defects Found |
|--------|-----------|---------------|---------------|
| Login | AuthTests | Valid login, Account lock after 5 failed attempts | D04 |
| Registration | RegisterTests | New user registration, 16-char password boundary | D12 |
| Product Search | ProductSearchTests | Exact search, Case-insensitive search | D02 |
| Shopping Cart | CartTests | Cart badge count after adding item, Quantity above 10 | D01, D07 |
| Checkout | CheckoutTests | Coupon stacking on reapply, Free shipping at Rs 2,000 | D06, D10 |
| Payment | PaymentTests | Gateway charge mismatch, UPI above Rs 5,000 limit | D03, D05 |
| Shipping | ShippingTests | Valid 6-digit pincode checkout flow | - |
| Orders | OrderTests | Cancel a shipped order (should be blocked) | D08 |
| Edge Cases | EdgeCaseTests | XSS script injection in search, 5-digit pincode | D11 |
| Login Security | LoginTests | SQL injection prevention | - |
| Responsive | ResponsiveTests | Mobile viewport, Pay button overlap, Terms hover | D09, D13 |

### REST Assured API Tests (18 tests across 5 classes)

| Module | Test Class | Endpoints Tested | Defects Found |
|--------|-----------|-----------------|---------------|
| Auth API | AuthenticationAPITests | POST /api/auth/login, POST /api/auth/register, GET /api/auth/me | - |
| Product API | ProductAPITests | GET /api/products, GET /api/products?q=, GET /api/products/{id} | - |
| Cart API | CartAPITests | POST /api/cart, GET /api/cart, PUT /api/cart/{id}, DELETE /api/cart/{id} | - |
| Checkout API | CheckoutAPITests | POST /api/checkout/coupon, POST /api/checkout (card), POST /api/checkout (COD) | - |
| Order API | OrderAPITests | GET /api/orders, POST cancel, POST return, POST admin/advance, Order isolation | D14 |

---

## How Selenium UI Testing Works

```
Browser (Chrome/Firefox)
    |
    v
Selenium WebDriver  --->  WebDriverManager (downloads correct driver)
    |
    v
Page Object Classes (HomePage, LoginPage, CartPage, etc.)
    |
    v
Test Classes (CartTests, AuthTests, etc.)
    |
    v
TestNG runs tests, @BeforeMethod opens browser, @AfterMethod closes it
    |
    v
On failure: TakesScreenshot captures PNG --> target/screenshots/
    |
    v
ExtentReportListener generates HTML report --> target/ShopEasy-Test-Report.html
```

**Step-by-step flow:**

1. TestNG reads `testng.xml` and picks up the browser parameter (chrome or firefox)
2. `@BeforeMethod` in `BaseTest.java` calls `DriverFactory.initDriver("chrome")` which uses WebDriverManager to download the matching driver and creates a browser instance
3. The driver is stored in a `ThreadLocal<WebDriver>` so each test thread gets its own browser
4. The test method runs -- it uses Page Object classes like `homePage.searchProduct("Shoes")` which internally calls `driver.findElement(By.id("search")).sendKeys("Shoes")`
5. Explicit waits (`WebDriverWait`) pause until elements are clickable/visible -- no fixed sleeps
6. Assertions check the result -- if the app behaves incorrectly, the test fails
7. `@AfterMethod` runs: if the test failed, it takes a screenshot; then it closes the browser

## How REST Assured API Testing Works

```
Test Classes (CartAPITests, OrderAPITests, etc.)
    |
    v
API Client Classes (CartAPI, OrderAPI, etc.)
    |
    v
REST Assured sends HTTP request (GET/POST/PUT/DELETE)
    |                                          
    v                                          
ShopEasy Backend (http://localhost:8080/api/*)
    |
    v
JSON response comes back
    |
    v
Hamcrest matchers validate the response (status code, body values)
```

**Step-by-step flow:**

1. Test method calls an API client method like `CartAPI.addToCart(session, productId, 1)`
2. The client builds an HTTP request using REST Assured: `given().filter(session).body(payload).post("/api/cart")`
3. `SessionFilter` automatically manages cookies -- after login, the session cookie is sent with every request (no manual cookie handling)
4. The response comes back as JSON, e.g. `{"id": "abc", "quantity": 1, "product": {...}}`
5. REST Assured + Hamcrest validate it: `response.then().statusCode(200).body("quantity", equalTo(1))`
6. No browser is involved -- API tests are faster and test the backend logic directly

## UI + API Testing Together

The UI tests and API tests cover the same application from different angles:

| Aspect | UI Tests (Selenium) | API Tests (REST Assured) |
|--------|-------------------|------------------------|
| What it tests | What the user sees and clicks | What the server processes and returns |
| Speed | Slower (opens real browser) | Faster (direct HTTP calls) |
| Browser needed | Yes (Chrome/Firefox) | No |
| Finds UI bugs | Yes (layout, rendering, JS errors) | No |
| Finds data bugs | Indirectly (through what's displayed) | Directly (checks raw JSON) |
| Example | "Click Add to Cart, check badge shows 1" | "POST /api/cart, check response has quantity 1" |

Both run together via `testng.xml` -- UI tests first (Chrome block, then Firefox block), then API tests. This gives full coverage: if a bug exists only in the UI layer, Selenium catches it; if it's in the backend, REST Assured catches it.

---

## Implementation Details

### How It Works (Step by Step)

1. **Start the server** - Run `java -jar shopeasy-1.0.0.jar` to start the ShopEasy app at http://localhost:8080
2. **Run tests** - Execute `mvn test` which reads `testng.xml` to know which tests to run and on which browsers
3. **Browser opens** - For UI tests, Selenium opens Chrome/Firefox, navigates to pages, clicks buttons, fills forms
4. **API calls happen** - For API tests, REST Assured sends HTTP requests (GET, POST, PUT, DELETE) to the backend
5. **Assertions check** - Each test checks if the app behaves correctly (e.g., "cart should reject quantity above 10")
6. **Defects caught** - When the app does something wrong, the test fails with a clear message like `[DEFECT D01 DETECTED]`
7. **Evidence saved** - Screenshots are captured for failed UI tests, and an HTML report is generated

### Project Structure

```
src/
  main/java/com/shopeasy/
    base/
      BaseTest.java              - Parent of all UI tests; opens browser, takes screenshot on failure, closes browser
      DriverFactory.java         - Creates Chrome/Firefox instances using WebDriverManager
    pages/                       - Page Object Model classes (one per web page)
      HomePage.java              - Search bar, product cards, cart badge
      LoginPage.java             - Email field, password field, login button
      RegisterPage.java          - Name, email, password fields, register button
      CartPage.java              - Cart items, quantity input, add to cart button
      CheckoutPage.java          - Address form, coupon input, payment selection, order total
      OrdersPage.java            - Order list, cancel button, return button
    api/client/                  - REST Assured API client classes (one per API module)
      AuthAPI.java               - Login, register, logout, getMe endpoints
      ProductAPI.java            - Get all products, search, get by ID
      CartAPI.java               - Add, view, update, remove cart items
      CheckoutAPI.java           - Apply coupon, place order
      OrderAPI.java              - Get orders, cancel, return, admin advance
    report/
      ExtentReportListener.java  - TestNG listener that generates HTML test report
  test/java/com/shopeasy/
    ui/tests/                    - 11 Selenium test classes (20 test methods)
    api/tests/                   - 5 REST Assured test classes (18 test methods)

testng.xml                       - Suite config: runs UI tests on Chrome + Firefox, API tests once
pom.xml                          - Maven build file with all dependencies
```

### Tools and Technologies

| Tool | Version | What It Does |
|------|---------|-------------|
| Selenium WebDriver | 4.18.1 | Controls the browser programmatically (click, type, read text) |
| REST Assured | 5.4.0 | Sends HTTP requests to APIs and validates JSON responses |
| TestNG | 7.9.0 | Runs tests, manages test order, provides annotations like @Test |
| Hamcrest | 2.2 | Provides readable matchers for API assertions (equalTo, greaterThan) |
| WebDriverManager | 5.7.0 | Automatically downloads the correct browser driver (no manual setup) |
| ExtentReports | 5.1.1 | Generates a visual HTML test report |
| Maven | 3.9.16 | Manages dependencies (pom.xml) and runs the build |
| Java | 17 | Programming language |

### Key Concepts Used

**Page Object Model (POM):** Each web page has its own Java class. Instead of writing `driver.findElement(By.id("email")).sendKeys("test")` in every test, we write `loginPage.login("email", "password")`. This keeps tests clean and if the page changes, we only fix one file.

**Explicit Waits (WebDriverWait):** Tests wait up to 20 seconds for elements to appear, rather than using `Thread.sleep()`. For example, `wait.until(ExpectedConditions.elementToBeClickable(loginBtn))` waits only as long as needed.

**SessionFilter (REST Assured):** Automatically captures and reuses cookies across API calls. When a test logs in, the session cookie is saved and sent with every request after that.

**Hamcrest Matchers:** API response validation uses readable matchers:
- `equalTo("Laptop")` - checks exact value
- `greaterThan(0)` - checks value is positive
- `notNullValue()` - checks value exists
- `containsStringIgnoringCase("phone")` - checks partial text match

**Cross-Browser Testing:** `testng.xml` defines two test blocks (Chrome and Firefox). Each block passes a `browser` parameter to `BaseTest` via the `@Parameters` annotation. The same 20 UI tests run on both browsers = 40 UI test executions.

**Screenshot on Failure:** When a test fails, `BaseTest.tearDown()` captures a screenshot using Selenium's `TakesScreenshot` interface and saves it to `target/screenshots/`.

**TestNG Annotations:**
- `@BeforeMethod` - runs before each test (opens browser)
- `@AfterMethod` - runs after each test (closes browser, captures screenshot if failed)
- `@Test` - marks a method as a test
- `@Parameters` - reads values from testng.xml (like browser name)

### How to Run

1. Start the ShopEasy server:
   ```
   java -jar shopeasy-1.0.0.jar
   ```

2. Run all tests (Chrome + Firefox + API):
   ```
   mvn test
   ```

3. Run a single test class:
   ```
   mvn test -Dtest=CartTests
   ```

4. Run from Eclipse: Right-click `testng.xml` > Run As > TestNG Suite

---

## Defect Report

### How Defects Were Found

Each defect was found by writing a test that checks the expected behavior. When the app behaves differently from what is expected, the test fails with a message like `[DEFECT D01 DETECTED] Cart accepts quantity above 10`.

**Testing techniques used:**
- **Boundary Value Analysis (BVA)** - Testing at exact limits (quantity 10 vs 11, pincode 5 vs 6 digits, password 16 chars)
- **Equivalence Partitioning (EP)** - Testing one value from each valid/invalid group
- **State-Based Testing** - Testing state changes (order status transitions, account locking)
- **Decision Table Testing** - Testing combinations (coupon + reapply, payment + shipping)
- **Security Testing** - SQL injection, XSS, order isolation between users
- **Responsive Testing** - Testing at mobile viewport (375px width)

### All 14 Defects

| ID | Title | Severity | Test That Finds It | Technique |
|----|-------|----------|-------------------|-----------|
| D01 | Cart accepts quantity above 10 | Major | CartTests.testQuantityAboveMaximumRejected | BVA |
| D02 | Search is case-sensitive (should not be) | Major | ProductSearchTests.testSearchCaseInsensitiveShoes | EP |
| D03 | Gateway charges shipping twice | Critical | PaymentTests.testGatewayChargeMatchesOrderTotal | Decision Table |
| D04 | Account not locked after 5 failed logins | Critical | AuthTests.testAccountLockAfter5FailedAttempts | State-Based |
| D05 | UPI payment above Rs 5,000 errors out | Critical | PaymentTests.testUpiPaymentAbove5000 | EP |
| D06 | Free shipping off-by-one at Rs 2,000 | Major | CheckoutTests.testFreeShippingAtExactly2000 | BVA |
| D07 | Cart badge intermittently shows 0 | Minor | CartTests.testCartBadgeVisibleAfterAdd | State-Based |
| D08 | Shipped orders can be cancelled | Major | OrderTests.testCancelShippedOrderShouldFail | State-Based |
| D09 | Pay button overlaps address on mobile | Minor | ResponsiveTests.testPayButtonNoOverlapAt375px | Responsive |
| D10 | Coupon SAVE10 stacks on reapply | Major | CheckoutTests.testCouponDoesNotStackOnReapply | Decision Table |
| D11 | 5-digit pincode accepted (needs 6) | Minor | EdgeCaseTests.testPincode5DigitsRejected | BVA |
| D12 | 16-character password rejected | Minor | RegisterTests.testRegisterWith16CharPassword | BVA |
| D13 | Terms link no underline on hover | Trivial | ResponsiveTests.testTermsLinkUnderlineOnHover | Responsive |
| D14 | Orders API shows all users' orders | Major | OrderAPITests.testOrdersBelongToLoggedInUser | Security |

### Defect Severity Summary

| Severity | Count | Defect IDs |
|----------|-------|------------|
| Critical | 3 | D03, D04, D05 |
| Major | 6 | D01, D02, D06, D08, D10, D14 |
| Minor | 4 | D07, D09, D11, D12 |
| Trivial | 1 | D13 |
| **Total** | **14** | |

---

## Test Execution Summary

| Metric | Value |
|--------|-------|
| Total Test Methods | 38 (20 UI + 18 API) |
| Executions Per Run | 58 (20 Chrome + 20 Firefox + 18 API) |
| Passed | 24 |
| Failed | 14 (all are defect detections) |
| Browsers Tested | Chrome, Firefox |
| Test Classes | 16 (11 UI + 5 API) |
| Defects Found | 14 out of 14 |
| Screenshots on Failure | target/screenshots/ |
| HTML Report | target/ShopEasy-Test-Report.html |

### Test Data

- Login: `maya.test@example.com` / `Valid#123`
- Lock test account: `lock.test@example.com` / `Valid#123`
- Valid card: `4111 1111 1111 1111`
- Declined card: `4000 0000 0000 0002`
- Valid UPI: `name@bank`
- Valid coupon: `SAVE10` (10% off)
- Expired coupon: `OLD20`
- Admin PIN: `qa-lead` (X-Admin-Pin header)
