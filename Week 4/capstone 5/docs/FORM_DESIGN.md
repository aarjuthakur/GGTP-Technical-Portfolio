# Form Design Specification

This document is the contract for the survey. It describes the exact pages, questions, validation
rules and conditional logic implemented in `app/`, so the same survey can be rebuilt 1:1 in
Microsoft Forms.

> To actually build and publish it in Microsoft Forms, follow
> [`MICROSOFT_FORMS_BUILD_GUIDE.md`](./MICROSOFT_FORMS_BUILD_GUIDE.md). That guide includes the
> click-by-click steps and the known places where Microsoft Forms differs from this specification.

---

## 1. Structure overview

| Page | Title | Shown? | Input types used |
|------|-------|--------|------------------|
| 1 | Welcome & Demographics | Always | Text, Email, Number |
| 2 | Product Usage | Always | Multiple choice, Checkboxes, Rating, NPS |
| 3 | Your Experience | Always; content depends on the rating | Paragraph, Dropdown, Date, Ranking, Time |
| 4 | Detailed Feedback | Always; content depends on the NPS score | Multiple choice, Paragraph, File upload |
| 5 | Preferences & Follow-up | Always; contact block depends on the follow-up answer | Multiple choice, Dropdown, Time, Ranking, Likert |
| 6 | Thank You | Always | Display only |

Progress is shown as "Page N of 6" with a progress bar. The Back button appears from Page 2 onward;
the Next button is replaced by Submit on Page 6.

---

## 2. Page 1 - Welcome & Demographics

| Q | Question | Type | Required | Validation |
|---|----------|------|----------|------------|
| Q1 | What is your full name? | Text (short answer) | Yes | 3 to 100 characters |
| Q2 | What is your email address? | Email | Yes | Valid `user@domain.com` format |
| Q3 | What is your company name? | Text (short answer) | Yes | 2 to 100 characters |
| Q4 | How many employees work in your organization? | Number | Yes | Whole number, 1 or more |

The page also shows the welcome message.

---

## 3. Page 2 - Product Usage

| Q | Question | Type | Required | Options / Validation |
|---|----------|------|----------|----------------------|
| Q5 | How did you hear about us? | Multiple choice (radio) | Yes | Word of mouth, Online search, Social media, Referral |
| Q6 | Which features do you use? | Checkboxes | Yes | Dashboard, Reports, Automation, Integrations (at least one) |
| Q7 | Rate your overall experience | Rating (1-5 stars) | Yes | Exactly one value between 1 and 5 |
| Q8 | How likely are you to recommend us? | NPS (0-10) | Yes | Integer between 0 and 10 |

---

## 4. Page 3 - Your Experience (satisfaction branch)

Branches on the **overall rating (Q7)** captured on Page 2.

| Condition | Content shown |
|-----------|---------------|
| IF rating >= 4 | Q9 "What do you like most about our product?" — Paragraph, required (10 to 1000 chars)<br>Q10 "Which feature do you value the most?" — Dropdown, required (Dashboard / Reports / Automation / Integrations)<br>Q11 "When did you purchase?" — Date, required |
| ELSE (rating < 4) | Q9b "Why are you not satisfied?" — Paragraph, required (10 to 1000 chars)<br>Q10b "Rank what would improve your experience" — Ranking, ordered list of Ease of use / Performance / Support<br>Q11b "What is the best time to contact you?" — Time, required |

---

## 5. Page 4 - Detailed Feedback (NPS branch)

Branches on the **NPS score (Q8)** captured on Page 2.

| Condition | Content shown |
|-----------|---------------|
| IF NPS >= 8 (Promoter) | Q12 "Would you be interested in a case study?" — Multiple choice Yes/No, required |
| ELSE IF NPS is 6 or 7 (Passive) | Q12b "What would make it a 10?" — Paragraph, required (10 to 1000 chars) |
| ELSE (NPS <= 5, Detractor) | Q12c "Upload a screenshot of the issue" — File upload, optional (images or PDF, max 10 MB)<br>Q12d "Please describe the issue in detail" — Paragraph, required (10 to 1000 chars) |

Exactly one of the three blocks is shown; the other two are hidden and skipped by validation.

---

## 6. Page 5 - Preferences & Follow-up

| Q | Question | Type | Required | Notes |
|---|----------|------|----------|-------|
| Q15 | Would you like a follow-up from our team? | Multiple choice Yes/No | Yes | Controls the contact block below |
| Q13 | Preferred contact method | Dropdown | Yes, when Q15 = Yes | Email / Phone / Microsoft Teams |
| Q14 | Best time to contact you | Time | No | Only shown when Q15 = Yes |
| Q16 | Rank our communication channels | Ranking | Always ordered | Email / Phone / Microsoft Teams |
| Q17 | This product meets my needs | Likert | Yes | Strongly agree / Agree / Neutral / Disagree / Strongly disagree |

Branch rule: **IF follow-up = Yes show the contact block (Q13, Q14), ELSE hide it**.

---

## 7. Page 6 - Thank You & Summary

- Personalised thank-you message built from the name entered in Q1.
- A read-only summary list of every answer that was provided.
- If Q12 (case study) = Yes: "We'll contact you soon." Otherwise: "Thank you for your feedback."
- Submit records the response and displays a confirmation status message.

---

## 8. Input-type coverage

| # | Input type | Where used |
|---|-----------|------------|
| 1 | Text (short answer) | Q1 (name), Q3 (company) |
| 2 | Paragraph (long answer) | Q9, Q9b, Q12b, Q12d |
| 3 | Multiple choice (radio) | Q5, Q12, Q15 |
| 4 | Checkboxes (multiple select) | Q6 |
| 5 | Dropdown list | Q10, Q13 |
| 6 | Rating scale (1-5 stars) | Q7 |
| 7 | Likert scale | Q17 |
| 8 | Net Promoter Score (NPS) | Q8 |
| 9 | Date picker | Q11 |
| 10 | Time picker | Q11b, Q14 |
| 11 | Email input | Q2 |
| 12 | Number input | Q4 |
| 13 | Ranking / ordering | Q10b, Q16 |
| 14 | File upload | Q12c |
| 15 | Conditional branching | Pages 3, 4 and 5 |

All fifteen input types required by the assignment are present.

---

## 9. Validation behaviour

- Validation runs when **Next** (or Submit on the final page) is clicked.
- Only the questions that are currently visible are validated; hidden branches are skipped.
- An invalid question shows a message directly beneath it, for example
  "This question is required." or "Please select an option."
- Typing into a field that was flagged clears its error immediately.
- The user stays on the current page until every visible required question is answered.

---

## 10. Published Microsoft Forms survey - what was actually built

The replica above is the reference design. The assignment deliverable is the **published** form at the
anonymous responder link in `README.md`. It was read back from the form's own payload and walked page
by page, so the differences below are evidence, not assumptions.

### 10.1 Structure as built

| Page | Section | Questions |
|------|---------|-----------|
| 1 | Welcome & Demographics | name, e-mail, company, headcount (4, all required) |
| 2 | Product Usage | source, features (checkboxes), segment (dropdown), customer-since (date), rating, NPS, satisfaction (7) |
| 3 | S3A Your Experience | likes, best feature (dropdown), start-using date |
| 4 | S3B Help Us Improve | why not, improvement ranking, best contact time |
| 5 | Recommendation | recommend-to-a-colleague, then branch-revealed case study / make-it-a-10 / issue |
| 6 | Preferences & Follow-up | Likert (3 rows), communication channel ranking, follow-up, then contact method + time when Yes |

6 pages, 6 sections, 29 questions, anonymous - no sign-in. The default Microsoft thank-you screen is
used (`thankYouMessage` and `submissionNotice` are empty).

### 10.2 Input types present

Text short, text long, choice radio, **checkboxes** (`ChoiceType=2`), **dropdown**
(`OptionDisplayStyle=Dropdown`), rating, NPS, date, ranking, Likert and section.

**Missing:** a real time picker (time-of-day is a dropdown of slots).

**File upload - delivered on a second published form.** Microsoft Forms will not offer a file-upload
question on an anonymous form: as soon as the form has one, every responder must sign in (the response
page answers `401 Required user login` and the browser is sent to `login.microsoftonline.com`). The
upload question is therefore delivered on the second published link,
`forms.cloud.microsoft/...C1URUQ0STFNVlU1STMwME5FV1RYVUROUDhBTS4u`, and verified by hand with TC-042
(limitation D-2 is now closed for the deliverable; the anonymous link has no upload question by
platform design). The rule is images and PDF up to 10 MB, the same rule the replica implements and
TC-043 asserts automatically.

### 10.3 Restrictions actually configured

| Question | Rule | Effect |
|----------|------|--------|
| Name | `rule10` minimum length 3 | "Jo" rejected, no maximum (DEF-012) |
| E-mail | `rule11` | format validated |
| Headcount | number (`IsNumber`) | words rejected, but 0 and decimals accepted (DEF-013, DEF-014) |
| Likes | `rule9` maximum length | length-limited free text |
| All questions | required | no page can be skipped empty |

> **Replica vs published form.** The table above records what the *published* form actually
> enforces, which is weaker than the design in several places (DEF-012 to DEF-014). The local
> replica implements the designed rules instead: name 3-100, company 2-100, e-mail shape, whole
> headcount of 1 or more, and every paragraph answer between 10 and 1000 characters, with the
> maximum also guarded by the field's `maxlength`. TC-044 asserts those boundaries; TC-021 to TC-023
> assert the required, e-mail and range rules.

### 10.4 Branching as built

The effective router is the **satisfaction** answer (Q11), not the rating (Q9) or the NPS (Q10). A
Microsoft Forms section can only apply one branch, and the last branching question wins - so the
rating and NPS branches designed for the replica are dead on the live form (DEF-008, DEF-009).

| Satisfaction answer | Where the form goes | Design |
|---------------------|---------------------|--------|
| Very satisfied / Somewhat satisfied | S3A, then S3B | S3A only |
| Neither / Somewhat dissatisfied | Recommendation (S3B skipped) | S3B |
| Very dissatisfied | Submit on Page 2, survey ends | S3B |

On Page 5 the recommendation answer reveals follow-up questions, but not the designed sets: a
promoter sees the passive suggestion and detractor issue (DEF-005), a passive answer sees all three or
only the issue box (DEF-006), and changing the answer never removes stale questions (DEF-007).

These deviations are encoded in test cases as expected failures with the defect id, so the suite is
green while the evidence stays reproducible. Full details: `DEFECT_LOG.md`; per-case results:
`TEST_CASES.md` ("Live execution") and `TEST_EXECUTION_REPORT.md` (Run 13).
