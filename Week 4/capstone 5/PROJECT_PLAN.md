# Capstone 5 — Playwright + Microsoft Forms Survey Automation

> End-to-end project plan: build a multi-page conditional customer survey, then test it with a
> hybrid Playwright-automation + manual strategy, and produce a full test report.

---

## 1. Overview

This capstone delivers an automated test suite for a **multi-page customer satisfaction survey** that
reproduces the Microsoft Forms experience: **6 pages**, **15 input types**, and **IF/ELSE conditional
branching** between pages. The survey is the *application under test*; Playwright (TypeScript) is the
automation tool, supported by a manual UI/UX test pass.

The project is built in phases. Each phase is completed, validated, documented, and committed
separately so progress is always working and explainable.

---

## 2. Objective & Scope

| Item | Detail |
|------|--------|
| **Primary objective** | Design + test a 6-page conditional survey covering all 15 Microsoft Forms input types |
| **Testing approach** | Hybrid — Playwright automation for logic/validation/coverage, manual for UI/UX |
| **Deliverable type** | Runnable Playwright project + test-case documentation + execution report + README |
| **In scope** | Smoke, functional, conditional-logic, validation, E2E, cross-browser, responsive, UI/UX |
| **Out of scope** | Security (SQLi/XSS), load/performance, full WCAG compliance, backend infra, API testing, database testing |

---

## 3. Confirmed Requirements (from the assignment)

### 3.1 The 15 required input types

| # | Input type (as listed by the assignment) | Page | Question |
|---|------------------------------------------|------|----------|
| 1 | Text (short answer) | 1 | Full name (Q1), Company (Q3) |
| 2 | Paragraph text (long answer) | 3 / 4 | What do you like most? (Q9) / Why not satisfied? (Q9b) / What would make it a 10? (Q12b) / Describe the issue (Q12d) |
| 3 | Multiple choice (radio) | 2 / 4 / 5 | How did you hear about us? (Q5) / Case study? (Q12) / Follow-up? (Q15) |
| 4 | Checkboxes (multiple select) | 2 | Which features do you use? (Q6) |
| 5 | Dropdown list | 3 / 5 | Best feature (Q10) / Preferred contact method (Q13) |
| 6 | Rating scale (1–5 stars) | 2 | Rate your overall experience (Q7) |
| 7 | Likert scale | 5 | Agreement statement (Q17) |
| 8 | Net Promoter Score (0–10) | 2 | How likely to recommend us? (Q8) |
| 9 | Date picker | 3 | Purchase date (Q11) |
| 10 | Time picker | 3 / 5 | Best time to contact (Q11b, Q14) |
| 11 | Email input | 1 | Email address (Q2) |
| 12 | Number input | 1 | Number of employees (Q4) |
| 13 | Ranking / ordering | 3 / 5 | Rank improvements (Q10b) / Rank channels (Q16) |
| 14 | File upload | 4 | Upload issue screenshot (Q12c) |
| 15 | Conditional branching / section break | 3–5 | All IF/ELSE logic |

### 3.2 Conditional branching rules

| Branch | Condition | IF true | ELSE / other |
|--------|-----------|---------|--------------|
| **P3 — Satisfaction** | `overall_rating >= 4` | Positive: "What do you like most?" (paragraph), Best feature (dropdown), Purchase date (date) | Improvement: "Why not satisfied?" (paragraph), "What would improve?" (ranking), Contact time (time) |
| **P4 — NPS** | `nps >= 8` | Case-study interest (Yes/No + paragraph) | `6–7` → "What would make 10?" (paragraph); `≤ 5` → file upload + issue details (paragraph) |
| **Page 5 — Follow-up** | `followUp = Yes` | Show contact method (dropdown), best time (time), ranking, Likert | `No` → skip to Thank You |
| **Page 6 — Thank You** | `caseStudy = Yes` | "We'll contact you soon." | "Thank you for your feedback." |

### 3.2b Validation rules

| Field | Rule |
|-------|------|
| Name (Q1) | Required, 3–100 characters |
| Email (Q2) | Required, valid format `user@domain.com` |
| Employees | Required, numeric only, ≥ 1 |
| Rating (Q5) | Required, exactly one of 1–5 |
| NPS (Q4) | Required, integer 0–10 |
| Checkboxes (Q6) | Required, at least 1 selected |
| Paragraph (Q9) | Optional, max 1000 characters |
| Time (Q10) | Optional, `HH:MM` 24-hour |
| File upload | Optional, accepted types + max size |

### 3.3 Testing types to cover (7)

Smoke, Functional, Regression, System Integration, Multi-lingual, Cross-Browser, Responsive — plus the
hybrid manual UI/UX pass.

---

## 4. Application Under Test — Environment Strategy

The survey is served by a **self-contained local replica** of the Microsoft Forms survey so the suite
is deterministic, runnable without a tenant login, and never flaky. A single configuration switch
points the same suite at a real Microsoft Forms URL if one is provided later.

| Mode | Env var | Base URL | Use |
|------|---------|----------|-----|
| **Local replica (default)** | `FORM_MODE=local` | `http://127.0.0.1:PORT` (static server in `app/`) | Day-to-day runs, CI, cross-browser, responsive |
| **Real Microsoft Form** | `FORM_MODE=remote`, `FORM_URL=...` | provided URL | Final demonstration against the live form |

The replica reproduces the survey **exactly** (same pages, questions, ordering, validation messages and
branching) and is stored in `app/`. The same selectors/Page-Object are reused for both modes through
stable `data-testid` attributes, which mirror how a real form maps to locators.

> The replica is the contract: a `FORM_DESIGN.md` companion document lists every page/question/rule so
> the same survey can be rebuilt 1:1 in Microsoft Forms.

---

## 5. Tech Stack & Tools

| Category | Tool |
|----------|------|
| Language | TypeScript |
| Test framework | Playwright Test (`@playwright/test`) |
| Pattern | Page Object Model (POM) + fixtures |
| Static server for replica | `http-server` (dev dependency) or Playwright `webServer` |
| Browsers | Chromium, Firefox, WebKit (Safari engine), Edge (channel) |
| Devices | Desktop, iPhone (mobile), iPad (tablet) |
| Reporting | Playwright HTML report + custom execution summary |
| Version control | Git (feature commits on `main`) |
| Documentation | Markdown + Word progress log (local, not committed) |

---

## 6. Project Structure

```
capstone 5/
├── app/                              # Application under test (local replica)
│   ├── index.html                    # 6-page survey shell + logic
│   ├── styles.css
│   └── survey.js                     # navigation, branching, validation
├── config/
│   └── env.ts                        # FORM_MODE / FORM_URL / timeouts
├── pages/                            # Page Object Model
│   ├── SurveyPage.ts                 # coordinator (goto, next, submit)
│   ├── PageDemographics.ts
│   ├── PageProductUsage.ts
│   ├── PageSatisfactionBranch.ts
│   ├── PageDetailedFeedback.ts
│   ├── PagePreferences.ts
│   └── PageThankYou.ts
├── fixtures/
│   └── surveyData.ts                 # users, branch data, boundary values
├── utils/
│   ├── constants.ts                  # selectors/testids, messages, breakpoints
│   ├── logger.ts                     # step + workflow logging
│   └── helpers.ts                    # reusable assertions/waits
├── tests/
│   ├── smoke/                        # TC-001, TC-002
│   ├── functional/                   # TC-003 .. TC-009
│   ├── conditional/                  # TC-010 .. TC-020
│   ├── validation/                   # TC-021 .. TC-023
│   ├── e2e/                          # TC-024, TC-025
│   ├── cross-browser/                # TC-026 .. TC-028
│   ├── responsive/                   # TC-029, TC-030
│   └── manual/                       # TC-031 .. TC-033 (checklists / evidence)
├── docs/
│   ├── FORM_DESIGN.md                # page/question/rule specification
│   ├── TEST_CASES.md                 # 33 test cases, full detail
│   ├── TEST_PLAN.md                  # strategy, entry/exit criteria
│   ├── TEST_EXECUTION_REPORT.md      # results per run
│   ├── DEFECT_LOG.md                 # defects + severity
│   └── PROGRESS_LOG.docx             # running Word record (local only)
├── PROJECT_PLAN.md                   # this file
├── README.md                         # setup + how to run
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

**One test case = one spec file.** Example:
`tests/conditional/TC-010-ratingHighPositiveBranch.spec.ts`.

Every spec file starts with a header comment block (TC ID, title, type, technique, pre-conditions,
steps, expected result) and finishes by logging a **workflow summary** proving the end-to-end steps for
that case executed.

---

## 7. Module Map

| Module | Folder | Coverage |
|--------|--------|----------|
| Smoke | `tests/smoke` | Form loads, all pages reachable |
| Functional | `tests/functional` | Each of the 15 input types |
| Conditional logic | `tests/conditional` | All IF/ELSE branches |
| Validation | `tests/validation` | Required, format, range |
| End-to-end | `tests/e2e` | Full happy path + data verification |
| Cross-browser | `tests/cross-browser` | Per-browser rendering/flow assertions |
| Responsive | `tests/responsive` | Mobile + tablet viewports |
| Manual / UI-UX | `tests/manual` | Visual, accessibility, error clarity |

---

## 8. Test Strategy — What Is Automated vs Manual

| Test type | Technique used | Module | Method |
|-----------|---------------|--------|--------|
| Smoke | Happy path / sanity | `smoke` | **Automated** |
| Functional | Equivalence partitioning, boundary value analysis | `functional` | **Automated** (rating: manual + automated) |
| Conditional logic | Decision-table testing | `conditional` | **Automated** (dropdown/date/ranking: manual + automated) |
| Validation | Negative testing, boundary value analysis | `validation` | **Automated** |
| E2E | Happy path, data verification | `e2e` | **Automated** (data check: manual + automated) |
| Cross-browser | Browser compatibility matrix | `cross-browser` | **Automated** |
| Responsive | Viewport emulation | `responsive` | **Automated** (visual: manual) |
| Visual design | Heuristic evaluation | `manual` | **Manual** |
| Accessibility | Keyboard navigation / tab order | `manual` | **Manual** |
| Error clarity | Exploratory | `manual` | **Manual** |
| Regression | Re-run functional + conditional | all spec modules | **Automated** |
| System integration | Data persistence check | `e2e` | **Manual + automated** |
| Multi-lingual | Localization/encoding spot check | `manual` | **Manual** |

---

## 9. Test Case Catalog (35 cases)

The 33 designed cases below are executed against the local replica. The same case ids are reused on
the published Microsoft Forms survey in `tests/live/` (second test object); TC-034 and TC-035 were
added for the data-driven and multi-lingual requirements.

| TC | Title | Type | Module / File | Technique | Method |
|----|-------|------|---------------|-----------|--------|
| TC-001 | Form page load | Smoke | `smoke/TC-001-formLoads.spec.ts` | Sanity | Automated |
| TC-002 | All pages accessible | Smoke | `smoke/TC-002-pagesAccessible.spec.ts` | Exploratory | Manual |
| TC-003 | Text (name) input | Functional | `functional/TC-003-nameTextInput.spec.ts` | Equivalence partition | Automated |
| TC-004 | Email input | Functional | `functional/TC-004-emailInput.spec.ts` | Equivalence partition | Automated |
| TC-005 | Number (employees) input | Functional | `functional/TC-005-employeeNumberInput.spec.ts` | Boundary value | Automated |
| TC-006 | Multiple choice | Functional | `functional/TC-006-multipleChoice.spec.ts` | Happy path | Automated |
| TC-007 | Checkboxes | Functional | `functional/TC-007-checkboxes.spec.ts` | Equivalence partition | Automated |
| TC-008 | Rating scale (stars) | Functional | `functional/TC-008-ratingScale.spec.ts` | Boundary value | Manual + Automated |
| TC-009 | NPS (0–10) | Functional | `functional/TC-009-npsScore.spec.ts` | Boundary value | Automated |
| TC-010 | Rating ≥ 4 → positive branch | Conditional | `conditional/TC-010-ratingHighPositiveBranch.spec.ts` | Decision table | Automated |
| TC-011 | Rating < 4 → improvement branch | Conditional | `conditional/TC-011-ratingLowImprovementBranch.spec.ts` | Decision table | Automated |
| TC-012 | Conditional dropdown | Conditional | `conditional/TC-012-conditionalDropdown.spec.ts` | Decision table | Manual + Automated |
| TC-013 | Conditional date picker | Conditional | `conditional/TC-013-conditionalDatePicker.spec.ts` | Decision table | Manual + Automated |
| TC-014 | Conditional ranking | Conditional | `conditional/TC-014-conditionalRanking.spec.ts` | Decision table | Manual + Automated |
| TC-015 | NPS ≥ 8 → promoter path | Conditional | `conditional/TC-015-npsPromoterPath.spec.ts` | Decision table | Automated |
| TC-016 | NPS 6–7 → passive path | Conditional | `conditional/TC-016-npsPassivePath.spec.ts` | Decision table | Automated |
| TC-017 | NPS ≤ 5 → detractor path | Conditional | `conditional/TC-017-npsDetractorPath.spec.ts` | Decision table | Automated |
| TC-018 | File upload conditional | Conditional | `conditional/TC-018-fileUploadConditional.spec.ts` | Decision table | Manual + Automated |
| TC-019 | Follow-up = Yes path | Conditional | `conditional/TC-019-followUpYes.spec.ts` | Decision table | Automated |
| TC-020 | Follow-up = No skips | Conditional | `conditional/TC-020-followUpNoSkip.spec.ts` | Decision table | Automated |
| TC-021 | Required field validation | Validation | `validation/TC-021-requiredFields.spec.ts` | Negative testing | Automated |
| TC-022 | Email format validation | Validation | `validation/TC-022-emailFormat.spec.ts` | Equivalence partition | Automated |
| TC-023 | NPS range validation | Validation | `validation/TC-023-npsRange.spec.ts` | Boundary value | Automated |
| TC-024 | Complete happy path | E2E | `e2e/TC-024-completeHappyPath.spec.ts` | Happy path | Automated |
| TC-025 | Response data verification | E2E | `e2e/TC-025-responseDataVerification.spec.ts` | Data validation | Manual + Automated |
| TC-026 | Chrome compatibility | Cross-browser | `cross-browser/TC-026-chromium.spec.ts` | Browser matrix | Automated |
| TC-027 | Firefox compatibility | Cross-browser | `cross-browser/TC-027-firefox.spec.ts` | Browser matrix | Automated |
| TC-028 | Safari compatibility | Cross-browser | `cross-browser/TC-028-webkit.spec.ts` | Browser matrix | Automated |
| TC-029 | Mobile responsive (iPhone) | Responsive | `responsive/TC-029-mobile.spec.ts` | Viewport emulation | Manual + Automated |
| TC-030 | Tablet responsive (iPad) | Responsive | `responsive/TC-030-tablet.spec.ts` | Viewport emulation | Manual + Automated |
| TC-031 | Visual design inspection | Manual | `manual/TC-031-visualDesign.md` | Heuristic evaluation | Manual |
| TC-032 | Accessibility — keyboard nav | Manual | `manual/TC-032-keyboardNavigation.md` | Tab-order check | Manual |
| TC-033 | Error message clarity | Manual | `tests/manual/TC-033-errorMessageClarity.spec.ts` + checklist | Exploratory | Manual |
| TC-034 | Data-driven Page 1 validation | Validation | `datadriven/TC-034-dataDrivenValidation.spec.ts` | Data-driven (persona matrix) | Automated |
| TC-035 | Multi-lingual rendering and encoding | Localisation | `multilingual/TC-035-multiLingual.spec.ts` | Locale matrix (de-DE, ja-JP, ar-SA) | Automated |

---

## 10. Implementation Phases

Each phase = build → validate → document in `PROGRESS_LOG.docx` → commit only when green.

| Phase | Work | Validation gate | Commit |
|-------|------|-----------------|--------|
| **P0 – Setup** | Project plan, gitignore, package.json, tsconfig, Playwright config | `npx playwright --version`, config parses | `Capstone 5 - add project plan and gitignore` |
| **P1 | App (replica form)** | Build `app/` 6 pages, 15 inputs, branching, validation | Manual walkthrough of all branches; all pages render | `Capstone 5 - add survey replica application` |
| P2 | Framework skeleton | POM classes, fixtures, utils, constants | Type-check clean; smoke test opens form | `Capstone 5 - add page objects and test framework` |
| P3 | Smoke module | TC-001, TC-002 | `npx playwright test tests/smoke` green | `Capstone 5 - add smoke tests` |
| P4 | Functional module | TC-003 → TC-009 | Module green; defects logged | `Capstone 5 - add functional tests` |
| P5 | Conditional module | TC-010 → TC-020 | Module green; all branches proven | `Capstone 5 - add conditional logic tests` |
| P6 | Validation module | TC-021 → TC-023 | Module green | `Capstone 5 - add validation tests` |
| P7 | E2E module | TC-024, TC-025 | Happy path + data check green | `Capstone 5 - add end-to-end tests` |
| P8 | Cross-browser + responsive | TC-026 → TC-030 | Runs on chromium/firefox/webkit + mobile/tablet | `Capstone 5 - add cross-browser and responsive tests` |
| P9 | Manual / UI-UX | TC-031 → TC-033 | Checklists + evidence captured | `Capstone 5 - add manual test evidence` |
| P10 | Execution & reporting | Full run, HTML report, execution report, defect log | Report generated; all docs complete | `Capstone 5 - add execution report and documentation` |

Each phase follows the same loop: **implement → validate → document (Word log) → git commit → continue.**

---

## 10b. Page Object Model Design

| Class | Responsibility |
|-------|---------------|
| `SurveyPage` | Navigation coordinator: `goto`, `next`, `previous`, `submit`, page visibility |
| `PageDemographics` | Name, email, company, employee count |
| `PageProductUsage` | Multiple choice, checkboxes, rating, NPS |
| `PageSatisfactionBranch` | Positive + negative branch fields |
| `PageDetailedFeedback` | Promoter / passive / detractor fields + upload |
| `PagePreferences` | Contact dropdown, time, follow-up, ranking, Likert |
| `PageThankYou` | Confirmation + summary assertions |

Rules: tests never contain raw selectors; selectors live in POM/constants; assertions are reused via
`utils/helpers.ts`; no hard-coded waits (Playwright auto-wait + web-first assertions only).

---

## 10c. Test Data Design (`fixtures/surveyData.ts`)

| Dataset | Purpose |
|---------|---------|
| `validUser` | Standard happy-path demographics |
| `branchUsers` | One per branch (high rating, low rating, promoter, passive, detractor, follow-up yes/no) |
| `invalidEmails` | Email equivalence-class negatives |
| `npsBoundaries` | `-1, 0, 5, 6, 7, 8, 10, 11` |
| `ratingBoundaries` | `1, 3, 4, 5` |
| `nameLengths` | `""`, `"Jo"`, 3 chars, 100 chars, 101 chars |
| `fileFixtures` | valid PDF/PNG + oversize + wrong-type |

---

## 11. Documentation & Evidence

| Document | Purpose | Committed? |
|----------|---------|-----------|
| `PROGRESS_LOG.docx` | Plain-language running record: what was done, how, and why — used to explain the project to the mentor | No (local only) |
| `docs/FORM_DESIGN.md` | Full survey specification (pages, questions, rules, branching) | Yes |
| `docs/TEST_CASES.md` | All 33 test cases with pre-conditions/steps/expected | Yes |
| `docs/TEST_PLAN.md` | Strategy, entry/exit criteria, scope | Yes |
| `docs/TEST_EXECUTION_REPORT.md` | Results per run, pass/fail, metrics | Yes |
| `docs/DEFECT_LOG.md` | Defects found with severity + status | Yes |
| `README.md` | Setup + how to run + structure | Yes |

**Word log rule:** after every completed and validated piece of work, a short entry is appended
(What was done → How it works → Result → Next). The Word file stays local; the same content is
mirrored into markdown docs that are committed.

---

## 12. Defect Management

| Severity | Definition | Example | Action |
|----------|-----------|---------|--------|
| Critical | Blocks all functionality | Form won't load, submit broken | Fix immediately |
| Major | Major feature broken | Validation fails, data not saved | Fix soon |
| Minor | Wrong behavior with workaround | Label misaligned | Next release |
| Low | Cosmetic | Typo, color | When time permits |

Every defect is recorded in `docs/DEFECT_LOG.md` with ID, title, severity, steps, expected, actual,
environment, status. When a test fails, the defect is logged **and** the test is documented as failing
rather than silently skipped.

---

## 13. Git Workflow

- Work happens on `main` (as with prior capstones).
- **Never commit** broken code, failing tests, or WIP that does not type-check.
- **Never commit** `node_modules/`, reports, traces, `*.docx`, `*.xlsx`, `*.py` (ignored).
- Commit messages: `Capstone 5 - <what was added>` (plain, meaningful, no extra attribution).
- Before each commit: `npx playwright test <module>` (or `npx tsc --noEmit`) must be clean.
- Push after each validated phase.

---

## 14. Deliverables Checklist

| # | Deliverable | Location | Status |
|---|-------------|----------|--------|
| 1 | Survey form (replica + published Microsoft Forms survey) | `app/` + published URL in `README.md` | Done |
| 2 | Form design screenshots (all 15 input types) | `docs/evidence/forms/` + Word log | Done |
| 3 | Test cases document (35 cases) | `docs/TEST_CASES.md` | Done |
| 4 | Playwright project | repo | Done |
| 5 | Test execution report | `docs/TEST_EXECUTION_REPORT.md` + HTML report | Done |
| 6 | README | `README.md` | Done |
| 7 | Progress record | `docs/PROGRESS_LOG.docx` (local) | Done |
| 8 | Data-driven testing (TC-034) | `fixtures/personas.json` + `tests/datadriven/` | Done |
| 9 | Custom fixtures | `fixtures/capstoneFixtures.ts` | Done |
| 10 | Multi-lingual testing (TC-035) | `tests/multilingual/` | Done |

---

## 15. Evaluation Mapping (100 points)

| Criterion | Points | How this plan covers it |
|-----------|--------|------------------------|
| Survey design & structure | 20 | 6 pages, 15 input types, validation, welcome + thank-you, 10+ questions |
| Test case design | 20 | 33 documented cases, happy/negative paths, technique-driven |
| Playwright implementation | 25 | POM, fixtures, stable selectors, auto-waits, meaningful assertions, error handling |
| Test execution & results | 20 | Full runs, cross-browser, responsive, HTML report, screenshots |
| Documentation & report | 15 | Test report, execution summary, defect log, README, Word log |

---

## 16. Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Real Microsoft Forms needs tenant login | High | Local replica as AOT; `FORM_URL` switch for live demo |
| Real form DOM is dynamic/flaky | High | Stable `data-testid` contract; POM isolates locators |
| Flaky tests from timing | Medium | No hard-coded waits; web-first assertions; auto-wait |
| Large scope (33 cases) | Medium | Module-wise delivery; validate each module before moving on |
| Accidental bad commit on shared repo | High | Validate before commit; `.gitignore` for artifacts/docx |

---

## 16b. Definition of Done

- All automated modules green on chromium, firefox and webkit.
- Mobile + tablet viewport checks pass.
- Manual UI/UX, accessibility and error-clarity checks completed with evidence.
- `docs/TEST_CASES.md`, `docs/TEST_PLAN.md`, `docs/TEST_EXECUTION_REPORT.md`, `docs/DEFECT_LOG.md`, `README.md` complete.
- Every phase recorded in `docs/PROGRESS_LOG.docx`.
- Repo clean: no build artifacts, no secrets, no broken code committed.

---

## 17. Execution Commands (reference)

| Command | Purpose |
|---------|---------|
| `npx playwright test` | Run everything |
| `npx playwright test tests/conditional` | Run one module |
| `npx playwright test --project=chromium` | One browser |
| `npx playwright test --project=mobile` | Mobile viewport |
| `npx playwright show-report` | Open HTML report |
| `npx tsc --noEmit` | Type-check |
