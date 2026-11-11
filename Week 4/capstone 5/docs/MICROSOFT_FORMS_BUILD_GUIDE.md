# Microsoft Forms Build Guide

## Step-by-step: build the 6-page Customer Satisfaction Survey with all 15 input types + branching

This is the click-by-click guide for turning the assignment's survey design into a **real, published
Microsoft Forms survey**. It is written for the two assignment deliverables that need a live form:

- **Survey Form URL** - the published link you hand in.
- **Form Design Screenshots** - the 15 input types captured as images.

Every question below lists the **exact answer choices to type in**, so nothing has to be invented.

---

## 1. Why your questions all land on one page (read this first)

If you start a new form and add questions one after another, they **all go onto the same page** and
never break into pages. That is how Microsoft Forms works: adding a question just adds it to the
current section. Pages do not appear on their own.

A **page in Microsoft Forms is a Section**, and you insert one yourself:

> **+ Add new** (bottom left of the form) -> in the panel that opens, scroll to the bottom and choose
> **Section** -> a new page header appears -> type the page title and subtitle.

Per Microsoft's own help (*Add sections to your survey or questionnaire*):

1. In Microsoft Forms, open your form.
2. Select **+ Add new**.
3. Scroll to the bottom of your form and select **Add new question**, then select **Section**.
4. Add a **section title** and **subtitle**.
5. To reorder or delete a section, select **More settings for section** (**...**) at the top-right of
   the section -> **Move section** / **Duplicate section** / **Remove section**.

```
What the editor looks like once you do this:

  [ Title:  Customer Satisfaction Survey              ]   <- page 1 header
  [ Description: Tell us about your experience...      ]
  ---------------------------------------------------------------
  [ Section 1: Welcome & Demographics                  ]   <- Section (page)
      [ Q ] What is your full name?
      [ Q ] What is your email address?
      ...
  ---------------------------------------------------------------
  [ Section 2: Product Usage                           ]   <- Section (page)
      [ Q ] How did you hear about us?
      ...
```

**The three rules that keep it working**

1. Build the pages **in the order shown** (below). Sections are always added at the bottom, so
   building top-to-bottom means you never have to reorder anything.
2. **Branching is forward-only** - a branch can only send someone to a *later* question or section,
   never backwards.
3. Because of rule 2, a branch question must be the **last question of its page**.

This build has **10 sections**, so a respondent walks through **6 or 7 pages**:

```
S1 Welcome & Demographics   -> page 1   (always shown)
S2 Product Usage            -> page 2   (always shown)
S3A Your Experience - Positive      -> page 3  (branch A, rating 4-5)
S3B Your Experience - Improvement   -> page 3  (branch A, rating 1-3)
S4 Recommendation           -> page 4   (always shown, 1 question)
S4A Promoter Feedback       -> page 5   (branch B, NPS 9-10)
S4B Passive Feedback        -> page 5   (branch B, NPS 7-8)
S4C Support Feedback        -> page 5   (branch B, NPS 0-6)
S5 Preferences & Follow-up  -> page 5/6 (always shown)
S5A Contact Preferences     -> page 6   (branch C, follow-up = Yes)
```

---

## 2. Create the form

1. Sign in at **https://forms.office.com** with your Microsoft 365 account.
2. Click **New Form**.
3. Title: `Customer Satisfaction Survey`
4. Description (your welcome message):
   `Thank you for taking the time to tell us about your experience. Your feedback goes directly to our team. It takes about 3 minutes.`

---

## 3. Build the form page by page

For **every page** do the same two moves:

```
  (a) + Add new -> Section -> type the page title + subtitle
  (b) add that page's questions under the new section
```

Question types are chosen from the same **+ Add new** panel. Type the choices exactly as listed
(use a normal hyphen `-`, not a long dash).

### PAGE 1 - Welcome & Demographics (Section S1)

**Create the page:** `+ Add new` -> **Section** -> Title `Welcome & Demographics`, Subtitle `Let's start with a little about you.`

| # | Question text (type this) | Add it as | Required | Choices / settings |
|---|---------------------------|-----------|----------|--------------------|
| F1 | `What is your full name?` | **Text** | Yes | None. Hint: `3 to 100 characters.` |
| F2 | `What is your email address?` | **Text** | Yes | None. Hint: `Example: name@company.com` |
| F3 | `What is your company name?` | **Text** | Yes | None. Hint: `Example: Contoso Ltd.` |
| F4 | `How many employees work in your organization?` | **Text** -> **...** -> **Restrictions** -> **Number** | Yes | Hint: `Enter a number, for example 250.` |

### PAGE 2 - Product Usage (Section S2)

**Create the page:** `+ Add new` -> **Section** -> Title `Product Usage`, Subtitle `Tell us how you use our product.`

| # | Question text (type this) | Add it as | Required | Choices (one per option) |
|---|---------------------------|-----------|----------|--------------------------|
| F5 | `How did you hear about us?` | **Choice** | Yes | 1. Word of mouth<br>2. Online search<br>3. Social media<br>4. Referral<br>5. Email newsletter<br>6. Other |
| F6 | `Which features do you use? (Select all that apply)` | **Choice** + **Multiple answers** ON | Yes | 1. Dashboard<br>2. Reports<br>3. Automation<br>4. Integrations<br>5. Mobile app<br>6. API access |
| F7 | `What is your customer segment?` | **Choice** + **...** -> **Dropdown** ON | Yes | 1. Enterprise<br>2. SMB<br>3. Startup<br>4. Individual |
| F8 | `When did you become a customer?` | **Date** | Yes | None (calendar picker) |
| F9 | `Rate your overall experience` | **Rating** -> 5 levels, symbol = star | Yes | None (1 to 5 stars) |
| F10 | `How likely are you to recommend us?` | **Net Promoter Score** | Yes | None (0 to 10). Optional labels: 0 = `Not at all likely`, 10 = `Extremely likely` |
| F11 | `Overall, how satisfied are you with us?` | **Choice** | Yes | 1. `5 - Very satisfied`<br>2. `4 - Satisfied`<br>3. `3 - Neutral`<br>4. `2 - Dissatisfied`<br>5. `1 - Very dissatisfied` |

> **F11 is the branch question for page 3** - keep it as the last question of this page.

### PAGE 3 (positive) - Your Experience (Section S3A)

**Create the page:** `+ Add new` -> **Section** -> Title `Your Experience`, Subtitle `Great! Tell us what is working well.`

| # | Question text (type this) | Add it as | Required | Choices / settings |
|---|---------------------------|-----------|----------|--------------------|
| F12 | `What do you like most about our product?` | **Text** -> **...** -> **Long answer** ON | Yes | Hint: `Up to 1000 characters.` |
| F13 | `Which feature do you value the most?` | **Choice** + **Dropdown** ON | Yes | 1. Dashboard<br>2. Reports<br>3. Automation<br>4. Integrations<br>5. Mobile app<br>6. Customer support |
| F14 | `When did you start using our product?` | **Date** | No | None |

### PAGE 3 (improvement) - Your Experience (Section S3B)

**Create the page:** `+ Add new` -> **Section** -> Title `Help Us Improve`, Subtitle `Help us understand what to fix.`

| # | Question text (type this) | Add it as | Required | Choices / settings |
|---|---------------------------|-----------|----------|--------------------|
| F15 | `Why are you not fully satisfied?` | **Text** -> **Long answer** ON | Yes | Hint: `Please give as much detail as you can (up to 1000 characters).` |
| F16 | `Rank what we should improve first` | **Ranking** | Yes | 1. Ease of use<br>2. Performance and speed<br>3. Customer support<br>4. Pricing<br>5. Integrations |
| F17 | `What is the best time to contact you?` | **Choice** + **Dropdown** ON | No | 1. 08:00-10:00<br>2. 10:00-12:00<br>3. 12:00-14:00<br>4. 14:00-16:00<br>5. 16:00-18:00 |

### PAGE 4 - Recommendation (Section S4)

**Create the page:** `+ Add new` -> **Section** -> Title `Recommendation`, Subtitle `One quick question before we finish.`

| # | Question text (type this) | Add it as | Required | Choices |
|---|---------------------------|-----------|----------|---------|
| F18 | `How likely are you to recommend us to a colleague?` | **Choice** | Yes | 1. Very likely (9-10)<br>2. Likely (7-8)<br>3. Unlikely (0-6) |

> **F18 is the branch question for page 5** and is the only question on this page.

### PAGE 5 (promoter) - Promoter Feedback (Section S4A)

**Create the page:** `+ Add new` -> **Section** -> Title `Promoter Feedback`, Subtitle `You are a champion - thank you!`

| # | Question text (type this) | Add it as | Required | Choices |
|---|---------------------------|-----------|----------|---------|
| F19 | `Would you be interested in being featured in a customer case study?` | **Choice** | Yes | 1. Yes, I'd be happy to<br>2. No, thank you |

### PAGE 5 (passive) - Passive Feedback (Section S4B)

**Create the page:** `+ Add new` -> **Section** -> Title `Passive Feedback`, Subtitle `What would make us a 10?`

| # | Question text (type this) | Add it as | Required | Choices / settings |
|---|---------------------------|-----------|----------|--------------------|
| F20 | `What would make us a 10 for you?` | **Text** -> **Long answer** ON | Yes | Hint: `Tell us what is missing (up to 1000 characters).` |

### PAGE 5 (detractor) - Support Feedback (Section S4C)

**Create the page:** `+ Add new` -> **Section** -> Title `Support Feedback`, Subtitle `Let us look into the issue.`

| # | Question text (type this) | Add it as | Required | Choices / settings |
|---|---------------------------|-----------|----------|--------------------|
| F21 | `Upload a screenshot of the issue (optional)` | **File upload** | No | File type: Image and PDF. Max 1 file, max 10 MB. |
| F22 | `Please describe the issue` | **Text** -> **Long answer** ON | Yes | Hint: `Include what happened and what you expected.` |

### PAGE 6 - Preferences & Follow-up (Section S5)

**Create the page:** `+ Add new` -> **Section** -> Title `Preferences & Follow-up`, Subtitle `A few last preferences.`

| # | Question text (type this) | Add it as | Required | Choices / settings |
|---|---------------------------|-----------|----------|--------------------|
| F23 | `I am satisfied with the product and service quality` | **Likert** | Yes | Rows (statements):<br>1. I am satisfied with the product and service quality<br>2. The product is easy to use<br>3. I would recommend this product to others<br>Scale (columns): Strongly disagree / Disagree / Neutral / Agree / Strongly agree |
| F24 | `Rank our communication channels` | **Ranking** | Yes | 1. Email<br>2. Phone<br>3. Microsoft Teams<br>4. In-app chat |
| F25 | `Would you like us to follow up with you?` | **Choice** | Yes | 1. Yes, please<br>2. No, thank you |

> **F25 is the branch question for the last page** - keep it as the last question of this page.

### PAGE 6 (optional) - Contact Preferences (Section S5A)

**Create the page:** `+ Add new` -> **Section** -> Title `Contact Preferences`, Subtitle `How should we reach you?`

| # | Question text (type this) | Add it as | Required | Choices |
|---|---------------------------|-----------|----------|---------|
| F26 | `What is your preferred contact method?` | **Choice** + **Dropdown** ON | Yes | 1. Email<br>2. Phone<br>3. Microsoft Teams |
| F27 | `What is the best time to contact you?` | **Choice** + **Dropdown** ON | Yes | 1. 08:00-10:00<br>2. 10:00-12:00<br>3. 12:00-14:00<br>4. 14:00-16:00<br>5. 16:00-18:00 |

### Page 6 final - Thank You (confirmation screen)

There is no section to build for this. Microsoft Forms shows its own confirmation screen after
submit. Set the message in **Settings** (see step 6):

> `Thank you for your feedback. Your responses have been recorded and our team will review them.`
> `If you asked us to follow up, we will contact you soon.`

### Master list - every question with its section, choices and condition

Use this single table as the build checklist and as the form-structure record for the assignment.

The **Visible when** column is the conditional branching (assignment input type 15). It is not set on
these questions - it is the **result** of the branching rule configured on F11, F18 and F25 (see
section 5). "Always" means the question is on the ordinary route.

| # | Section (page) | Question text | Type / toggle | Choices, values and settings | Visible when (condition) |
|---|----------------|---------------|---------------|------------------------------|---------------------------|
| F1 | S1 Welcome & Demographics | What is your full name? | Text | Required. Hint: `3 to 100 characters.` | Always |
| F2 | S1 Welcome & Demographics | What is your email address? | Text | Required. Hint: `Example: name@company.com` | Always |
| F3 | S1 Welcome & Demographics | What is your company name? | Text | Required. Hint: `Example: Contoso Ltd.` | Always |
| F4 | S1 Welcome & Demographics | How many employees work in your organization? | Text -> Restrictions -> **Number** | Required. Hint: `Enter a number, for example 250.` | Always |
| F5 | S2 Product Usage | How did you hear about us? | Choice | Required. Word of mouth / Online search / Social media / Referral / Email newsletter / Other | Always |
| F6 | S2 Product Usage | Which features do you use? (Select all that apply) | Choice + **Multiple answers** | Required. Dashboard / Reports / Automation / Integrations / Mobile app / API access | Always |
| F7 | S2 Product Usage | What is your customer segment? | Choice + **Dropdown** | Required. Enterprise / SMB / Startup / Individual | Always |
| F8 | S2 Product Usage | When did you become a customer? | Date | Required | Always |
| F9 | S2 Product Usage | Rate your overall experience | Rating (5 stars) | Required | Always |
| F10 | S2 Product Usage | How likely are you to recommend us? (0-10) | Net Promoter Score | Required | Always |
| F11 | S2 Product Usage | Overall, how satisfied are you with us? | Choice | Required. 5 - Very satisfied / 4 - Satisfied / 3 - Neutral / 2 - Dissatisfied / 1 - Very dissatisfied | Always - **this is the Branch A question** |
| F12 | S3A Your Experience | What do you like most about our product? | Text -> **Long answer** | Required. Hint: `Up to 1000 characters.` | **F11 = 5 or 4** (positive path) |
| F13 | S3A Your Experience | Which feature do you value the most? | Choice + **Dropdown** | Required. Dashboard / Reports / Automation / Integrations / Mobile app / Customer support | **F11 = 5 or 4** (positive path) |
| F14 | S3A Your Experience | When did you start using our product? | Date | Optional | **F11 = 5 or 4** (positive path) |
| F15 | S3B Help Us Improve | Why are you not fully satisfied? | Text -> **Long answer** | Required. Hint: `Please give as much detail as you can (up to 1000 characters).` | **F11 = 3, 2 or 1** (low rating - "explain why") |
| F16 | S3B Help Us Improve | Rank what we should improve first | Ranking | Required. Ease of use / Performance and speed / Customer support / Pricing / Integrations | **F11 = 3, 2 or 1** (improvement path) |
| F17 | S3B Help Us Improve | What is the best time to contact you? | Choice + **Dropdown** | Optional. 08:00-10:00 / 10:00-12:00 / 12:00-14:00 / 14:00-16:00 / 16:00-18:00 | **F11 = 3, 2 or 1** (improvement path) |
| F18 | S4 Recommendation | How likely are you to recommend us to a colleague? | Choice | Required. Very likely (9-10) / Likely (7-8) / Unlikely (0-6) | Always - **this is the Branch B question** |
| F19 | S4A Promoter Feedback | Would you be interested in being featured in a customer case study? | Choice | Required. Yes, I'd be happy to / No, thank you | **F18 = Very likely (9-10)** |
| F20 | S4B Passive Feedback | What would make us a 10 for you? | Text -> **Long answer** | Required. Hint: `Tell us what is missing (up to 1000 characters).` | **F18 = Likely (7-8)** |
| F21 | S4C Support Feedback | Upload a screenshot of the issue (optional) | File upload | Optional. Image + PDF, max 1 file, max 10 MB | **F18 = Unlikely (0-6)** |
| F22 | S4C Support Feedback | Please describe the issue | Text -> **Long answer** | Required. Hint: `Include what happened and what you expected.` | **F18 = Unlikely (0-6)** |
| F23 | S5 Preferences & Follow-up | I am satisfied with the product and service quality | Likert | Required. Rows: satisfied with quality / product is easy to use / would recommend. Scale: Strongly disagree / Disagree / Neutral / Agree / Strongly agree | Always |
| F24 | S5 Preferences & Follow-up | Rank our communication channels | Ranking | Required. Email / Phone / Microsoft Teams / In-app chat | Always |
| F25 | S5 Preferences & Follow-up | Would you like us to follow up with you? | Choice | Required. Yes, please / No, thank you | Always - **this is the Branch C question** |
| F26 | S5A Contact Preferences | What is your preferred contact method? | Choice + **Dropdown** | Required. Email / Phone / Microsoft Teams | **F25 = Yes, please** |
| F27 | S5A Contact Preferences | What is the best time to contact you? | Choice + **Dropdown** | Required. 08:00-10:00 / 10:00-12:00 / 12:00-14:00 / 14:00-16:00 / 16:00-18:00 | **F25 = Yes, please** |

**How the condition is actually built:** the rule is set on the *branch question* (F11, F18, F25) via
**More settings for question** (**...**) -> **Add branching**. Microsoft Forms can show or hide a whole
**section**, never a single question on the same page - which is why the conditional questions sit in
their own pages (S3A/S3B, S4A/S4B/S4C, S5A) instead of being hidden on page 2.

Section headings used above, in form order:

| Section | Headline title | Subtitle | Branch that leads here | Questions that are conditional |
|---------|----------------|----------|------------------------|-------------------------------|
| S1 | Welcome & Demographics | Let's start with a little about you. | Always shown | - |
| S2 | Product Usage | Tell us how you use our product. | Always shown | - |
| S3A | Your Experience | Great! Tell us what is working well. | Branch A - F11 = 5 or 4 | F12, F13, F14 |
| S3B | Help Us Improve | Help us understand what to fix. | Branch A - F11 = 3, 2 or 1 | F15, F16, F17 |
| S4 | Recommendation | One quick question before we finish. | Always shown | - |
| S4A | Promoter Feedback | You are a champion - thank you! | Branch B - F18 = Very likely (9-10) | F19 |
| S4B | Passive Feedback | What would make us a 10? | Branch B - F18 = Likely (7-8) | F20 |
| S4C | Support Feedback | Let us look into the issue. | Branch B - F18 = Unlikely (0-6) | F21, F22 |
| S5 | Preferences & Follow-up | A few last preferences. | Always shown | - |
| S5A | Contact Preferences | How should we reach you? | Branch C - F25 = Yes, please | F26, F27 |

---

## 4. The click recipe for every one of the 15 input types

Use this while building. Each row tells you which control to pick and which toggle makes that type.

| # | Required input type (assignment) | Where in the form | How to create it in Microsoft Forms | Native? |
|---|----------------------------------|-------------------|--------------------------------------|---------|
| 1 | Text (short answer) | F1, F2, F3 | **Text** -> leave **Long answer** OFF | Yes |
| 2 | Paragraph (long answer) | F12, F15, F20, F22 | **Text** -> **...** -> **Long answer** ON | Yes |
| 3 | Multiple choice (radio) | F5, F11, F18, F19, F25 | **Choice** (Multiple answers OFF) | Yes |
| 4 | Checkboxes (multi-select) | F6 | **Choice** -> **Multiple answers** ON | Yes |
| 5 | Dropdown list | F7, F13, F17, F26, F27 | **Choice** -> **...** -> **Dropdown** ON | Yes |
| 6 | Rating scale (1-5 stars) | F9 | **Rating** -> 5 levels, symbol = star | Yes |
| 7 | Likert scale | F23 | **Likert** -> statements in the rows, 5-point scale | Yes |
| 8 | Net Promoter Score | F10 | **Net Promoter Score** (0-10) | Yes |
| 9 | Date picker | F8, F14 | **Date** | Yes |
| 10 | Time picker | F17, F27 | **Choice** + **Dropdown** of time slots | **No - D-5** |
| 11 | Email input | F2 | **Text** + hint `name@company.com` | **No - D-3** |
| 12 | Number input | F4 | **Text** -> **...** -> **Restrictions** -> **Number** | **Partial - D-4** |
| 13 | Ranking / ordering | F16, F24 | **Ranking** -> list the options | Yes |
| 14 | File upload | F21 | **File upload** -> set count / size / file types | Yes |
| 15 | Conditional branching | Sections S3A/S3B, S4A/S4B/S4C, S5A | **Sections** + **...** -> **Add branching** | **Partial - D-1, D-2** |

**11 of the 15** are native. Time, Email and per-value branching on Rating/NPS have no exact native
equivalent, and Number needs a restriction rather than its own type (see section 10).

---

## 5. Add the branching (the IF/ELSE logic)

> **This is where input type 15 "Conditional Branching / Section Break" lives.** It is not a question
> that you add - it is the **Sections** plus the **branching** set on F11, F18 and F25. The
> assignment's example *"if you rate us 1-3, please explain why"* is **F15**, which is only reached
> when F11 is 1, 2 or 3.

Do this **after** all pages and questions exist.

For each branch question: open the question's **More settings for question** menu (**...**) ->
**Add branching**. On the **Branching options** page, set the **drop-down next to every answer** to a
target. Leaving one answer on "Next question" is the most common bug.

### BRANCH A - on F11 "Overall, how satisfied are you with us?"

| Answer | Go to |
|--------|-------|
| `5 - Very satisfied` | **Great! Tell us what is working well.** (S3A) |
| `4 - Satisfied` | **Great! Tell us what is working well.** (S3A) |
| `3 - Neutral` | **Help Us Improve** (S3B) |
| `2 - Dissatisfied` | **Help Us Improve** (S3B) |
| `1 - Very dissatisfied` | **Help Us Improve** (S3B) |

Implements: *IF rating >= 4 THEN positive feedback ELSE improvement questions*.

### BRANCH B - on F18 "How likely are you to recommend us to a colleague?"

| Answer | Go to |
|--------|-------|
| `Very likely (9-10)` | **Promoter Feedback** (S4A) |
| `Likely (7-8)` | **Passive Feedback** (S4B) |
| `Unlikely (0-6)` | **Support Feedback** (S4C) |

Implements: *IF NPS >= 8 THEN case study; ELSE IF NPS 6-7 THEN improvement; ELSE support path*.

### BRANCH C - on F25 "Would you like us to follow up with you?"

| Answer | Go to |
|--------|-------|
| `Yes, please` | **How should we reach you?** (S5A) |
| `No, thank you` | **End of the form** |

Implements: *IF follow-up = Yes THEN show contact prefs ELSE skip to thank you*.

### Rejoining the shared route

Nothing to configure. After a branch section ends, the respondent continues to the **next section in
order** - so S3A and S3B both fall through to S4, and S4A/S4B/S4C all fall through to S5.

---

## 6. Form settings

Open the form's **...** menu (top right) -> **Settings**:

| Setting | Value | Why |
|---------|-------|-----|
| Who can fill out this form | **Only people in my organization can respond** | Required for the File upload question (F21) to be available |
| Record name | On | Responses are attributable |
| One response per person | Off | Keeps manual re-runs simple |
| Shuffle questions | Off | Fixed order is required (also unavailable once you use sections) |
| Show progress bar | On | Matches the replica's progress indicator |

Set the **confirmation message** to the thank-you wording from section 3, and pick one accent theme
so every page looks consistent.

> **Public link vs file upload:** choosing **Anyone can respond** gives an open link but disables the
> File upload question. If the assignment needs a link that works without a Microsoft sign-in, set
> the audience to *Anyone* and delete F21 (you then have 14 of 15 types live; File upload is still
> covered in the replica). Record whichever choice you make.

---

## 7. Preview every route

Click **Preview** (desktop and mobile). A preview only shows the path your answers select, so start a
**fresh preview** for each row.

| Route | Answers to give | Expected result |
|-------|-----------------|-----------------|
| Happy path | F11 = 5 or 4, F18 = Very likely, F25 = Yes | S3A -> S4A -> S5 -> S5A -> submit |
| Improvement path | F11 = 2, F18 = Unlikely, F25 = No | S3B -> S4C -> S5 -> submit (no contact page) |
| Passive path | F11 = 4, F18 = Likely | S3A -> S4B -> S5 |
| Detractor path | F11 = 1, F18 = Unlikely | S3B -> S4C (file upload visible) |
| Skip path | F25 = No | Contact page is skipped entirely |
| Required checks | Leave F1, F2, F5, F6 blank | Forms blocks Next and shows its own error message |

---

## 8. Publish and copy the URL

1. Click **Collect responses** (top right).
2. Choose the audience you set in section 6.
3. Click **Copy link**. You get a short published link `https://forms.office.com/r/XXXXXXXXXX`.
4. Open that link in a private window to confirm it loads.

That URL is the **Survey Form URL** deliverable.

---

## 9. Capture the 15 Form Design screenshots

Capture each item below from **Preview** and drop the images into `docs/evidence/forms/`.

| # | Input type | What to capture | File name |
|---|-----------|-----------------|-----------|
| 1 | Text (short answer) | F1 / F3 with labels | `01-text.png` |
| 2 | Paragraph (long answer) | F12 with the long-answer box | `02-paragraph.png` |
| 3 | Multiple choice | F5 options | `03-multiple-choice.png` |
| 4 | Checkboxes | F6 multiple answers | `04-checkboxes.png` |
| 5 | Dropdown | F7 or F26 open | `05-dropdown.png` |
| 6 | Rating (stars) | F9 | `06-rating.png` |
| 7 | Likert | F23 | `07-likert.png` |
| 8 | NPS | F10 | `08-nps.png` |
| 9 | Date picker | F8 with calendar open | `09-date.png` |
| 10 | Time picker | F17 or F27 (dropdown workaround) | `10-time.png` |
| 11 | Email | F2 | `11-email.png` |
| 12 | Number | F4 | `12-number.png` |
| 13 | Ranking | F16 or F24 | `13-ranking.png` |
| 14 | File upload | F21 | `14-file-upload.png` |
| 15 | Conditional branching | The Branching options panel, plus one shot per branch | `15-branching-a.png`, `15-branching-b.png`, ... |

Also capture the form header/welcome (page 1) and the confirmation screen.

---

## 10. Deviations from the assignment (documented on purpose)

| ID | What the assignment asks for | Microsoft Forms reality | What we do | Impact |
|----|------------------------------|-------------------------|------------|--------|
| D-1 | Branch on the rating (stars) | Per-value branching is offered on **Choice** questions. A Rating question can only route everyone to one place | F11 is a **Choice** 1-5 question; F9 keeps the genuine **Rating (stars)** type | Stars become radio buttons on the routing question only |
| D-2 | Branch on the NPS (0-10) | The **Net Promoter Score** type cannot route three ways | F18 is a **Choice** with three NPS buckets; F10 keeps the genuine **NPS** type | The NPS slider is a list on the routing question only |
| D-3 | Validated **email** input | Forms has no email question type and no email validation | F2 is a short Text question with a format hint | No format error message on the live form |
| D-4 | **Number** input | Forms has no Number question type | F4 is Text with **Restrictions -> Number** | Min/max not enforced |
| D-5 | **Time picker** | Forms has no Time question type | F17 / F27 are Dropdowns of time slots | A list rather than a clock control |
| D-6 | Custom **Thank You & Summary** page | Forms gives a fixed confirmation screen | Set the confirmation message in Settings | No read-only answer summary |
| D-7 | Conditional thank-you wording (`case_study = Yes` -> "We'll contact you soon") | The confirmation message cannot be conditional | One combined thank-you message | Wording is not personalised |
| D-8 | 10-question survey | This build has 27 questions across 10 sections | Kept - the extra questions carry the remaining input types and the branch drivers | The form is a superset of the assignment, not a subset |

These deviations do **not** weaken the project. The local replica in `app/` exists precisely so all
35 test cases run deterministically against every one of the 15 types; the published form is the
demonstration deliverable.

### 10b. What was actually published (verified 2026-10-20)

The published form ended up shorter and differently wired than this guide's 10-section plan. The
verified build is:

- **6 pages / 6 sections / 29 questions**, anonymous, default Microsoft thank-you screen.
- Input types live: text short, text long, choice radio, checkboxes, dropdown, rating, NPS, date,
  ranking, Likert, section. **No file upload** (anonymous forms cannot have one - D-2) and no real
  time picker (D-5).
- Restrictions that exist: name minimum length 3 (`rule10`), e-mail format (`rule11`), numeric
  headcount (`IsNumber`), likes maximum length (`rule9`). Name has **no maximum**, headcount accepts
  **0** and **decimals** - logged as DEF-012, DEF-013, DEF-014.
- **Only the satisfaction question routes.** Rating and NPS are collected but not used for branching
  (DEF-008, DEF-009), because a Forms section applies one branch and the last branching question wins.
- A satisfied respondent completes S3A and is then shown S3B "Why are you not fully satisfied?"
  (DEF-011). Dissatisfied answers skip S3B: "Neither"/"Somewhat dissatisfied" jump to the
  Recommendation page and "Very dissatisfied" turns Page 2 into the final Submit step (DEF-004).
- The recommended-to-a-colleague answer reveals the wrong follow-up sets, and changing the answer
  never removes the questions from the previous selection (DEF-005, DEF-006, DEF-007).

The live survey is automated by `pages/MicrosoftFormsPage.ts` in the `live` project, not by the
replica page objects. Its per-case results are in `TEST_CASES.md` and `TEST_EXECUTION_REPORT.md`.

---

## 11. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| New questions keep joining the previous page | You added a question, not a section | `+ Add new` -> **Section** to start the next page |
| I cannot find **Section** in the + Add new panel | It sits at the bottom of the question-type list | Scroll down in the panel, or use the **+ Add new question** button at the bottom of the form |
| A page is in the wrong place | Sections are added at the bottom | **More settings for section** (**...**) -> **Move section** -> Move up / Move down |
| A respondent sees a question that should be skipped | A branch answer was left on "Next question" | Re-open **Add branching** and set a **Go to** for every answer |
| A branch points somewhere wrong after editing | Moving/inserting questions or sections can rewrite destinations | Re-check every **Go to**, then preview again |
| No **Dropdown** option on a Choice question | Tenant UI difference | Use a short Choice list and note the deviation |
| No **Restrictions** option on a Text question | Tenant UI difference | Keep F4 as Text with the hint `numbers only` |
| **File upload** is greyed out | The form is set to "Anyone can respond" | Switch to "Only people in my organization can respond", or delete F21 |
| Branching panel shows no per-value rows on Rating/NPS | Expected - that is why F11 and F18 exist | Keep the Choice branch drivers |

---

## 12. When you are done - send these back

1. The **published form URL** (Collect responses -> Copy link).
2. The **screenshots** placed in `docs/evidence/forms/`.

The published URL is already wired in:

- `config/liveForm.ts` holds the responder link and the question/choice map,
- `tests/live/`, `tests/datadriven/` and `tests/multilingual/` run against it in the `live` project:
  `npx playwright test --project=live`,
- the results are recorded in `docs/TEST_EXECUTION_REPORT.md` (Run 13) and the URL is in the `README`.

The live DOM differs from the replica's `data-testid` markup, so a Forms-specific page object
(`pages/MicrosoftFormsPage.ts`) owns its locators; the replica stays in place so the deterministic
35-case suite is never lost.

---

## 13. Quick reference - assignment question to form question

| Assignment | Form question(s) |
|-----------|------------------|
| Q1 full name (Text) | F1 |
| Q2 email (Email) | F2 (D-3) |
| Q3 became a customer (Date) | F8 |
| Q4 recommend us 0-10 (NPS) | F10 |
| Q5 rate your overall experience (Rating) | F9 |
| Q6 which features (Checkboxes) | F6 |
| Q7 customer segment (Dropdown) | F7 |
| Q8 satisfied with quality (Likert) | F23 |
| Q9 describe your experience (Paragraph) | F12, F15, F20, F22 |
| Q10 preferred contact time (Time) | F17, F27 (D-5) |
| Extended: Ranking | F16, F24 |
| Extended: Multiple choice "How did you hear about us?" | F5 |
| Extended: Number "How many employees?" | F4 (D-4) |
| Extended: File upload "screenshot" | F21 |
| Extended: Branching "if rating < 4, explain why" | F15 via BRANCH A |
| Page 1 Demographics (extra company) | F3 |
| Page 2 Rating/NPS branch drivers | F11, F18 (D-1, D-2) |
| Page 3 Purchase date | F14 |
| Page 4 Case study | F19 |
| Page 5 Preferred contact method | F26 |
