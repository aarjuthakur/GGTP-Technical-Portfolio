# Test Execution Report

Results are appended after each validated module. The most recent run is shown first.

---

## Run 16 - Coverage review: regression, integration and upload modules

**Command:** `npx tsc --noEmit && npx playwright test`
**Environment:** Local replica (Chromium, Firefox, WebKit, Edge, iPhone 13, iPad 7th gen) + the anonymous published Microsoft Forms survey (Chromium)
**Modules:** All automated modules, `live`, `multilingual`, `datadriven`, `validation` (TC-044)

| Project group | Cases | Result |
|---------------|-------|--------|
| chromium | 36 | Passed |
| firefox / webkit / edge | 99 | Passed |
| cross-chrome / cross-firefox / cross-webkit | 3 | Passed |
| mobile / tablet | 2 | Passed |
| live + multilingual + datadriven | 41 | Passed |
| **Total** | **181** | **181 passed** |

**Summary:** 181 passed, 0 failed, 0 flaky. Type check clean. The six expected failures on the
published form are unchanged (TC-011 x2, TC-013, TC-015, TC-016 x2).
**Defects raised:** **DEF-015** (Major) - the file-upload rejection message was cleared again
immediately by the generic error-clearing handler, so a rejected file left the question silently
empty. Found while writing the manual upload pass (TC-042), fixed in `app/survey.js` and now asserted
by TC-043.
**Notes:** The coverage review added nine cases (TC-036 to TC-044) and closed three requirement gaps:
regression (TC-036/037), system integration (TC-038/039), the manual module (TC-040/041/042) and the
character-length rules (TC-044). The file-upload form needs a signed-in responder, so it is verified
manually (TC-042) rather than by a saved sign-in session. Run with `--workers=2` when other work is
running on the same machine: with all browsers in parallel, two unrelated cases (TC-008 in Firefox,
TC-020 in Firefox) were seen to flake once each, and both pass serially and at `--workers=2`.

---

## Run 15 - Coverage review: new modules in isolation

**Command:** `npx playwright test tests/regression tests/integration tests/functional/TC-043-fileUploadValidation.spec.ts --project=chromium` and `npx playwright test tests/live/TC-039-formsResponseCollection.spec.ts --project=live`
**Environment:** Local replica (Chromium) + anonymous published Microsoft Forms survey
**Modules:** `regression`, `integration`, `functional` (TC-043), `live` (TC-039)

| Test case | Title | Project | Result |
|-----------|-------|---------|--------|
| TC-036 | Core functional flows after the form update | chromium | Passed |
| TC-037 | Conditional branches after the form update | chromium | Passed |
| TC-038 | A response is recorded once and collected correctly | chromium | Passed |
| TC-039 | Forms backend acknowledges a response and collects the next | live | Passed |
| TC-043 | File upload validation | chromium | Passed |

**Summary:** 5 passed, 0 failed.
**Defects:** TC-043 confirms the DEF-015 fix: a `.txt` file and a PNG one byte over 10 MB are now
rejected with a visible message and dropped from the control, and a valid PDF afterwards clears it.

---

## Run 14 - Full regression with the published form (all projects)

**Command:** `npx tsc --noEmit && npx playwright test`
**Environment:** Local replica (Chromium, Firefox, WebKit, Edge, iPhone 13, iPad 7th gen) + published Microsoft Forms survey (Chromium)
**Modules:** All automated modules, `live`, `multilingual`, `datadriven`

| Project group | Cases | Result |
|---------------|-------|--------|
| chromium / firefox / webkit / edge | 100 | Passed |
| cross-chrome / cross-firefox / cross-webkit | 3 | Passed |
| mobile / tablet | 2 | Passed |
| live + multilingual + datadriven | 40 | Passed |
| **Total** | **145** | **Passed** |

**Summary:** 145 passed, 0 failed, 0 flaky, 0 skipped. Type check clean.
**Notes:** The replica suite is unchanged at 105 cases. The 40 new cases exercise the published form;
six of them are deliberate expected failures carrying an open-defect id (TC-011 x2, TC-013, TC-015,
TC-016 x2), so the run is green as evidence and turns red if the branch behaviour changes.

---

## Run 13 - Published Microsoft Forms survey (live project)

**Command:** `npx playwright test --project=live --reporter=list`
**Environment:** Published Microsoft Forms survey, anonymous responder link, Chromium
**Modules:** `live` (TC-001, 003-017, 019-021, 024), `multilingual` (TC-035), `datadriven` (TC-034)

| Area | Cases | Result |
|------|-------|--------|
| Smoke, functional and validation (live) | 9 | Passed |
| Conditional and end-to-end (live) | 13 | Passed (6 expected failures) |
| Data-driven Page 1 matrix (TC-034) | 15 | Passed |
| Multi-lingual matrix (TC-035) | 3 | Passed |
| **Total** | **40** | **Passed** |

**Expected failures and their defects**

| Test | Defect | Observed behaviour |
|------|--------|--------------------|
| TC-011 (rating 3) | DEF-004 | Jumped to Recommendation instead of S3B |
| TC-011 (very dissatisfied) | DEF-004 | Page 2 replaced Next with Submit |
| TC-013 | DEF-010 | Start date is a textarea, not a date picker |
| TC-015 | DEF-005 | Promoter saw suggestion + issue, not the case study |
| TC-016 (neither) | DEF-006 | Case study, suggestion and issue all shown |
| TC-016 (somewhat unlikely) | DEF-006 | Only the detractor issue box shown |

**Summary:** 40 passed (34 genuine passes, 6 expected failures), 0 unexpected failures.
**Defects raised:** DEF-004 to DEF-014. All are open on the published form; DEF-001 to DEF-003 remain
fixed on the replica.
**Notes:** The live form is the second test object. It uses Microsoft Forms' own DOM, so its page
object is `pages/MicrosoftFormsPage.ts`; the replica keeps the 15-input-type and cross-browser
coverage. File upload is absent from the anonymous live form (limitation D-2), so TC-018 stays on the
replica.

---

## Run 12 - Final acceptance regression (all projects)

**Command:** `npm run typecheck && npm test`
**Environment:** Local replica; Chromium, Firefox, WebKit, Edge, iPhone 13, iPad 7th gen
**Modules:** All automated modules

| Project | Cases | Result |
|---------|-------|--------|
| chromium | 25 | Passed |
| firefox | 25 | Passed |
| webkit | 25 | Passed |
| edge | 25 | Passed |
| cross-chrome / cross-firefox / cross-webkit | 3 | Passed |
| mobile / tablet | 2 | Passed |
| **Total** | **105** | **Passed** |

**Summary:** 105 passed, 0 failed, 0 flaky, 0 skipped. Type check clean.
**Defects:** DEF-001, DEF-002 and DEF-003 are all fixed and confirmed.
**Notes:** Final acceptance run after every module was complete. The 33 documented cases are all
covered: 30 are automated (TC-001 to TC-030) and 3 are the manual write-ups (TC-031 to TC-033).

---

## Run 11 - Manual module (visual, accessibility, error clarity)

**Command:** manual pass (checklists in `tests/manual/`)
**Environment:** Local replica; Chromium desktop and phone-width window, plus Firefox for the keyboard pass
**Modules:** Manual

| Test case | Title | Technique | Result |
|-----------|-------|-----------|--------|
| TC-031 | Visual design inspection | Heuristic evaluation | Pass (10 of 10 checks) |
| TC-032 | Accessibility: keyboard navigation | Tab-order check | Pass with one recorded observation |
| TC-033 | Error message clarity | Exploratory wording review | Pass (20 of 20 messages) |

**Summary:** 3 of 3 passed.
**Defects raised:** None blocking. One accessibility observation (the error text is not linked to its
field with `aria-describedby`) and one wording suggestion for Q17 were recorded in the manual notes.
**Notes:** These three cases are human judgement, so they are written up as checklists rather than
scripts; no automation is attached to them.

---

## Run 10 - Full regression (all projects)

**Command:** `npx playwright test`
**Environment:** Local replica; Chromium, Firefox, WebKit, Edge, iPhone 13, iPad 7th gen
**Modules:** All automated modules

| Project | Scope | Result |
|---------|-------|--------|
| chromium | Smoke, functional, conditional, validation, e2e | 25 passed |
| firefox | Smoke, functional, conditional, validation, e2e | 25 passed |
| webkit | Smoke, functional, conditional, validation, e2e | 25 passed |
| edge | Smoke, functional, conditional, validation, e2e | 25 passed |
| cross-chrome | TC-026 | 1 passed |
| cross-firefox | TC-027 | 1 passed |
| cross-webkit | TC-028 | 1 passed |
| mobile | TC-029 | 1 passed |
| tablet | TC-030 | 1 passed |

**Summary:** 105 passed, 0 failed.
**Defects:** DEF-001, DEF-002 and DEF-003 are all fixed and confirmed by this run.
**Notes:** The same 25 cases run in four desktop browsers to prove the survey is browser independent.

---

## Run 9 - Responsive module (iPhone 13, iPad 7th gen)

**Command:** `npx playwright test tests/responsive --project=mobile --project=tablet --reporter=list`
**Environment:** Local replica; mobile and tablet emulation
**Modules:** Responsive

| Test case | Title | Device | Result |
|-----------|-------|--------|--------|
| TC-029 | Mobile responsive | iPhone 13 | Passed |
| TC-030 | Tablet responsive | iPad 7th gen | Failed, then Passed after the fix |

**Summary:** 2 passed, 0 failed (after the fix).
**Defects raised:** DEF-003 (Minor) - the progress bar never rendered. Fixed and retested.
**Notes:** TC-030 also confirms the progress bar has a real width on Page 1 and grows by the last page.

---

## Run 8 - Cross-browser module (Chromium, Firefox, WebKit)

**Command:** `npx playwright test tests/cross-browser --project=cross-chrome --project=cross-firefox --project=cross-webkit --reporter=list`
**Environment:** Local replica; Chromium, Firefox and WebKit engines
**Modules:** Cross-browser

| Test case | Title | Browser | Result |
|-----------|-------|---------|--------|
| TC-026 | Chrome compatibility | Chromium | Passed |
| TC-027 | Firefox compatibility | Firefox | Passed |
| TC-028 | Safari (WebKit) compatibility | WebKit | Passed |

**Summary:** 3 passed, 0 failed.
**Defects:** None raised in this module.
**Notes:** Each browser runs the full survey end to end, including the JavaScript-driven star rating
and ranking controls.

---

## Run 7 - End-to-end module (Chromium)

**Command:** `npx playwright test tests/e2e --project=chromium --reporter=list`
**Environment:** Local replica, Chromium
**Modules:** End-to-end

| Test case | Title | Result |
|-----------|-------|--------|
| TC-024 | Complete survey happy path | Passed |
| TC-025 | Response data verification | Passed |

**Summary:** 2 passed, 0 failed.
**Defects:** None raised in this module.
**Notes:** TC-025 checks all 15 summary rows against the answers that were entered.

---

## Run 6 - Validation module (Chromium)

**Command:** `npx playwright test tests/validation --project=chromium --reporter=list`
**Environment:** Local replica, Chromium
**Modules:** Validation (then a full Chromium regression)

| Test case | Title | Result |
|-----------|-------|--------|
| TC-021 | Required-field validation blocks Next | Passed |
| TC-022 | Email format validation | Passed |
| TC-023 | NPS range validation | Failed, then Passed after the fix |

**Summary:** 3 passed, 0 failed (after the fix).
**Defects raised:** DEF-002 (Minor) - button-based questions did not clear their validation message.
**Regression:** `npx playwright test --project=chromium` -> 23 passed.

---

## Run 5 - Conditional-logic module (Chromium)

**Command:** `npx playwright test tests/conditional --project=chromium --reporter=list`
**Environment:** Local replica, Chromium
**Modules:** Conditional logic

| Test case | Title | Result |
|-----------|-------|--------|
| TC-010 | Rating >= 4 shows the positive branch | Passed |
| TC-011 | Rating < 4 shows the improvement branch | Passed |
| TC-012 | Conditional dropdown | Passed |
| TC-013 | Conditional date picker | Passed |
| TC-014 | Conditional ranking | Passed |
| TC-015 | NPS >= 8 promoter path | Passed |
| TC-016 | NPS 6-7 passive path | Passed |
| TC-017 | NPS <= 5 detractor path | Passed |
| TC-018 | File upload on the detractor path | Passed |
| TC-019 | Follow-up = Yes shows the contact block | Passed |
| TC-020 | Follow-up = No skips the contact block | Passed |

**Summary:** 11 passed, 0 failed.
**Defects:** None raised in this module.
**Notes:** Boundary values (rating 4, NPS 8 and 5) were included to confirm the switch points.

---

## Run 4 - Functional module (Chromium)

**Command:** `npx playwright test tests/functional --project=chromium --reporter=list`
**Environment:** Local replica, Chromium
**Modules:** Functional

| Test case | Title | Result |
|-----------|-------|--------|
| TC-003 | Name text input accepts valid values | Passed |
| TC-004 | Email input accepts a valid address | Passed |
| TC-005 | Employee number input accepts valid numbers | Passed |
| TC-006 | Multiple choice selection | Passed |
| TC-007 | Checkbox multi-select | Passed |
| TC-008 | Rating scale 1-5 stars | Passed |
| TC-009 | NPS score 0-10 | Passed |

**Summary:** 7 passed, 0 failed.
**Defects:** None raised in this module.
**Notes:** The smoke module also still passes; the type-check is clean.

---

## Run 3 - Smoke module (Chromium)

**Command:** `npx playwright test tests/smoke --project=chromium --reporter=list`
**Environment:** Local replica, Chromium
**Modules:** Smoke

| Test case | Title | Result |
|-----------|-------|--------|
| TC-001 | Form page load | Passed |
| TC-002 | All pages accessible | Passed |

**Summary:** 2 passed, 0 failed.
**Defects:** DEF-001 was found in an earlier run of TC-002 and closed before this run.
**Notes:** Type-check (`npx tsc --noEmit`) is clean.

---

## Run 2 - Smoke module (Chromium)

**Command:** `npx playwright test tests/smoke --project=chromium --reporter=list`

| Test case | Title | Result |
|-----------|-------|--------|
| TC-001 | Form page load | Passed |
| TC-002 | All pages accessible | Failed |

**Summary:** 1 passed, 1 failed.
**Defects raised:** DEF-001 (Major) - option locator used the display label instead of the slug.

---

## Run 1 - Smoke module (Chromium)

**Command:** `npx playwright test tests/smoke --project=chromium --reporter=list`

| Test case | Title | Result |
|-----------|-------|--------|
| TC-001 | Form page load | Passed |

**Summary:** 1 passed, 1 stalled (TC-002 hit the default test timeout while waiting for a locator).
**Notes:** First execution; confirmed the framework, config and local server work.
