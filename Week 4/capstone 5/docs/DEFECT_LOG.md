# Defect Log

Defects found while building and running the test suite. Each entry records what was wrong, how it was
reproduced, the severity and the current status.

**Severity:** Critical · Major · Minor · Low
**Status:** Open · Fixed · Retest passed · Closed

---

## DEF-001 - Option locator used the display label instead of the slug

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-001 |
| **Title** | "How did you hear about us" option could not be located |
| **Module** | Smoke (TC-002) |
| **Severity** | Major (test blocked on that step) |
| **Status** | Closed - fixed and retested |
| **Found in** | `pages/PageProductUsage.ts` |

**Description**
The page object built the option locator from the human-readable label, producing
`q5-source-Word of mouth`, but the application exposes `data-testid="q5-source-word-of-mouth"`.
The click waited for a locator that never appeared, so TC-002 failed.

**Steps to reproduce**
1. Run `npx playwright test tests/smoke --project=chromium`.
2. TC-001 passes; TC-002 fails while selecting the source option.

**Expected**
The option for "Word of mouth" is selected.

**Actual**
The locator `q5-source-Word of mouth` never resolves; the test fails.

**Fix**
The page object now converts the label with the shared `slug()` helper for both the source option and
the feature checkboxes, so `Word of mouth` becomes `word-of-mouth`.

**Retest**
`npx playwright test tests/smoke --project=chromium` -> 2 passed.

---

## DEF-002 - Validation message did not clear for button-based questions

| Field | Detail |
|-------|--------|
| Severity | Minor |
| Status | Fixed · Retest passed |
| Found in | `app/survey.js` (`wireChoiceGroup`) |
| Found by | TC-023 (NPS range validation) |

**Description**
Text inputs cleared their validation message as soon as the user corrected them, but the button-based
questions (the star rating, the NPS score and the Yes/No groups) did not. After clicking Next with a
score missing, the error message stayed on screen after the user chose a score, and only disappeared
when Next was clicked again.

**Steps to reproduce**

1. Complete Page 1 and reach Page 2.
2. Answer everything except the NPS score and click Next.
3. The NPS error message is shown (correct).
4. Choose an NPS score.

**Expected result:** the error message clears as soon as a score is chosen, matching the text inputs.

**Actual result:** the error message remained visible until Next was clicked a second time.

**Fix**
`wireChoiceGroup` now clears the error of the question it belongs to as soon as an option is chosen,
so every question type behaves the same way.

**Retest**
`npx playwright test --project=chromium` -> 23 passed.

---

## DEF-003 - Progress bar never displayed

| Field | Detail |
|-------|--------|
| Severity | Minor |
| Status | Fixed · Retest passed |
| Found in | `app/styles.css` (`.progress .bar-fill`) |
| Found by | TC-030 (tablet responsive) |

**Description**
The progress fill element is a `<span>`, which is an inline element. Its `width` and `height` styles
(and the width the script sets as the user moves through the pages) had no effect on an inline
element, so the coloured progress bar was never actually drawn. Only the text "Page N of 6" showed
progress.

**Steps to reproduce**

1. Open the survey.
2. Look at the progress area at the top of the page.

**Expected result:** a coloured bar that grows as the user moves from Page 1 to Page 6.

**Actual result:** no bar was visible at all.

**Fix**
`.bar-fill` now uses `display: block`, so its width and height apply and the bar renders and grows.

**Retest**
`npx playwright test tests/responsive --project=mobile --project=tablet` -> 2 passed; TC-030 now also
checks that the bar has a real width on Page 1 and grows by the last page.

---

---

## DEF-004 - Dissatisfied answers never reach the improvement section

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-004 |
| **Title** | S3B Help Us Improve is unreachable from a dissatisfied answer |
| **Module** | Conditional - published form, Page 2 -> Pages 3-5 (TC-011) |
| **Severity** | Major (the improvement branch is dead) |
| **Status** | Open - documented by an expected-failure test |
| **Found in** | Published Microsoft Forms survey, satisfaction question (Q11) |

**Description**
The design sends every answer below "satisfied" to S3B, where the respondent explains what is wrong.
The built form routes differently for each dissatisfied answer: "Neither" and "Somewhat dissatisfied"
skip S3B and land on the Recommendation page, while "Very dissatisfied" replaces Next with Submit on
Page 2 and ends the survey. No dissatisfied answer ever sees S3B.

**Steps to reproduce**
1. Complete Pages 1 and 2 and choose "Neither satisfied nor dissatisfied" (or "Somewhat dissatisfied").
2. Press Next - the form opens Page 5, Recommendation.
3. Repeat with "Very dissatisfied" - Page 2 now offers Submit instead of Next.

**Expected:** S3B Help Us Improve is shown for every answer below "satisfied".
**Actual:** Recommendation or immediate submission; S3B is skipped.

**Automated evidence:** TC-011, two tests marked `test.fail` with this defect id.

---

## DEF-005 - Promoter branch shows the passive and detractor questions

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-005 |
| **Title** | Case-study question is never shown to a promoter |
| **Module** | Conditional - published form, Recommendation (TC-015) |
| **Severity** | Major |
| **Status** | Open - documented by an expected-failure test |
| **Found in** | Published form, "How likely are you to recommend us to a colleague?" |

**Description**
Answering "Very likely" or "Somewhat likely" reveals "What would make us a 10 for you?" and "Please
describe the issue". The designed promoter question - "Would you be interested in being featured in a
customer case study?" - is not shown at all, so a delighted customer is asked to complain instead of
being invited to a case study.

**Steps to reproduce**
1. Complete Pages 1 to 4 on the positive path.
2. On Page 5 choose "Very likely".
3. Observe the revealed questions.

**Expected:** the case-study question, and only that question.
**Actual:** the passive suggestion and the detractor issue box.

**Automated evidence:** TC-015 (`test.fail`, DEF-005). The same reveal is recorded in TC-024's notes.

---

## DEF-006 - Passive branch is over- and under-populated

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-006 |
| **Title** | Passive answers show the wrong combination of follow-up questions |
| **Module** | Conditional - published form, Recommendation (TC-016) |
| **Severity** | Major |
| **Status** | Open - documented by expected-failure tests |
| **Found in** | Published form, recommendation question |

**Description**
"Neither likely nor unlikely" reveals the case study, the suggestion box and the issue box together.
"Somewhat unlikely" reveals only the detractor issue box and hides the suggestion. The passive branch
therefore cannot be answered as designed in either case.

**Steps to reproduce**
1. Complete Pages 1 to 4 and open Page 5.
2. Choose "Neither likely nor unlikely" - three questions appear.
3. Change the answer to "Somewhat unlikely" - the suggestion disappears and the issue box remains.

**Expected:** only "What would make us a 10 for you?" for both passive answers.
**Actual:** all three questions, or only the issue box.

**Automated evidence:** TC-016, two tests marked `test.fail`.

---

## DEF-007 - Changing the recommendation answer keeps stale questions

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-007 |
| **Title** | Conditional questions are added but never removed when the answer changes |
| **Module** | Conditional - published form, Recommendation (TC-015/TC-016 exploratory) |
| **Severity** | Major (answers from a previous branch can be submitted) |
| **Status** | Open |
| **Found in** | Published form, Page 5 |

**Description**
The branch reveal is additive. Selecting "Somewhat likely" shows the suggestion and issue boxes;
changing the answer to "Neither likely nor unlikely" adds the case-study question but leaves the two
earlier questions on screen. A respondent who corrects their answer is asked to complete questions
that no longer belong to their branch, and their answers are submitted with the response.

**Steps to reproduce**
1. Reach Page 5.
2. Choose "Somewhat likely" (two questions appear).
3. Change the answer to "Neither likely nor unlikely".
4. All three questions are now present.

**Expected:** the question set is recomputed from the current answer.
**Actual:** previous branch questions persist.

---

## DEF-008 - The Page 2 NPS score does not drive any branch

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-008 |
| **Title** | NPS score is collected but never used for routing |
| **Module** | Conditional - published form, Page 2 (TC-015 to TC-017) |
| **Severity** | Major |
| **Status** | Open |
| **Found in** | Published form, Q10 "How likely are you to recommend us to a friend or colleague?" |

**Description**
Decision-table TC-015 to TC-017 expect the NPS answer to select the promoter, passive or detractor
branch. On the published form the NPS score has no branching rule; Page 5 is reached regardless of
the score and the branch is chosen by a second recommendation question ("How likely are you to
recommend us to a colleague?"). This is the Microsoft Forms limitation that a section can only have
one effective branch, and the branching question that comes last wins.

**Evidence:** NPS 0, 4, 6 and 10 all reach the same Page 5; changing the NPS value changes nothing.

---

## DEF-009 - The rating question does not drive any branch

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-009 |
| **Title** | Star rating is collected but routing uses the satisfaction answer instead |
| **Module** | Conditional - published form, Page 2 (TC-010/TC-011) |
| **Severity** | Major |
| **Status** | Open |
| **Found in** | Published form, Q9 "Rate your overall experience" and Q11 satisfaction |

**Description**
TC-010 and TC-011 expect rating 4-5 to open S3A and rating 1-3 to open S3B. The published form
branches on Q11 ("Overall, how satisfied are you with us?") instead. Rating 1 with "Very satisfied"
still opens S3A, and rating 4 with "Very dissatisfied" still ends the form. The rating is recorded
but has no effect on the journey.

**Automated evidence:** TC-010 passes only because satisfaction is positive; the isolation case is
described in its header and in TC-011.

---

## DEF-010 - "When did you start using our product?" is a text box, not a date picker

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-010 |
| **Title** | Date question implemented as multi-line text |
| **Module** | Conditional - published form, S3A (TC-013) |
| **Severity** | Major (free text where a validated date was required) |
| **Status** | Open - documented by an expected-failure test |
| **Found in** | Published form, Q14 |

**Description**
The design and TC-013 require a date picker. The built question renders a textarea, so any text is
accepted and no date format is enforced. The same form renders Q8 ("When did you become a customer?")
as a proper date picker, which proves the control is available.

**Automated evidence:** TC-013 (`test.fail`, DEF-010) first proves the value is retained, then fails
on the missing date-picker combobox.

---

## DEF-011 - Satisfied respondents are asked why they are not satisfied

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-011 |
| **Title** | Positive path falls through S3A into S3B |
| **Module** | Conditional - published form, S3A -> S3B (TC-010/TC-024) |
| **Severity** | Major |
| **Status** | Open |
| **Found in** | Published form, sections S3A and S3B |

**Description**
A satisfied respondent completes S3A and is then shown S3B, which begins "Why are you not fully
satisfied?". The two sections are not mutually exclusive: S3A is followed by S3B instead of S3B being
the alternative branch. The respondent is asked to justify a dissatisfaction they have not expressed.

**Steps to reproduce**
1. Answer Page 2 with "Very satisfied".
2. Complete S3A and press Next.

**Expected:** the Recommendation page.
**Actual:** S3B Help Us Improve ("Why are you not fully satisfied?").

**Automated evidence:** TC-024 records S3B on the satisfied journey; TC-014 relies on it to reach the
ranking. The expectation is called out in both headers.

---

## DEF-012 - The name field has no maximum length

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-012 |
| **Title** | 101-character name is accepted |
| **Module** | Validation - published form, Page 1 (TC-034 / DD-05) |
| **Severity** | Minor |
| **Status** | Open - dataset calibrated to the actual rule |
| **Found in** | Published form, Q1 "What is your full name?" (rule 10 = minimum length 3) |

**Description**
Only a 3-character minimum is configured. The design assumed a 100-character maximum, so a
101-character name is accepted and stored. `personas.json` row DD-05 now expects the row to pass and
points at this defect, so the dataset stays truthful instead of failing on a missing rule.

---

## DEF-013 - Headcount accepts zero

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-013 |
| **Title** | A company with 0 employees passes validation |
| **Module** | Validation - published form, Page 1 (TC-034 / DD-10) |
| **Severity** | Minor |
| **Status** | Open - dataset calibrated to the actual rule |
| **Found in** | Published form, Q4 (rule 0 = number) |

**Description**
The number rule checks the format only; there is no lower bound, so "0" is accepted. The design
requires a positive whole number of employees.

---

## DEF-014 - Headcount accepts decimals

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-014 |
| **Title** | "25.5" is accepted as an employee count |
| **Module** | Validation - published form, Page 1 (TC-034 / DD-12) |
| **Severity** | Minor |
| **Status** | Open - dataset calibrated to the actual rule |
| **Found in** | Published form, Q4 (rule 0 = number) |

**Description**
The number rule allows fractional values, so "25.5" is stored as an employee count. The design asks
for whole employees only. Rows DD-10 and DD-12 in `personas.json` now assert the actual behaviour and
reference this defect and DEF-013.

---

## DEF-015 - File-upload rejection message was cleared immediately

| Field | Detail |
|-------|--------|
| **Defect ID** | DEF-015 |
| **Title** | A rejected file left the upload question silently empty - the message never stayed on screen |
| **Module** | Replica, Page 4 detractor branch (file upload) - TC-042 (manual), TC-043 (automated) |
| **Severity** | Major |
| **Status** | Fixed and retested |
| **Found in** | Local replica (`app/survey.js`), found while writing the manual upload pass |

**Description**
`wireFileValidation()` rejected a disallowed or oversized file and set the message
"File type not allowed or file is too large." on, and then a second, generic handler
(`document`-level `input` and `change`, which clears a question's message as soon as its answer
changes) ran in the same event and hid the message again. The result: the file was dropped from the
control and the respondent saw nothing at all - no file, no error.

**Reproduction**
1. Reach Page 4 on the detractor branch (rating 5 then NPS 5).
2. Attach a `.txt` file through the file control.
3. Observed: the control emptied itself, and `[data-testid="error-q12c"]` had `hidden` set again
   immediately. The same happened with a PNG one byte over 10 MB.

**Root cause**
Two handlers fight over the same message on the same event: the generic rule assumes the answer is
now valid once the value changed, but for the file input the value changes precisely when the file is
rejected.

**Fix**
The generic handler now skips file inputs (`app/survey.js`), so the question's message is owned by
`wireFileValidation()` alone. Verified: the `.txt` and the oversized PNG now show the message and are
dropped, and attaching a valid PDF afterwards clears it.

**Retest**
TC-043 (automated, Chromium/Firefox/WebKit/Edge) and TC-042 (manual pass) both pass. The retest
covers the type rule, the 10 MB boundary and the recovery path.

---

## Summary

| Severity | Open | Fixed | Closed |
|----------|------|-------|--------|
| Critical | 0 | 0 | 0 |
| Major | 8 | 1 | 1 |
| Minor | 3 | 2 | 0 |
| Low | 0 | 0 | 0 |

Major (open): DEF-004 to DEF-011. Minor (open): DEF-012, DEF-013, DEF-014.
Fixed/closed: DEF-001 (closed), DEF-002, DEF-003 and DEF-015 (fixed and retested).
The open defects belong to the published Microsoft Forms survey; the fixed ones belong to the local
replica. They are kept in one log because both are test objects of this project.

