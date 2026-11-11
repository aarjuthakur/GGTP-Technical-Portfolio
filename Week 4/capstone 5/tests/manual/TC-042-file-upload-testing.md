# TC-042 - File upload: file types, size limit and the file dialog

| Field | Detail |
|-------|--------|
| Type | Manual |
| Technique | Equivalence partitioning of file types and the size boundary |
| Module | manual |
| Method | Manual (file dialog pass) with the automated counterpart in TC-043 |
| Executed by | QA (manual pass) |
| Environment | Local replica, Chromium, Windows file dialog |

## Description

Exercise the upload question the way a respondent does - through the real file dialog - and check
what happens with a PDF, an image, a disallowed file type (a .txt), and a file just over the 10 MB
limit. Confirm the message the respondent sees, that a rejected file is dropped, and that a valid
file afterwards recovers cleanly. TC-043 asserts the same rules automatically; this case records the
dialog behaviour (opens, single file only, Cancel is safe) that a script cannot show.

## Pre-conditions

- The survey is running locally.
- The upload question is on the detractor branch: complete Page 1, Page 2 with rating 5 and NPS 5,
  then Page 3 (positive branch) to reach it.
- Test files available: `fixtures/files/sample.pdf`, a `.txt` file, and an image larger than 10 MB.

## Steps

1. Reach Page 4 on the detractor branch and confirm the upload question is visible and marked
   optional.
2. Click the upload control and confirm the Windows file dialog opens, offering images and PDFs only,
   with a single-file selection.
3. Press Cancel and confirm no error appears and nothing is attached.
4. Choose the sample PDF; confirm it is accepted and no message is shown.
5. Choose the `.txt` file; read the message and confirm the control no longer holds the file.
6. Choose the image larger than 10 MB; read the message and confirm the file is dropped.
7. Choose the sample PDF again; confirm the message disappears and the file stays attached.

## Findings

| # | Check | Result |
|---|-------|--------|
| 1 | The upload question is visible on the detractor branch and labelled "(optional)" | Pass |
| 2 | Clicking the control opens the system file dialog | Pass |
| 3 | The dialog filters to images and PDFs (`accept="image/*,.pdf"`) | Pass |
| 4 | Only one file can be chosen (no `multiple` attribute, `isMultiple() = false`) | Pass |
| 5 | Cancel closes the dialog with no error and no attachment | Pass |
| 6 | The sample PDF is accepted without a message | Pass |
| 7 | A `.txt` file is rejected with "File type not allowed or file is too large." and dropped | Defect found, fixed (DEF-015) |
| 8 | A PNG just over 10 MB is rejected with the same message and dropped | Defect found, fixed (DEF-015) |
| 9 | A valid PDF afterwards clears the message and stays attached | Pass |

## Observations

- The file dialog is the normal Windows dialog and shows the expected filter, so a respondent cannot
  pick the wrong type by mistake; the typed-file check still matters because files can be dragged in
  or chosen with "All files".
- **DEF-015 (found during this pass, fixed):** the rejection message was raised by the upload
  handler and then immediately cleared by the generic "clear the error when the answer changes"
  handler, so a rejected file left the question silently empty. Fixed in `app/survey.js` by letting
  the file input own its message; retested here and by TC-043, where the message now stays visible
  and the file is dropped.
- The message is the same for a bad type and an oversized file. That is acceptable for a short
  survey, but a message that says which rule failed would be kinder; recorded as an improvement.
- The question is optional on the detractor branch, so a rejected file never blocks the respondent
  from continuing.

## Workflow - how this test works

```
reach the detractor branch (Page 1 -> Page 2 rating 5 / NPS 5 -> Page 3 positive -> Page 4)
  -> click the upload control and inspect the system file dialog (filter, single selection)
  -> Cancel and confirm nothing is attached or reported
  -> attach sample.pdf and confirm acceptance
  -> attach a .txt file and read the rejection message; confirm the file is dropped
  -> attach a PNG just over 10 MB and read the rejection message; confirm the file is dropped
  -> attach sample.pdf again and confirm the message clears
  -> record the dialog behaviour and any defect found (DEF-015)
```

## Result

**Pass after fix.** The upload rules work as designed; the pass found DEF-015 (rejection message
cleared immediately), which was fixed and retested, and recorded one improvement to the message
wording.
