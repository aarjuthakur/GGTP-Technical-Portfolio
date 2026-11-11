# Playwright E-Commerce QA Capstone

Automated end-to-end testing project for the [Automation Exercise](https://automationexercise.com/) demo e-commerce website. The project demonstrates how to structure, execute, and report browser-based functional tests with Playwright and TypeScript.

## Capstone assignment alignment

The assignment asks for a maintainable TypeScript/Playwright framework, core e-commerce workflows,
reporting and debugging artifacts, cross-browser execution, and examples of modern testing
practices. This project implements the framework and expands the requested 5-8 automated cases to
30 functional cases plus two supporting tests.

| Assignment area | What is present in this project |
|---|---|
| Framework structure | Page objects, typed fixtures, shared utilities, configuration, and separated JSON test data |
| Functional workflows | Registration/login/logout, product discovery, cart, checkout/order placement, and contact/subscription scenarios |
| Execution and diagnostics | Chromium, Firefox, and WebKit projects; HTML/list reporters; failure screenshots, videos, and retry traces |
| Network handling | The fixture blocks common advertising domains. No business-API mock scenarios are included in the recorded suite. |
| Accessibility and visual testing | `axe-core` and `pixelmatch` are listed as development dependencies, but this project does not include active accessibility assertions or visual-baseline comparison tests. |
| AI-assisted testing | The assignment asks candidates to explain responsible AI-assisted test creation; AI is not a runtime feature of this test suite. |

The detailed historical browser results and workbook caveats are recorded below. They should not be
treated as a fresh execution or as proof that every advanced practice in the assignment is
implemented.

## Objective and scope

The objective is to validate key customer journeys and common negative scenarios across the website, including account access, product discovery, cart operations, checkout, and contact/subscription forms. Tests run against the public website, so execution depends on its availability and behavior; this repository does not contain or deploy the application under test.

The suite is organized around six functional modules. Playwright also discovers two supporting tests (account setup and selector validation) which are not included in the 30 functional test-case count below.

## Functional modules and test-case counts

| Module | Cases | Coverage in this suite |
|---|---:|---|
| Authentication | 5 | Registration, valid login, logout, invalid login, and registration with an existing email |
| Products | 7 | Product listing/search/details, category and brand browsing, search after login, and product review |
| Shopping Cart | 7 | Add/remove/empty cart, coupon, continue shopping, quantity, and recommended items |
| Checkout | 5 | Checkout, placing an order, registration during/before checkout, and checkout address |
| Contact & Subscription | 3 | Contact form, newsletter signup, and subscription from the cart |
| UI | 3 | Homepage navigation and scroll-to-top using the arrow or manual scrolling |
| **Functional total** | **30** | |

Test IDs and titles are implemented in the spec files under `tests/`. Some IDs are reused for different scenarios (for example, TC01, TC14, and TC15), so use the filename and test title together to identify a case.

### Supporting tests

| Test file | Purpose |
|---|---|
| `tests/setup_account.spec.ts` | Account setup helper scenario |
| `tests/VALIDATE_SELECTORS.spec.ts` | Checks selectors against the live site |

## Workflow

1. Install Node.js/npm dependencies and the Playwright browser binaries.
2. Review the base URL, credentials, and test data before running tests against the public site.
3. Run the full suite or select a browser, spec file, or test title.
4. Inspect the terminal and HTML report for outcomes; on failure, inspect the saved test artifacts.
5. Update test data or page objects as needed, then rerun the affected test and relevant browser suite.

The configured base URL is `https://automationexercise.com`. Playwright creates the browser page/context for tests; shared page-object fixtures provide reusable actions. Because tests interact with a remote, mutable website, results can vary with site availability, network conditions, account state, and browser behavior.

## Techniques and design

- **End-to-end functional testing:** validates user-visible workflows from navigation through checkout.
- **Negative testing:** checks invalid credentials and duplicate-email registration behavior.
- **Page Object Model (POM):** keeps page selectors and actions in reusable page classes.
- **Fixtures:** provides typed page-object dependencies and routes requests to common advertising domains away from the test context.
- **Data-driven setup:** stores user, product, and checkout data in JSON files; registration scenarios can generate a unique email.
- **Cross-browser testing:** configured projects use Chromium, Firefox, and WebKit (the Safari browser engine).
- **Failure diagnostics:** Playwright is configured to capture screenshots on failure, retain videos on failure, and record a trace on the first retry.
- **Type safety:** TypeScript strict mode is enabled in `tsconfig.json`.

## Technology

- TypeScript
- Playwright Test (`@playwright/test`)
- Node.js and npm
- Chromium, Firefox, and WebKit browser projects
- JSON test data

## Project layout

```text
.
├── config/
│   └── env.config.ts       # Base URL, timeouts, and account/test helpers
├── evidences/              # Captured screenshots and execution evidence
├── fixtures/
│   └── index.ts            # Shared Playwright and page-object fixtures
├── pages/                  # Base page and page-object classes
├── testdata/               # users.json, products.json, checkout.json
├── tests/                  # Functional specs and supporting tests
├── utils/                  # Helpers, screenshot, and accessibility scaffold
├── playwright.config.ts    # Projects, timeouts, retries, reporters, artifacts
├── package.json            # Dependency and npm command definitions
├── TEST_STATUS_REPORT.md   # Recorded execution status and failure analysis
├── Playwright_Capstone_Complete_Report.xlsx
└── Playwright_Capstone_Presentation.pptx
```

The `pages/` directory contains eight page-object classes/files: `BasePage`, `HomePage`, `LoginPage`, `ProductPage`, `CartPage`, `CheckoutPage`, `OrderConfirmationPage`, and `ContactUsPage`. The fixture layer exposes the page objects to tests.

## Prerequisites and setup

- Install a supported Node.js LTS release with npm.
- Ensure the machine can access `automationexercise.com`.
- Have the relevant test account/data ready for scenarios that require an existing account. Review `config/env.config.ts` and the JSON files in `testdata/` before execution; do not use real customer credentials.

Install dependencies and browser binaries:

```bash
npm ci
npx playwright install
```

To install only the Chromium browser binary:

```bash
npx playwright install chromium
```

## Running tests

The default `npm test` command runs the configured Playwright projects (Chromium, Firefox, and WebKit). Test discovery currently reports 32 tests per browser, or 96 browser-specific executions in a full run before retries.

### Available npm commands

| Command | What it does |
|---|---|
| `npm test` | Runs the suite in all configured browser projects |
| `npm run test:all-browsers` | Same full browser matrix |
| `npm run test:chromium` | Runs tests in Chromium |
| `npm run test:firefox` | Runs tests in Firefox |
| `npm run test:webkit` | Runs tests in WebKit |
| `npm run test:headed` | Runs the suite with visible browser windows |
| `npm run test:debug` | Opens Playwright Inspector/debug mode |
| `npm run report` | Opens the most recently generated HTML report |

### Useful targeted commands

```bash
# List discovered tests without executing them
npx playwright test --list

# Run one spec in one browser
npx playwright test tests/TC02_user_login.spec.ts --project chromium

# Run tests whose title contains a phrase
npm test -- --project chromium --grep "TC02"

# Run a spec with a visible browser
npx playwright test tests/TC02_user_login.spec.ts --project chromium --headed

# Debug a particular spec
npx playwright test tests/TC02_user_login.spec.ts --project chromium --debug

# Limit parallel workers or override retries for a troubleshooting run
npm test -- --project chromium --workers=1 --retries=0

# Use a concise terminal reporter for a run
npm test -- --reporter=list
```

If an existing account or test data is required, check the corresponding setup and JSON configuration before selecting an individual spec. A full-suite run is not guaranteed to execute setup before dependent tests because parallel execution is enabled.

## Reports and deliverables

- **Automation framework:** Playwright/TypeScript test suite, page objects, fixtures, and test data.
- **Test documentation and coverage:** `Playwright_Capstone_Complete_Report.xlsx` contains test-case records, a defect log, a traceability matrix, and summary/coverage sheets. Its summary metrics are historical and internally inconsistent; see the results note below.
- **Execution summary:** `TEST_STATUS_REPORT.md` records a browser-level run snapshot and known issues.
- **Presentation:** `Playwright_Capstone_Presentation.pptx` summarizes the capstone scope and approach.
- **Evidence:** `evidences/` contains captured screenshots.
- **Generated Playwright output:** the HTML report is written to `playwright-report/`; test-specific output such as screenshots, videos, and traces is stored under `test-results/`. These are generated/updated by test execution.

## Recorded results and interpretation

The checked-in `TEST_STATUS_REPORT.md` records a run dated **October 16, 2026**:

| Browser | Passed | Failed | Total | Recorded pass rate |
|---|---:|---:|---:|---:|
| Chromium | 28 | 4 | 32 | 87.5% |
| Firefox | 23 | 9 | 32 | 71.9% |
| WebKit | 13 | 19 | 32 | 40.6% |
| **Total** | **64** | **32** | **96** | **66.7%** |

These are historical results, not a claim about the current state of the live site or a fresh execution. The Excel workbook contains different, inconsistent totals (including 20-case and 31-case summaries), and its traceability matrix lists four requirements while the presentation states three. Treat those report figures as historical and confirm the requirements baseline before using them for sign-off. The current checked-in test files define 30 functional cases plus the two supporting tests described above. Run the suite to produce up-to-date results; investigate failures against the generated report and artifacts rather than assuming every failure is an application defect.

## Configuration notes

The Playwright configuration sets a 60-second test timeout, 30-second navigation timeout, 10-second action timeout, one local retry, and two retries with one worker when `CI` is set. The HTML and list reporters are enabled. Tests target the live website, and no local application server is started by this project.
