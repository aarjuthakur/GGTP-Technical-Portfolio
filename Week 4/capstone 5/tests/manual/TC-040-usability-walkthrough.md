# TC-040 - Usability walkthrough of the respondent journey

| Field | Detail |
|-------|--------|
| Type | Manual |
| Technique | Heuristic usability walkthrough (exploratory pass) |
| Module | manual |
| Method | Manual (guided walkthrough) with measured observations |
| Executed by | QA (manual pass) |
| Environment | Local replica, Chromium, desktop 1280x800 |

## Description

Walk the survey the way a real respondent would - welcome page, demographics, the product-usage and
feedback pages, the review, and submission - and judge the experience: is the purpose clear, is the
flow predictable, are the messages understandable, and does the respondent always know what to do
next? The walkthrough records what was seen, not just whether the code works.

## Pre-conditions

- The survey is running locally (`npm run serve`).
- The browser console is open so unexpected errors are noticed.

## Steps

1. Open the survey and read the welcome page: is the purpose and the effort clear from the page alone?
2. Advance with no answers and read every validation message.
3. Correct the fields one by one and watch the messages clear.
4. Complete Page 2 and check the wording of the questions, including the multi-choice hint.
5. Use Back and confirm the answers are still there.
6. Follow a rating-5 / NPS-5 path and confirm the branches shown match the answers given.
7. Read the review page and submit.
8. Record every point where the respondent could hesitate, plus any console error.

## Findings

| # | Check | Result |
|---|-------|--------|
| 1 | The welcome page states the purpose and the effort ("a few minutes") | Pass |
| 2 | Every page has a short heading that names the step ("Welcome & Demographics", "Product Usage", "Preferences & Follow-up") | Pass |
| 3 | A progress indicator tells the respondent where they are | Pass, with observation |
| 4 | One clear primary action per page ("Next"), with "Back" available | Pass |
| 5 | Required questions are marked with `*` | Pass |
| 6 | Validation messages name the problem and sit next to the field | Pass |
| 7 | A message disappears as soon as the answer is corrected | Pass |
| 8 | "Back" keeps the answers already given on the previous page | Pass |
| 9 | The branch shown matches the answers (rating 5 -> positive page; NPS 5 -> detractor questions) | Pass |
| 10 | The review page repeats the answers before the response is submitted (15 summary rows, named "Thank you, QA Manual!") | Pass |
| 11 | No unexpected browser console error during the walkthrough | Pass |
| 12 | After a failed "Next", focus moves to the first invalid field | Not met |

## Observations

- Progress: the indicator is hidden on the welcome page and appears from Page 2 as "Page 2 of 6".
  That is coherent (nothing to measure before the survey starts), but the respondent only learns the
  length of the survey after starting. Suggestion: show "Page 1 of 6" from the first question.
- Observation (accessibility, not blocking): after a failed "Next", focus stays on the Next button.
  The messages are visible and each invalid field is marked `aria-invalid="true"` (TC-032), but a
  keyboard or screen-reader user has to navigate back to find them. Suggestion: move focus to the
  first invalid field when validation fails.
- Multi-choice questions say "(Select all that apply)" in the label, so the checkbox behaviour needs
  no explanation; no extra help text is needed on the other questions.
- The review page is genuinely useful: it presents every answer plus a Submit button, so the
  respondent can go Back and correct something before submitting.

## Workflow - how this test works

```
open the survey at desktop size
  -> read the welcome page (purpose, effort, progress state)
  -> advance empty and read every validation message
  -> correct the fields and watch each message clear
  -> complete Pages 1-2 and read the question wording
  -> press Back and inspect the preserved answers
  -> follow rating 5 / NPS 5 and inspect the branches shown
  -> read the review page, submit, and check the confirmation
  -> list every usability observation and any console error
```

## Result

**Pass with three recorded observations.** The journey is clear and completable without guessing;
the progress indicator and the focus behaviour after a failed validation are recorded as
improvements, not blocking defects.
