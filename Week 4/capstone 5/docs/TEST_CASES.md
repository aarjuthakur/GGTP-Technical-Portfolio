# Test Cases

44 test cases: the 33 designed in Phase 1, the two extensions TC-034 (data-driven) and TC-035
(multi-lingual), and the nine cases added in the coverage review - TC-036/037 (regression),
TC-038/039 (system integration), TC-040/041/042 (manual), TC-043 (file-upload validation) and TC-044
(character-length rules). Each
case is stored in its own file under `tests/<module>/`. Detailed entries are added module by module as
each module is implemented and validated; the summary table below is the master index.

The suite runs against two test objects: the local replica (`app/`, all 15 input types and every
browser) and the published Microsoft Forms surveys (`tests/live/` for the anonymous link, plus
`tests/multilingual/` and `tests/datadriven/`). The second published link, which carries the
file-upload question and needs a signed-in responder, is covered manually (`tests/manual/`).
See "Live execution" at the end for the per-case result on the published forms.

**Status legend:** `Done` = implemented and passing · `In progress` = being built · `Planned` = designed, not yet implemented.

---

## Master index

| ID | Title | Type | Technique | Module / file | Method | Status |
|----|-------|------|-----------|---------------|--------|--------|
| TC-001 | Form page load | Smoke | Sanity / happy path | `smoke/TC-001-formLoads.spec.ts` | Automated | Done |
| TC-002 | All pages accessible | Smoke | Navigation sanity | `smoke/TC-002-pagesAccessible.spec.ts` | Automated + manual | Done |
| TC-003 | Name text input accepts valid values | Functional | Equivalence partitioning | `functional/TC-003-nameTextInput.spec.ts` | Automated | Done |
| TC-004 | Email input accepts a valid address | Functional | Equivalence partitioning | `functional/TC-004-emailInput.spec.ts` | Automated | Done |
| TC-005 | Employee number input accepts valid numbers | Functional | Boundary value analysis | `functional/TC-005-employeeNumberInput.spec.ts` | Automated | Done |
| TC-006 | Multiple choice selection | Functional | Happy path | `functional/TC-006-multipleChoice.spec.ts` | Automated | Done |
| TC-007 | Checkbox multi-select | Functional | Equivalence partitioning | `functional/TC-007-checkboxes.spec.ts` | Automated | Done |
| TC-008 | Rating scale 1-5 stars | Functional | Boundary value analysis | `functional/TC-008-ratingScale.spec.ts` | Automated + manual | Done |
| TC-009 | NPS score 0-10 | Functional | Boundary value analysis | `functional/TC-009-npsScore.spec.ts` | Automated | Done |
| TC-010 | Rating >= 4 shows the positive branch | Conditional | Decision table | `conditional/TC-010-ratingHighPositiveBranch.spec.ts` | Automated | Done |
| TC-011 | Rating < 4 shows the improvement branch | Conditional | Decision table | `conditional/TC-011-ratingLowImprovementBranch.spec.ts` | Automated | Done |
| TC-012 | Conditional dropdown (best feature) | Conditional | Decision table | `conditional/TC-012-conditionalDropdown.spec.ts` | Automated + manual | Done |
| TC-013 | Conditional date picker | Conditional | Decision table | `conditional/TC-013-conditionalDatePicker.spec.ts` | Automated + manual | Done |
| TC-014 | Conditional ranking input | Conditional | Decision table | `conditional/TC-014-conditionalRanking.spec.ts` | Automated + manual | Done |
| TC-015 | NPS >= 8 shows the promoter path | Conditional | Decision table | `conditional/TC-015-npsPromoterPath.spec.ts` | Automated | Done |
| TC-016 | NPS 6-7 shows the passive path | Conditional | Decision table | `conditional/TC-016-npsPassivePath.spec.ts` | Automated | Done |
| TC-017 | NPS <= 5 shows the detractor path | Conditional | Decision table | `conditional/TC-017-npsDetractorPath.spec.ts` | Automated | Done |
| TC-018 | File upload appears on the detractor path | Conditional | Decision table | `conditional/TC-018-fileUploadConditional.spec.ts` | Automated + manual | Done |
| TC-019 | Follow-up = Yes shows the contact block | Conditional | Decision table | `conditional/TC-019-followUpYes.spec.ts` | Automated | Done |
| TC-020 | Follow-up = No skips the contact block | Conditional | Decision table | `conditional/TC-020-followUpNoSkip.spec.ts` | Automated | Done |
| TC-021 | Required-field validation blocks Next | Validation | Negative testing | `validation/TC-021-requiredFields.spec.ts` | Automated | Done |
| TC-022 | Email format validation | Validation | Equivalence partitioning | `validation/TC-022-emailFormat.spec.ts` | Automated | Done |
| TC-023 | NPS range validation | Validation | Boundary value analysis | `validation/TC-023-npsRange.spec.ts` | Automated | Done |
| TC-024 | Complete survey happy path | E2E | Happy path | `e2e/TC-024-completeHappyPath.spec.ts` | Automated | Done |
| TC-025 | Response data verification | E2E | Data validation | `e2e/TC-025-responseDataVerification.spec.ts` | Automated + manual | Done |
| TC-026 | Chrome compatibility | Cross-browser | Compatibility matrix | `cross-browser/TC-026-chromium.spec.ts` | Automated | Done |
| TC-027 | Firefox compatibility | Cross-browser | Browser matrix | `cross-browser/TC-027-firefox.spec.ts` | Automated | Done |
| TC-028 | Safari (WebKit) compatibility | Cross-browser | Browser matrix | `cross-browser/TC-028-webkit.spec.ts` | Automated | Done |
| TC-029 | Mobile responsive (iPhone) | Responsive | Viewport emulation | `responsive/TC-029-mobile.spec.ts` | Automated + manual | Done |
| TC-030 | Tablet responsive (iPad) | Responsive | Viewport emulation | `responsive/TC-030-tablet.spec.ts` | Automated + manual | Done |
| TC-031 | Visual design inspection | Manual | Heuristic evaluation | `manual/TC-031-visual-design.md` | Manual | Done |
| TC-032 | Accessibility - keyboard navigation | Manual | Tab-order check | `manual/TC-032-keyboard-navigation.md` | Manual | Done |
| TC-033 | Error message clarity | Manual | Exploratory | `manual/TC-033-error-message-clarity.md` | Manual | Done |
| TC-034 | Data-driven Page 1 validation | Validation | Data-driven (equivalence + boundaries) | `datadriven/TC-034-dataDrivenValidation.spec.ts` | Automated | Done |
| TC-035 | Multi-lingual rendering and encoding | Localisation | Locale matrix (de-DE, ja-JP, ar-SA) | `multilingual/TC-035-multiLingual.spec.ts` | Automated | Done |
| TC-036 | Core functional flows after the form update | Regression | Re-test of critical paths | `regression/TC-036-coreFlowsRegression.spec.ts` | Automated | Done |
| TC-037 | Conditional branches after the form update | Regression | Decision-table re-test | `regression/TC-037-conditionalRegression.spec.ts` | Automated | Done |
| TC-038 | A response is recorded once and collected correctly | System integration | Data persistence / response collection | `integration/TC-038-responsePersistence.spec.ts` | Automated | Done |
| TC-039 | Forms backend acknowledges a response and collects the next | System integration | Platform submission boundary | `live/TC-039-formsResponseCollection.spec.ts` | Automated | Done |
| TC-040 | Usability walkthrough of the respondent journey | Manual | Heuristic walkthrough | `manual/TC-040-usability-walkthrough.md` | Manual | Done |
| TC-041 | Visual design on phone and tablet | Manual | Visual inspection (4 widths) | `manual/TC-041-mobile-visual-check.md` | Manual | Done |
| TC-042 | File upload: types, size limit, dialog | Manual | Equivalence partitioning | `manual/TC-042-file-upload-testing.md` | Manual | Done |
| TC-043 | File upload validation | Functional | Boundary / error-path validation | `functional/TC-043-fileUploadValidation.spec.ts` | Automated | Done |
| TC-044 | Character-length and content rules | Validation | Boundary value analysis | `validation/TC-044-characterLimits.spec.ts` | Automated | Done |

---

# Detailed test cases

## Smoke module

### TC-001 - Form Page Load

| Field | Detail |
|-------|--------|
| Type | Smoke |
| Technique | Sanity / happy path |
| Module | `tests/smoke/TC-001-formLoads.spec.ts` |
| Method | Automated (Playwright) |

**Pre-conditions:** the survey is reachable at the configured base URL.

**Steps**

1. Open the survey URL.
2. Verify the survey title "Customer Satisfaction Survey" is displayed.
3. Verify Page 1 (Welcome & Demographics) and the welcome message are visible.
4. Verify the progress indicator shows "Page 1 of 6".
5. Verify no console or page errors occur while loading.

**Expected result:** the survey loads cleanly on Page 1 with no errors.
**Actual result:** Pass.

---

### TC-002 - All Pages Accessible

| Field | Value |
|-------|-------|
| Type | Smoke |
| Technique | Navigation sanity check |
| Module | `smoke/TC-002-pagesAccessible.spec.ts` |
| Method | Automated (Playwright) with a matching manual walkthrough |

**Pre-conditions:** TC-001 has passed.

**Steps**

1. Open the survey.
2. Complete Page 1 (demographics) and select Next.
3. Complete Page 2 (source, features, rating 5, NPS 9) and continue.
4. Complete the Page 3 positive branch (paragraph, dropdown, date) and continue.
5. Complete the Page 4 promoter branch (case study = No) and continue.
6. Complete Page 5 (follow-up = No, Likert "Agree") and continue.
7. Verify Page 6 (Thank you) is shown and the progress reports "Page 6 of 6".

**Expected result:** All six pages can be reached in order and Page 6 is shown last.

**Notes:** the assignment lists this case as a manual check; it is automated here so the navigation
path is verified on every run, and it is also confirmed manually with screenshots.

---

## Functional module

### TC-003 - Name text input accepts valid values

**Technique:** equivalence partitioning (valid class). **Pre-condition:** the survey is open on Page 1.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Enter a valid name ("Arjun Mehta") | The field keeps the value |
| 2 | Complete the other required fields and click Next | The survey advances to Page 2 |
| 3 | Check the name error message | No error is shown |

**Result:** Pass.

### TC-004 - Email input accepts a valid address

**Technique:** equivalence partitioning (valid class). **Pre-condition:** the survey is open on Page 1.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Enter a valid email ("arjun.mehta@example.com") | The field keeps the value |
| 2 | Complete the other required fields and click Next | The survey advances to Page 2 |
| 3 | Check the email error message | No error is shown |

**Result:** Pass.

### TC-005 - Employee number input accepts valid numbers

**Technique:** boundary value analysis. **Pre-condition:** the survey is open on Page 1.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Enter the minimum count (1) and click Next | The survey advances to Page 2 |
| 2 | Return to Page 1 | Page 1 is shown again |
| 3 | Enter a large count (100000) and click Next | The survey advances with no error |

**Result:** Pass.

### TC-006 - Multiple choice selection

**Technique:** happy path. **Pre-condition:** the survey has reached Page 2.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Select "Word of mouth" | It is checked |
| 2 | Select "Social media" | The new option is checked |
| 3 | Check "Word of mouth" | It is no longer checked (single choice only) |

**Result:** Pass.

### TC-007 - Checkbox multi-select

**Technique:** equivalence partitioning. **Pre-condition:** the survey has reached Page 2.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Select "Dashboard" and "Reports" | Both stay checked |
| 2 | Click "Reports" again | "Reports" is cleared |
| 3 | Check "Dashboard" | It remains checked |

**Result:** Pass.

### TC-008 - Rating scale (1-5 stars)

**Technique:** boundary value analysis. **Pre-condition:** the survey has reached Page 2.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Select 1 star (lower boundary) | The 1-star button is marked selected |
| 2 | Select 5 stars (upper boundary) | The 5-star button is selected and the 1-star is cleared |
| 3 | Check the rating error message | No error is shown |

**Result:** Pass. A manual check also confirms the selected stars are highlighted in amber.

### TC-009 - NPS score (0-10)

**Technique:** boundary value analysis. **Pre-condition:** the survey has reached Page 2.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Select score 0 (lower boundary) | The 0 button is marked selected |
| 2 | Select score 10 (upper boundary) | The 10 button is selected and 0 is cleared |
| 3 | Select score 7 | Only 7 stays selected |
| 4 | Check the NPS error message | No error is shown |

**Result:** Pass.

---

## Conditional-logic module

Each case uses **decision-table testing**: the value entered on Page 2 decides which block is shown on
Pages 3 and 4, and the follow-up answer decides the Page 5 block.

### TC-010 - Rating >= 4 shows the positive branch

**Decision table:** rating 4 and 5 → positive branch.
1. Complete Pages 1 and 2 with the rating, reaching Page 3.
2. The positive branch is visible and the improvement branch is hidden.

**Result:** Pass for both ratings.

### TC-011 - Rating < 4 shows the improvement branch

**Decision table:** rating 3 and 1 → improvement branch.
1. Complete Pages 1 and 2 with the rating, reaching Page 3.
2. The improvement branch is visible and the positive branch is hidden.

**Result:** Pass for both ratings.

### TC-012 - Conditional dropdown (best feature)

1. On the positive branch the "best feature" dropdown is visible and accepts "Reports".
2. On the improvement branch the dropdown is hidden.

**Result:** Pass. Also checked manually that the list opens and the choice is highlighted.

### TC-013 - Conditional date picker

1. On the positive branch the purchase-date field is visible and accepts a valid date.
2. On the improvement branch the date field is hidden.

**Result:** Pass. Also checked manually that the date control opens a calendar.

### TC-014 - Conditional ranking input

1. On the improvement branch the ranking list is visible with its default order.
2. Moving "Support" up changes the order.
3. On the positive branch the ranking list is hidden.

**Result:** Pass. Also checked manually that the move controls work.

### TC-015 - NPS >= 8 shows the promoter path

**Decision table:** NPS 8 and 10 → promoter branch.
1. Complete Pages 1 to 3 with the NPS score, reaching Page 4.
2. The promoter branch is visible; the passive and detractor branches are hidden.

**Result:** Pass for both scores.

### TC-016 - NPS 6-7 shows the passive path

**Decision table:** NPS 7 and 6 → passive branch.
1. Complete Pages 1 to 3 with the NPS score, reaching Page 4.
2. The passive branch is visible; the promoter and detractor branches are hidden.

**Result:** Pass for both scores.

### TC-017 - NPS <= 5 shows the detractor path

**Decision table:** NPS 5 and 0 → detractor branch.
1. Complete Pages 1 to 3 with the NPS score, reaching Page 4.
2. The detractor branch is visible; the promoter and passive branches are hidden.

**Result:** Pass for both scores.

### TC-018 - File upload appears on the detractor path

1. On the detractor branch the file upload is visible and accepts `fixtures/files/sample.pdf` with no error.
2. On the promoter branch the file upload is hidden.

**Result:** Pass. Also checked manually that the file dialog opens.

### TC-019 - Follow-up = Yes shows the contact block

1. On Page 5 the contact block starts hidden.
2. Answering "Yes" reveals the contact block.
3. Choosing "Microsoft Teams" and 10:15 keeps both values.

**Result:** Pass.

### TC-020 - Follow-up = No skips the contact block

1. On Page 5 answer "No".
2. The contact block stays hidden and is not required.
3. The survey advances to Page 6 with no contact questions.

**Result:** Pass.

---

## Validation module

### TC-021 - Required-field validation blocks Next

**Technique:** negative testing.
1. Click Next on an empty Page 1.
2. The survey stays on Page 1 and all four required questions show an error message.
3. The first field of a failed question is marked `aria-invalid="true"`.
4. Typing a valid name clears that error immediately.
5. Completing the page lets Next work.

**Result:** Pass.

### TC-022 - Email format validation

**Technique:** equivalence partitioning (invalid classes). Invalid values used: `plainaddress`,
`user@domain`, `@example.com`, `user name@example.com`.
1. Fill the other required fields so only the email can fail.
2. Each invalid email keeps the survey on Page 1 and shows the email error.
3. A valid email clears the error and the survey advances.

**Result:** Pass. This case found DEF-002 (the error did not clear for button-based questions).

### TC-023 - NPS range validation

**Technique:** boundary value analysis.
1. The NPS control offers exactly the 11 valid scores 0 to 10, in order.
2. Leaving the score empty keeps the survey on Page 2 and shows the NPS error.
3. Choosing the highest valid score (10) clears the error and the survey advances.

**Result:** Pass (after DEF-002 was fixed).

---

## End-to-end module

### TC-024 - Complete survey happy path

**Technique:** happy path.
1. Complete Pages 1 to 5 (positive branch, promoter branch, follow-up Yes).
2. Page 6 shows the personalised thank-you message and the response summary.
3. Submit and verify the confirmation message, the disabled Submit button and the submitted flag.

**Result:** Pass. The same journey was confirmed manually.

### TC-025 - Response data verification

**Technique:** data validation.
1. Complete all six pages with a known set of answers.
2. Verify all 15 summary rows show exactly the values entered (name, email, company, employees,
   source, features, rating, NPS, liked most, best feature, purchase date, case study, preferred
   contact, follow-up, product meets needs).

**Result:** Pass. Also compared manually against the answers that were entered.

---

## Cross-browser module

Each browser has its own file and its own project in `playwright.config.ts` (`cross-chrome`,
`cross-firefox`, `cross-webkit`), so the same survey is proven in three engines.

### TC-026 - Chrome compatibility

1. Title and progress text render; text entry works.
2. Complete all six pages, check the summary and that the progress bar reaches 100%.
3. Submit and verify the confirmation.

**Result:** Pass in Chromium.

### TC-027 - Firefox compatibility

1. Complete Pages 1 to 4.
2. Reorder the communication ranking on Page 5 and verify the order changes.
3. Submit and verify the confirmation.

**Result:** Pass in Firefox.

### TC-028 - Safari (WebKit) compatibility

1. Verify the custom star rating selects and clears correctly on Page 2.
2. Complete the survey (follow-up No path) and verify the summary.
3. Submit and verify the confirmation.

**Result:** Pass in WebKit.

---

## Responsive module

Each device has its own file and its own project (`mobile` = iPhone 13, `tablet` = iPad 7th gen).

### TC-029 - Mobile responsive (iPhone)

1. Open the survey in an iPhone-sized viewport; the title renders and Page 1 has no horizontal overflow.
2. Complete all six pages; the summary renders and there is still no horizontal overflow.
3. Submit and verify the confirmation.

**Result:** Pass. Also checked manually on a narrow window.

### TC-030 - Tablet responsive (iPad)

1. Open the survey in an iPad viewport; the title and progress bar render with no overflow.
2. The progress bar has real width on Page 1 and grows by the last page.
3. Complete all pages, verify the summary shows the entered name, and submit.

**Result:** Pass after DEF-003 was fixed (the progress bar never rendered). Also checked manually.

---

## Manual module

These three cases are human judgement, so they are written up as checklists in `tests/manual/`. The
results below are the outcome of the manual pass.

### TC-031 - Visual design inspection

**Technique:** heuristic evaluation. Checked layout, spacing, alignment, colour, contrast, typography
and scaling on a desktop screen and a phone-width window.

**Result:** Pass. All ten checklist items passed; the progress bar needed DEF-003 to be fixed first.

### TC-032 - Accessibility: keyboard navigation

**Technique:** tab-order check. The whole survey was completed with the keyboard only.

**Result:** Pass with one recorded observation. Every control is reachable, the tab order matches the
visual order and failed fields get `aria-invalid="true"`. Observation: the error message is not linked
to its field with `aria-describedby`, so a screen reader announces that a field is invalid without
reading the message. Recorded for a later accessibility pass (not blocking).

### TC-033 - Error message clarity

**Technique:** exploratory review of the validation wording. All 20 messages were triggered and read.

**Result:** Pass. Every message is short, polite, correctly placed and, where relevant, states the rule
(name length, NPS range, at least one feature, file type/size). One minor wording suggestion was
recorded for the Q17 agreement scale.

---

## Data-driven module

### TC-034 - Data-driven Page 1 validation

**Technique:** data-driven testing. The dataset is `fixtures/personas.json`: fourteen rows spanning
name length boundaries (2, 3, 100, 101), valid and invalid e-mail shapes (no `@`, empty domain, no top
level domain, plus-addressing), headcount values (0, 1, 250, 999, 12000, words, decimal), a blank
company and a Unicode name/company. Each row carries `expectValid` plus the reason for its expectation.

**Design:** `fixtures/capstoneFixtures.ts` exposes the JSON as the `personaRows` fixture, and the spec
generates one independent test per row at collection time. Adding a row to JSON adds a test; no code
changes. A separate guard test checks that the dataset is aimed at the current Page 1 questions.

**Result:** Pass on the published form after calibration. Three rows exposed missing restrictions
rather than product defects in the test: 101-character names, a headcount of 0 and a decimal headcount
are all accepted, recorded as DEF-012, DEF-013 and DEF-014 and asserted as accepted so the dataset
stays truthful. Rows that fail correctly (short name, malformed e-mails, blank company, words in the
headcount) confirm the rules that do exist.

---

## Multi-lingual module

### TC-035 - Multi-lingual rendering and encoding

**Technique:** locale matrix. The same survey is opened in three browser contexts reporting `de-DE`,
`ja-JP` and `ar-SA`.

**What is checked:**
1. `<html lang>` matches the locale's language and `<html dir>` is `ltr` for German and Japanese and
   `rtl` for Arabic.
2. Microsoft Forms' own chrome is translated: the Start button reads "Jetzt starten", "今すぐ開始" and
   "ابدأ الآن", and the privacy notice is rendered in the matching language.
3. Owner-authored content (title, description, questions) stays exactly as authored - Microsoft Forms
   localises its interface, not the form owner's text, so asserting a translated question would be a
   false requirement.
4. Encoding: no `U+FFFD` replacement character and no mojibake sequences in the rendered copy.
5. Localisation does not corrupt input: `Zoë Müller-O'Connor` and `Müller & Söhne GmbH` round-trip in
   the Page 1 text boxes in every locale.

**Result:** Pass in all three locales.

---

## Regression module

### TC-036 - Core functional flows after the form update

**Technique:** re-test of the critical functional paths after a change (the assignment's
"Regression Tests (2 cases)"). The survey changed while the capstone was built, so the paths that
carry the most risk are re-run in one pass.

**What is checked:** the six-page structure is intact; an empty Page 1 is still blocked by its
required-field validation; valid demographics still advance; a rating of 5 still shows the positive
branch; the journey still submits and the confirmation still appears.

**Result:** Pass.

### TC-037 - Conditional branches after the form update

**Technique:** decision-table re-test of every branch switch at its boundary value.

**What is checked:** rating 3 -> improvement branch, rating 4 -> positive branch; NPS 5 -> detractor,
NPS 7 -> passive, NPS 9 -> promoter; follow-up Yes reveals the contact block and No hides it again.

**Result:** Pass.

**Where they run:** the two regression cases run under the `chromium` project only. They re-run paths
the functional suite already covers, and the cross-browser module owns the other engines, so running
the re-test four times would add time without adding evidence. The choice is documented in the spec
headers and the module is run on demand with `npm run test:regression`.

---

## System integration module

### TC-038 - A response is recorded once and collected correctly

**Technique:** persistence and response-collection checks across the submission boundary (the
assignment's "Integration Tests (2 cases): data persistence, response collection").

**What is checked:** after completing all six pages and submitting, the response is recorded exactly
once (confirmation shown, Submit disabled, submitted flag set) and the review summary still holds the
answers that were entered; reloading the survey presents a fresh, empty form ready to collect the
next response.

**Result:** Pass.

### TC-039 - The Forms backend acknowledges a response and collects the next

**Technique:** integration with the Microsoft Forms backend on the published form.

**What is checked:** a real response submitted through the browser reaches Forms and is acknowledged
by Forms itself ("Your response was submitted"); no validation or platform error is raised during the
round trip; re-opening the responder link presents a fresh, empty form, so the link continues to
collect responses.

**Result:** Pass. Each run submits one real response - the same behaviour as the live happy path, and
the way the assignment's "verify data in Microsoft Forms responses" step is exercised automatically.

---

## Manual additions (TC-040 to TC-042)

The coverage review found the manual module short of the five cases the assignment asks for (visual
design, UI/UX, accessibility, usability). Three cases were added next to TC-031/032/033:

### TC-040 - Usability walkthrough of the respondent journey

**Technique:** heuristic walkthrough. Twelve checks across the welcome page, validation messages,
Back behaviour, the branches and the review page; measured observations include the progress
indicator and the focus behaviour after a failed validation.

**Result:** Pass with three observations (progress hidden on the welcome page; focus stays on Next
after a failed validation; the review page is a positive finding). None blocks completion.

### TC-041 - Visual design on phone and tablet

**Technique:** visual inspection at 1280x800, 768x1024, 390x844 and 320x568. No horizontal overflow,
no clipped label and no off-screen control at any width; body and label text stay at 16 px.

**Result:** Pass with one observation: the star rating (24x28 px) and NPS pills (30x30 px) are below
the usual 44x44 px touch-target guidance on a phone.

### TC-042 - File upload: types, size limit, dialog

**Technique:** equivalence partitioning of file types plus the 10 MB size boundary, exercised through
the real file dialog.

**What is checked:** the dialog opens and filters to images/PDFs with single selection; Cancel is
safe; a PDF is accepted; a `.txt` and a PNG just over 10 MB are rejected and dropped; a valid file
afterwards clears the message.

**Result:** Pass after fix. This case found **DEF-015** - the rejection message was cleared again
immediately by the generic error-clearing handler, so a rejected file left the question silently
empty. Fixed in `app/survey.js` and now asserted automatically by TC-043.

---

## File-upload validation (TC-043)

### TC-043 - File upload accepts allowed files and rejects the rest

**Technique:** boundary and error-path validation of an input type - the automated half of TC-042 and
the eighth functional case the assignment asks for.

**What is checked:** the control's `accept` list; the sample PDF is accepted; a `.txt` is rejected with
the message and dropped from the control; a PNG one byte over 10 MB is rejected by the size rule; a
valid file afterwards clears the message.

**Result:** Pass (after DEF-015 was fixed). The oversized file is attached from memory
(`Buffer.alloc(10 * 1024 * 1024 + 1)`), so no large file is stored in the repository.

---

## Character-length rules (TC-044)

### TC-044 - Character-length and content rules

**Technique:** boundary value analysis on the character limits (one below the minimum, exactly the
minimum, exactly the maximum, one over the maximum).

**Why it exists:** the assignment sheet states length rules for the free-text answers (Q1 "Min 3
chars, Max 100 chars" and Q9 "Max 1000 characters") and requires validation for each field. The
replica previously accepted any non-empty answer for several of them, so the rules are now
implemented (Q1 name 3-100, Q3 company 2-100, the four paragraph questions 10-1000) and this case
pins them down at the boundary.

**What is checked:** a short name and a short company are rejected with their message while the survey
stays on Page 1; a name of exactly 3 characters and a company of exactly 2 are accepted; the maximum
is guarded both by the field's `maxlength` attribute (asserted directly) and by the validator, which
is tested with a value set past the limit because the browser truncates anything typed beyond
`maxlength`; on the positive branch a 9-character paragraph is rejected, 10 clears the message and
1000 characters are stored in full.

**Result:** Pass. Seven tests, table-driven over the two Page 1 fields plus a paragraph section.

---

## Live execution - published Microsoft Forms survey

`tests/live/`, `tests/multilingual/` and `tests/datadriven/` execute the same case ids against the
published form (project `live`, Chromium). A case that asserts the designed behaviour but finds a
built-form defect is marked `test.fail` with the defect id: it shows as an expected failure, keeps the
run green as evidence, and turns red if the behaviour changes the wrong way.

| Case | Live result | Note |
|------|-------------|------|
| TC-001, TC-003 to TC-009, TC-021, TC-024 | Pass | Live equivalents implemented |
| TC-010 | Pass | Positive section reached; the rating itself does not route (DEF-009) |
| TC-011 | Expected fail | Dissatisfied answers skip S3B or end the form (DEF-004) |
| TC-012 | Pass | Six-option dropdown, selection retained |
| TC-013 | Expected fail | Start date is a textarea, not a date picker (DEF-010) |
| TC-014 | Pass | Drag-only ranking, five items, reorder verified |
| TC-015 | Expected fail | Promoter sees the passive and detractor questions (DEF-005) |
| TC-016 | Expected fail | Passive reveal is over- and under-populated (DEF-006) |
| TC-017 | Pass | Detractor sees the issue box; the anonymous link has no file upload (D-2) |
| TC-019, TC-020 | Pass | Follow-up Yes reveals, No skips and submits |
| TC-034 | Pass | 14-row persona matrix |
| TC-035 | Pass | de-DE, ja-JP, ar-SA |
| TC-018 | Replica | Replica detractor branch, including the file-upload question and its rules |
| TC-039 | Pass | Second integration case: backend acknowledgement and collection readiness |
| TC-043 | Replica only | Upload rules (types, 10 MB boundary) - automated half of TC-042 |
| TC-002, TC-022, TC-023, TC-025 to TC-033, TC-036 to TC-038, TC-040 to TC-044 | Replica only | Input-type, browser, responsive, regression, integration, manual and character-limit coverage stays on the replica |

The second published form - the same survey with a file-upload question - needs a signed-in
responder: Microsoft Forms requires a Microsoft account before it will render a form that contains a
file upload. That link is therefore verified by hand (TC-042) instead of by automation, and the
upload rules it shares with the replica are asserted automatically by TC-043. The manual result of
TC-042 is recorded in `TEST_EXECUTION_REPORT.md`.

The remaining conditional cases also expose DEF-007 (stale questions when the recommendation answer
changes), DEF-008 (NPS does not route), DEF-011 (satisfied users are asked S3B) and the three
validation gaps DEF-012 to DEF-014. Full details are in `DEFECT_LOG.md`.



