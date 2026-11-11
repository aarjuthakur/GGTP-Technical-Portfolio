# TC-031 - Visual design inspection

| Field | Detail |
|-------|--------|
| Type | Manual |
| Technique | Heuristic evaluation |
| Module | manual |
| Method | Manual (visual inspection) |
| Executed by | QA (manual pass) |
| Environment | Local replica, Chromium 1680x1050 and 390x844 |

## Description

Judge the look and feel of the survey: layout, spacing, alignment, colour, contrast, typography and
how the pages scale between a desktop screen and a phone screen. This is a human judgement, so it is
not automated.

## Pre-conditions

- The survey is running locally and every page can be reached.

## Steps

1. Open the survey on a desktop screen and look at Page 1.
2. Walk through all six pages, on the positive branch and the improvement branch.
3. Repeat on a narrow (phone-width) window.
4. Check each of the items in the checklist below.

## Checklist and result

| # | Check | Result |
|---|-------|--------|
| 1 | The title, sub-title and page heading form a clear visual hierarchy | Pass |
| 2 | Questions are evenly spaced and aligned to a single column | Pass |
| 3 | The required marker (`*`) is visible next to required questions | Pass |
| 4 | Inputs, dropdowns, text areas and buttons share one visual style | Pass |
| 5 | The brand colour is used consistently for actions and the progress bar | Pass |
| 6 | Selected stars and the selected NPS score are clearly highlighted | Pass |
| 7 | Disabled or hidden elements do not leave gaps in the layout | Pass |
| 8 | Text contrast against the background is comfortable to read | Pass |
| 9 | On a phone-width window nothing is cut off or overlaps | Pass |
| 10 | The progress bar visibly grows between Page 1 and Page 6 | Pass (see DEF-003) |

## Observations

- The design is calm and consistent: one column, generous white space, and one accent colour.
- The conditional branches slot into the page without leaving an empty gap, so it is not obvious that
  other questions were hidden, which is a good thing.
- The progress bar was invisible until DEF-003 was fixed; it now reads correctly as a growing bar.

## Workflow - how this test works

```
open survey (desktop)
  -> inspect Page 1 layout, alignment and spacing
  -> walk Pages 2 to 6 (positive branch) and re-check each page
  -> go back and walk the improvement / detractor branches
  -> resize to a phone-width window and repeat the checks
  -> record each checklist item as Pass or Fail
  -> raise a defect for every Fail
```

## Status

**Pass** (after DEF-003 was fixed).
