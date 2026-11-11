# TC-032 - Accessibility: keyboard navigation

| Field | Detail |
|-------|--------|
| Type | Manual |
| Technique | Tab-order check |
| Module | manual |
| Method | Manual (keyboard-only pass) |
| Executed by | QA (manual pass) |
| Environment | Local replica, Chromium and Firefox |

## Description

Check that the whole survey can be completed using only the keyboard, that the tab order follows the
visual order, and that the controls expose the labels a screen reader needs.

## Pre-conditions

- The survey is running locally.
- The mouse/trackpad is not used during this check.

## Steps

1. Open the survey and press Tab repeatedly, following the focus ring.
2. Confirm the focus order matches the visual order on each page.
3. Reach every question and control using Tab, arrow keys and Space/Enter.
4. Complete the survey using the keyboard only.
5. Trigger a validation error and confirm the affected field is marked for assistive technology.

## Findings

| # | Check | Result |
|---|-------|--------|
| 1 | A visible focus ring appears on every focused control | Pass |
| 2 | Tab order matches the visual order (name, email, company, employees, Next) | Pass |
| 3 | Back and Next can be reached and activated with Enter/Space | Pass |
| 4 | Radio options can be chosen with the arrow keys inside the group | Pass |
| 5 | Checkboxes can be toggled with Space | Pass |
| 6 | The star rating and NPS buttons can be reached with Tab and chosen with Enter/Space | Pass |
| 7 | The ranking "move up/down" buttons are reachable and labelled ("Move Email up") | Pass |
| 8 | The whole survey can be completed with the keyboard only | Pass |
| 9 | Text inputs and text areas have labels tied to them with `for`/`id` | Pass |
| 10 | Radio, checkbox, rating and Likert groups have a group role and an accessible name | Pass |
| 11 | A field that fails validation gets `aria-invalid="true"` | Pass |
| 12 | The error text is announced to a screen reader (linked to the field) | Not met |

## Observations

- Keyboard-only completion works end to end, including the custom star rating and ranking controls,
  because they are real `<button>` elements and therefore focusable.
- Observation (accessibility, not blocking): a failed field is marked with `aria-invalid="true"`, but
  the error message is not linked to the field with `aria-describedby`, so a screen reader announces
  that a field is invalid without reading the message text. This is recorded so it can be picked up in
  a later accessibility pass; it does not stop anyone completing the survey.
- The custom rating controls use `<button>` elements inside a group with `role="radiogroup"`. They
  work with the keyboard, though a stricter pattern would move focus with the arrow keys.

## Workflow - how this test works

```
open survey
  -> press Tab and follow the focus ring, listing every stop
  -> compare the focus order with the visual order
  -> choose each option type using only the keyboard (arrows, Space, Enter)
  -> complete all six pages without touching the mouse
  -> force a validation error and inspect aria-invalid / the error element
  -> record each check and any accessibility observation
```

## Result

**Pass with one recorded observation.** The survey is fully usable with the keyboard; the error text
is not yet linked to its field for screen readers.
