# Form Design screenshots - capture checklist

Save every image **in this folder** (`docs/evidence/forms/`) using the exact file name below.
PNG, taken from the live Microsoft Form (`https://forms.cloud.microsoft/...`).

Take each shot with **Win + Shift + S** and save it here, or use the **Snipping Tool**.

| Done | File name | Input type | What must be visible in the shot |
|------|-----------|-----------|----------------------------------|
| [x] | `01-text.png` | Text (short answer) | Question F1 `What is your full name?` inside the **Welcome & Demographics** section heading |
| [x] | `02-paragraph.png` | Paragraph (long answer) | Question F12 `What do you like most about our product?` - the tall multi-line box |
| [x] | `03-multiple-choice.png` | Multiple choice | Question F5 `How did you hear about us?` with all 6 options |
| [x] | `04-checkboxes.png` | Checkboxes | Question F6 `Which features do you use?` with all 6 options |
| [x] | `05-dropdown.png` | Dropdown | Question F7 or F26 with the **drop-down list OPEN** so the choices are visible |
| [x] | `06-rating.png` | Rating (stars) | Question F9 with the 5 stars |
| [x] | `07-likert.png` | Likert | Question F23 with the 3 rows and the 5-column scale |
| [x] | `08-nps.png` | Net Promoter Score | Question F10 with the 0-10 scale |
| [x] | `09-date.png` | Date picker | Question F8 with the **calendar POPPED OPEN** |
| [x] | `10-time.png` | Time picker (dropdown workaround) | Question F17 or F27 with the time-slot list open |
| [x] | `11-email.png` | Email | Question F2 `What is your email address?` including the hint text - **(re-captured 2026-10-20 from the published form)** |
| [x] | `12-number.png` | Number | Question F4 `How many employees work in your organization?` |
| [x] | `13-ranking.png` | Ranking | Question F16 or F24 with the drag handle / number order visible |
| [ ] | `14-file-upload.png` | File upload | Not available: the published form is anonymous, so Forms disables file upload (limitation D-2). The existing image is from the design build, not the live form. TC-018 covers upload on the replica. |
| [x] | `15-branching-a.png` | Conditional branching | The **Branching options** panel for **F11** (all 5 answers with their Go-to) |
| [ ] | `15-branching-b.png` | Conditional branching | The **Branching options** panel for **F18** - not captured; the published form has no NPS branch (DEF-008). Evidence is TC-015 to TC-017. |
| [ ] | `15-branching-c.png` | Conditional branching | The **Branching options** panel for **F25** (Yes / No) - not captured; branch behaviour is evidenced by TC-019 and TC-020. |
| [x] | `conf-header.png` | Form header | The top of the form: title + description - **(re-captured 2026-10-20 from the published form)** |
| [x] | `conf-thankyou.png` | Confirmation screen | "Your response was submitted." after clicking **Submit** - **(re-captured 2026-10-20 from the published form)** |
| [x] | `conf-page6.png` | Page 6 responder view | Preferences and follow-up page - **(captured 2026-10-20 from the published form)** |

## Notes

- Capture from the **form editor** (the design view) - that is the "Form Design" evidence, and it shows
  every question without having to fill in the required ones.
- For an alternative responder view, click **Preview** first, but you must answer the required
  questions to move between pages.
- Keep the **section heading** in the picture. The grader needs to see which page each question is on.
- Crop tightly around the question. Full-screen shots with the whole desktop are harder to read.
- Keep browser zoom at **100%**.
- One image per input type - 14 + 3 + 2 = **19 images** in total.

## Status (2026-10-20)

The 15 design screenshots (`01` to `15-branching-a`) were captured on 2026-10-19 from the published
form's editor view. The three missing ones are marked `[ ]` above with the reason: file upload is
unavailable on an anonymous form (D-2) and two branching panels no longer exist in the published
build (the NPS branch was never effective - DEF-008 - and the follow-up branch is evidenced by
TC-019/TC-020).

`11-email.png`, `conf-header.png`, `conf-thankyou.png` and `conf-page6.png` were re-captured from the
responder view on 2026-10-20 and therefore match the form that the `live` project tests.

The current file list is: `01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`, `09`, `10`, `11`,
`12`, `13`, `14` (design build only), `15-branching-a`, `conf-header`, `conf-page6`,
`conf-thankyou`.
