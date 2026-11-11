# TC-041 - Visual design and responsive check on a phone and a tablet

| Field | Detail |
|-------|--------|
| Type | Manual |
| Technique | Visual inspection at four viewport widths |
| Module | manual |
| Method | Manual (visual pass) with measured layout values |
| Executed by | QA (manual pass) |
| Environment | Local replica, Chromium, desktop 1280x800, tablet 768x1024, phone 390x844, small phone 320x568 |

## Description

Look at the survey on a desktop, a tablet and two phone widths and judge the visual result: does the
layout stay inside the screen, do labels wrap instead of being cut off, is the text readable without
zoom, and can every control still be tapped comfortably? The automated responsive cases (TC-029,
TC-030) assert the absence of overflow; this case records how the pages actually look.

## Pre-conditions

- The survey is running locally.
- Device emulation (or a real device) is used for the phone and tablet widths.

## Steps

1. Open the survey at 1280x800 and look at Page 1 and Page 2 as the reference layout.
2. Repeat at 768x1024 (tablet), 390x844 (phone) and 320x568 (small phone).
3. On each width check: horizontal overflow, wrapped labels, clipped headings, spacing and font size.
4. Measure the touch targets on Page 2 (radio/checkbox labels, star rating, NPS buttons, Next/Back).
5. Note every visual observation, including anything that is usable but below common mobile guidance.

## Findings

| # | Check | Result |
|---|-------|--------|
| 1 | No horizontal scrolling on Pages 1, 2 and 4 at any of the four widths | Pass |
| 2 | No clipped question label, option label, heading or button at any width | Pass |
| 3 | No control rendered off the left or right edge | Pass |
| 4 | The layout collapses to a single column on the phone widths | Pass |
| 5 | Body text and question labels stay at 16 px (no zoom needed) | Pass |
| 6 | Page headings keep their hierarchy (18.4 px page title, 16 px labels) | Pass |
| 7 | Page padding and spacing stay comfortable at 320 px (18 px 16 px) | Pass |
| 8 | The radio and checkbox rows keep a comfortable tap area (358 x 43 px labels on a 390 px screen) | Pass |
| 9 | The star rating and NPS buttons stay large enough to tap reliably on a phone | Observation |
| 10 | The Back/Next buttons keep a full-width, 47 px-tall tap area on a phone | Pass |

## Observations

- The star rating buttons measure 24 x 28 px at 390 px and 320 px width (33 px tall at desktop) and
  the NPS pills 30 x 30 px on a phone. They are spaced and usable, but they are below the 44 x 44 px
  (Apple HIG) / 48 x 48 dp (Material) guidance for touch targets. Suggestion: increase the phone
  size of the rating and NPS controls. Recorded as a visual improvement, not a blocking defect.
- Radio and checkbox rows are 43 px tall with the whole label clickable, so they are comfortable even
  on the small phone width.
- The ranking question on Page 5 keeps its up/down buttons inside the row at every width, so the
  reorder action never overflows.
- Long option text wraps inside the card rather than breaking the layout; the serial comma in the
  NPS label ("0 = Not at all likely, 10 = Extremely likely") wraps cleanly on the small phone.

## Workflow - how this test works

```
open the survey at 1280x800, 768x1024, 390x844 and 320x568
  -> look at Page 1 and Page 2 at each width
  -> check for horizontal scroll, clipped labels and off-screen controls
  -> measure body / label / heading font sizes
  -> measure the tap area of radio rows, the rating, the NPS buttons and Next/Back
  -> record every visual observation, including improvements below mobile guidance
```

## Result

**Pass with one recorded observation.** The layout is stable and readable at every checked width;
the star rating and NPS buttons are recorded as too small for ideal touch use on a phone.
