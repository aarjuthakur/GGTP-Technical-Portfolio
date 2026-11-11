# Capstone 5 - Microsoft Forms Test Automation

## Project Objective

Build a complete test automation framework using **Playwright + TypeScript** to test a published **Microsoft Forms Customer Satisfaction Survey**. The survey has **15 input types**, **6 pages**, and **3 conditional branches**. The goal is to verify that every input, every branch, and every validation rule works correctly across multiple browsers and devices.

---

## The Problem

Microsoft Forms is a closed platform — we cannot control its internal code, the DOM is auto-generated, and it has platform-level restrictions. Some features behave differently than expected. We need a way to test everything thoroughly despite these limitations.

---

## The Solution

A **dual-target testing architecture** that tests the survey in two environments:

| Target | What | Why |
|--------|------|-----|
| **Local Replica** | HTML/CSS/JS copy of the survey on localhost:4173 | Full control over DOM, validation, branching. Fast, reliable, no network dependency |
| **Live Published Form** | The actual Microsoft Forms URL | Tests real-world behavior, documents platform defects |

A single environment variable switches between them:
- `FORM_MODE=local` (default) runs tests on the replica
- `FORM_MODE=remote` runs tests on the published form

---

## Step-by-Step Implementation

### Step 1 — Analyzed the Form

Studied the published Microsoft Forms survey and identified:
- **15 input types:** Text, Email, Number, Multiple Choice, Checkboxes, Star Rating, NPS (0-10), Dropdown, Date Picker, Ranking, File Upload, Likert Scale, Radio Buttons, Textarea, Time Picker
- **6 pages:** Demographics, Product Usage, Satisfaction Branch, Detailed Feedback, Preferences, Thank You
- **3 conditional branches:** Rating (high/low), NPS (promoter/passive/detractor), Follow-up (yes/no)
- **Validation rules:** Required fields, email format, character limits, NPS range

### Step 2 — Built the Local Replica

Created a working HTML copy of the survey in the `app/` folder:

| File | What It Does |
|------|-------------|
| `app/index.html` | All 6 pages of the survey in one file, shown/hidden with JavaScript |
| `app/styles.css` | Styling to match the real form |
| `app/survey.js` | Page navigation, conditional branching, input validation, form submission |

Playwright automatically starts a local server and serves this when tests run.

### Step 3 — Created Configuration

| File | What It Does |
|------|-------------|
| `config/env.ts` | Reads `FORM_MODE` and sets the base URL (localhost or published form) |
| `config/liveForm.ts` | Maps question labels to their selectors on the live Microsoft Form |

### Step 4 — Built the Page Object Model (POM)

Instead of writing raw selectors in every test, created reusable **page classes** in `pages/`:

```
SurveyPage (coordinator)
├── PageDemographics        — Page 1: name, email, company, employees
├── PageProductUsage        — Page 2: source, features, rating, NPS
├── PageSatisfactionBranch  — Page 3: positive or improvement branch
├── PageDetailedFeedback    — Page 4: promoter, passive, or detractor
├── PagePreferences         — Page 5: follow-up, contact, ranking, Likert
├── PageThankYou            — Page 6: summary, submit, confirmation
└── MicrosoftFormsPage      — Separate POM for the live published form
```

Tests call clean methods like `survey.completeDemographics(data)` instead of `page.getByTestId('input-name').fill('John')`. If a selector changes, we update one file instead of 20 tests.

### Step 5 — Set Up Test Data and Fixtures

| File | What It Contains |
|------|-----------------|
| `fixtures/surveyData.ts` | Valid users, boundary values, invalid inputs for replica tests |
| `fixtures/liveSurveyData.ts` | Data formatted for the live Microsoft Form |
| `fixtures/personas.json` | 14 different user profiles for data-driven testing |
| `fixtures/capstoneFixtures.ts` | Custom Playwright fixtures that auto-inject `survey`, `forms`, and `steps` into every test |

### Step 6 — Created Utility Helpers

| File | What It Does |
|------|-------------|
| `utils/logger.ts` | Prints formatted workflow summaries after each test |
| `utils/helpers.ts` | Reusable functions: `slug()`, `expectVisible()`, `readRankingOrder()` |
| `utils/constants.ts` | Shared values: survey title, viewport sizes, file upload rules |

### Step 7 — Wrote 44 Test Cases Across 12 Modules

| Module | Test Cases | What It Tests |
|--------|-----------|---------------|
| **Smoke** | TC-001, TC-002 | Form loads, all pages accessible |
| **Functional** | TC-003 to TC-009, TC-043 | Each of the 15 input types works correctly |
| **Conditional** | TC-010 to TC-020 | All 3 branching paths work (rating, NPS, follow-up) |
| **Validation** | TC-021 to TC-023, TC-044 | Required fields, email format, NPS range, character limits |
| **End-to-End** | TC-024, TC-025 | Full happy path from start to submit, response data verification |
| **Cross-Browser** | TC-026, TC-027, TC-028 | Chrome layout, Firefox drag-and-drop, WebKit star rating |
| **Responsive** | TC-029, TC-030 | Mobile (iPhone 13) and Tablet (iPad) layouts |
| **Data-Driven** | TC-034 | 14 personas with different paths through the survey |
| **Multi-Lingual** | TC-035 | German (de-DE), Japanese (ja-JP), Arabic (ar-SA) input |
| **Regression** | TC-036, TC-037 | Re-run critical paths to catch regressions |
| **Integration** | TC-038 | Data persistence across pages |
| **Live Form** | TC-001 to TC-039 | Same tests running against the published Microsoft Form |

### Step 8 — Configured Cross-Browser and Parallel Execution

Set up 10 browser projects in `playwright.config.ts`:

| Project | What It Runs |
|---------|-------------|
| chromium, firefox, webkit, edge | All replica tests on 4 browsers |
| live | Live form tests on Chrome |
| cross-chrome, cross-firefox, cross-webkit | Browser-specific edge case tests |
| mobile | TC-029 on iPhone 13 viewport |
| tablet | TC-030 on iPad viewport |

Tests run in parallel with **4 workers** for speed.

### Step 9 — Documented Platform Defects

Found **15 defects** during testing. Used `test.fail()` to document expected failures on the live form without breaking the test suite:
- **6 platform constraints** (Microsoft Forms limitations like character limit enforcement)
- **9 functional defects** (branching issues, missing validation)
- **4 fixed** on the replica, **11 open** on the published form

### Step 10 — Added Data Capture

TC-024 captures all submitted form data from the DOM after submission and saves it as a timestamped JSON file to `test-results/submissions/`. Each run creates a new file for tracking submission history.

---

## How to Run

```bash
# Install
npm install
npx playwright install

# Run all tests (all browsers)
npx playwright test

# Run on one browser
npx playwright test --project=chromium

# Run with visible browser
npx playwright test --headed

# Run on live form
npx playwright test --project=live

# Run a single test
npx playwright test tests/e2e/TC-024 --project=chromium --headed

# View HTML report
npx playwright show-report
```

---

## Project Structure

```
capstone 5/
├── app/                   # Local HTML replica of the survey
│   ├── index.html         # 6-page survey form
│   ├── styles.css         # Form styling
│   └── survey.js          # Navigation, validation, branching
├── config/                # Environment config and live form selectors
├── pages/                 # Page Object Model (7 page classes + 1 for live form)
├── fixtures/              # Test data, personas, custom Playwright fixtures
├── utils/                 # Logger, helpers, shared constants
├── tests/                 # 44 test cases across 12 modules
│   ├── smoke/             # TC-001, TC-002
│   ├── functional/        # TC-003 to TC-009, TC-043
│   ├── conditional/       # TC-010 to TC-020
│   ├── validation/        # TC-021 to TC-023, TC-044
│   ├── e2e/               # TC-024, TC-025
│   ├── cross-browser/     # TC-026, TC-027, TC-028
│   ├── responsive/        # TC-029, TC-030
│   ├── datadriven/        # TC-034
│   ├── multilingual/      # TC-035
│   ├── regression/        # TC-036, TC-037
│   ├── integration/       # TC-038
│   └── live/              # Same tests on published form
├── docs/                  # Excel report, PowerPoint, defect log
├── tools/                 # Build scripts
└── playwright.config.ts   # 10 browser projects, parallel execution
```

---

## Testing Techniques Used

1. Smoke Testing
2. Functional Testing
3. Boundary Value Analysis
4. Equivalence Partitioning
5. Conditional / Branch Testing
6. End-to-End Testing
7. Cross-Browser Testing
8. Responsive Testing
9. Data-Driven Testing
10. Multi-Lingual Testing
11. Regression Testing
12. Integration Testing

---

## Results

| Metric | Value |
|--------|-------|
| Total Test Cases | 44 |
| Passing on Replica | 44 / 44 |
| Passing on Live Form | 35 / 41 (6 expected failures documented) |
| Browsers Tested | Chrome, Firefox, WebKit, Edge |
| Viewports Tested | Desktop, Mobile (iPhone 13), Tablet (iPad) |
| Input Types Covered | 15 / 15 |
| Conditional Branches Covered | 3 / 3 |
| Defects Found | 15 (6 platform, 9 functional) |
| Defects Fixed | 4 |
| Data-Driven Personas | 14 |
| Languages Tested | English, German, Japanese, Arabic |
| Parallel Workers | 4 |

**Gate Decision: PASS** — All functional requirements met. Platform defects documented with evidence and categorized separately.

---

## Live Form URLs

Anonymous form (no sign-in):
`https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=Hdc7JPfOLUSzfz_xCj4oMsmOtRlQ2SlKhbNhHCoj8C1UMEVBS0JKMDRKWEE4SUMxM0Q3NUtWNFlTTi4u`

File-upload form (sign-in required):
`https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=Hdc7JPfOLUSzfz_xCj4oMsmOtRlQ2SlKhbNhHCoj8C1URUQ0STFNVlU1STMwME5FV1RYVUROUDhBTS4u`
