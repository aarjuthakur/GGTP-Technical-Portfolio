# Test Plan

## 1. Purpose

Define how the 6-page conditional customer satisfaction survey is tested: what is covered, which
technique is used for each area, what is automated with Playwright, what is verified manually, and the
criteria for starting and finishing testing.

## 2. Scope

**In scope**

- Survey structure: 6 pages, welcome and thank-you pages, progress indicator, Back/Next/Submit.
- All 15 input types listed in the form design specification.
- IF/ELSE conditional branching on Pages 3, 4, 5 and 6.
- Field validation: required fields, email format, numeric and range rules, file rules.
- End-to-end completion of the survey.
- Cross-browser behaviour (Chromium, Firefox, WebKit, Edge).
- Responsive behaviour (mobile and tablet viewports).
- Data-driven validation of Page 1 (14-row persona matrix, TC-034).
- Multi-lingual rendering, translation and encoding (de-DE, ja-JP, ar-SA, TC-035).
- Regression re-testing of the critical functional and conditional paths after a change (TC-036/037).
- System integration across the submission boundary: response persistence, single-record guard and
  collection readiness (TC-038), and the Microsoft Forms backend round trip on the live link (TC-039).
- File upload: the accepted types and the 10 MB boundary (TC-043) plus the manual dialog pass (TC-042).
- The published Microsoft Forms survey (second test object): functional, conditional, validation and
  end-to-end cases executed against the live responder link.
- The second published form - the same survey with a file-upload question. Microsoft Forms only
  renders it for a signed-in responder, so that link is verified manually (TC-042) while the upload
  rules themselves are automated against the replica (TC-018, TC-043).
- Manual UI/UX, accessibility (keyboard navigation), error-message clarity, usability, responsive
  visual quality and file-dialog checks.

**Out of scope**

- Security testing (SQL injection, XSS), load/performance testing, full WCAG audit.
- Backend infrastructure, API testing and database verification (the survey is front-end only).

## 3. Test approach

Hybrid: Playwright automation covers logic, validation, coverage and repeatability; manual testing
covers visual quality and usability, which automation cannot judge.

| Test type | Technique | Module | Method |
|-----------|-----------|--------|--------|
| Smoke | Happy path / sanity | `tests/smoke` | Automated (+ manual confirmation) |
| Functional | Equivalence partitioning, boundary value analysis | `tests/functional` | Automated |
| Conditional logic | Decision table testing | `tests/conditional` | Automated |
| Validation | Negative testing, boundary value analysis | `tests/validation` | Automated |
| End-to-end | Happy path, data verification | `tests/e2e` | Automated (+ manual data check) |
| Cross-browser | Browser compatibility matrix | `tests/cross-browser` | Automated |
| Responsive | Viewport emulation | `tests/responsive` | Automated (+ manual visual check) |
| UI/UX, accessibility, error clarity, usability, visual quality, file dialog | Heuristic evaluation, exploratory, visual inspection | `tests/manual` | Manual |
| Regression | Re-test of critical paths after a change | `tests/regression` | Automated (Chromium) |
| System integration | Persistence and response collection, platform round trip | `tests/integration`, `tests/live` | Automated |
| File upload rules | Equivalence partitioning, boundary value analysis | `tests/functional` | Automated |
| Data-driven | Persona matrix over equivalence classes and boundaries | `tests/datadriven` | Automated |
| Multi-lingual | Locale matrix, translation and encoding checks | `tests/multilingual` | Automated |
| Published form | Same case ids, Microsoft Forms DOM | `tests/live` | Automated |
| Published upload form | File upload on the live link, by hand | `tests/manual` | Manual (sign-in required) |

## 4. Environment

| Item | Value |
|------|-------|
| Application under test | Bundled survey replica in `app/` (default) and the published Microsoft Forms survey (`live` project) |
| Browser stack | Chromium, Firefox, WebKit, Edge (replica); Chromium (published form) |
| Device emulation | Desktop, iPhone 13 (mobile), iPad 7th gen (tablet) |
| Framework | Playwright Test with TypeScript |
| Design pattern | Page Object Model |
| Reporting | Playwright HTML report, list reporter, workflow logs |

A switch in `config/env.ts` points the suite at a real form without changing any test:
`FORM_MODE=remote` and `FORM_URL=<url>`.

## 5. Entry criteria

- The survey replica (or the real form) loads without errors.
- Dependencies are installed and browsers are available.
- The suite type-checks cleanly.

## 6. Exit criteria

- All automated test cases pass on Chromium, Firefox and WebKit.
- The published-form project passes, with deliberate expected failures tied to open defects.
- Cross-browser and responsive modules pass.
- Manual checks are completed and evidence recorded.
- Every defect is logged with a severity and status.
- The execution report is updated and the README is accurate.

## 7. Defect severity levels

| Severity | Definition | Response |
|----------|------------|----------|
| Critical | Blocks the survey from working | Fix immediately |
| Major | A major feature is broken (e.g. validation or branching fails) | Fix before sign-off |
| Minor | Wrong behaviour with a workaround | Schedule a fix |
| Low | Cosmetic issue | Fix when time permits |

## 8. Test data

| Dataset | Purpose |
|---------|---------|
| Valid user | Happy-path demographics |
| Branch data | One dataset per branch (high/low rating, promoter/passive/detractor, follow-up yes/no) |
| Invalid emails | Email equivalence-class negatives |
| Boundary values | Name length, NPS 0-10, rating 1-5 |
| File fixtures | Valid image/PDF, wrong type, oversize |

## 9. Risks and mitigation

| Risk | Mitigation |
|------|------------|
| The real Microsoft Form needs a tenant login | Default to the local replica; remote mode is optional |
| Microsoft Forms requires a signed-in responder for a form with a file upload | The upload form is checked by hand (TC-042); the upload rules are automated against the replica (TC-018, TC-043), which needs no sign-in |
| Microsoft Forms markup changes | Selectors live in page objects, so only one file changes |
| Flaky waits | No fixed sleeps or custom timeouts; Playwright auto-waiting only |
| Large scope | Built module by module; each module is validated before moving on |
