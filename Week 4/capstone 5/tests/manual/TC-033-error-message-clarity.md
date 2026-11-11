# TC-033 - Error message clarity

| Field | Detail |
|-------|--------|
| Type | Manual |
| Technique | Exploratory review of the validation wording |
| Module | manual |
| Method | Manual (read each message in context) |
| Executed by | QA (manual pass) |
| Environment | Local replica, Chromium |

## Description

Trigger every validation message in the survey and read it from the point of view of a first-time
user. The message must say what is wrong and be placed next to the question it belongs to.

## Pre-conditions

- The survey is running locally and every branch can be reached.

## Steps

1. Open each page, leave the required questions empty and click Next.
2. Read each message and the question it sits under.
3. Type or choose a valid answer and confirm the message disappears.
4. For the file upload, attach a wrong file type and read the message.
5. Record whether each message is clear, correct and well placed.

## Messages reviewed

| Question | Message | Clear? | Placed under the question? |
|----------|---------|--------|----------------------------|
| Q1 Name | Please enter your name (3 to 100 characters). | Yes - states the rule | Yes |
| Q2 Email | Please enter a valid email address. | Yes | Yes |
| Q3 Company | Please enter your company name. | Yes | Yes |
| Q4 Employees | Please enter a number greater than 0. | Yes | Yes |
| Q5 Heard about us | Please select an option. | Yes | Yes |
| Q6 Features | Please select at least one feature. | Yes - explains more than one is allowed | Yes |
| Q7 Rating | Please select a rating. | Yes | Yes |
| Q8 NPS | Please select a score from 0 to 10. | Yes - states the range | Yes |
| Q9 Liked most | Please share what you like most. | Yes | Yes |
| Q10 Best feature | Please select a feature. | Yes | Yes |
| Q11 Purchase date | Please select a valid date. | Yes | Yes |
| Q9b Not satisfied | Please tell us why you are not satisfied. | Yes | Yes |
| Q11b Contact time | Please select a contact time. | Yes | Yes |
| Q12 Case study | Please select an option. | Yes | Yes |
| Q12b Would make it a 10 | Please share your suggestion. | Yes | Yes |
| Q12c File upload | File type not allowed or file is too large. | Yes - covers both causes | Yes |
| Q12d Issue details | Please describe the issue. | Yes | Yes |
| Q15 Follow-up | Please select an option. | Yes | Yes |
| Q13 Contact method | Please select a contact method. | Yes | Yes |
| Q17 Likert | Please select an option. | Yes, though "option" is vague for a scale | Yes |

## Observations

- Every message is short, polite and written as an instruction, which is easy to follow.
- Messages appear directly under the question they belong to, so the same wording ("Please select an
  option.") is never ambiguous even when it is reused by several questions.
- The messages that state a rule (name length, NPS range, at least one feature, file type/size) are the
  most helpful because they tell the user how to fix the problem.
- Colour and position: the messages are shown in a distinct colour under the field, and the field
  itself is marked with `aria-invalid`, so the problem is easy to spot.
- Minor wording note (not blocking): Q17 (the agreement scale) reuses "Please select an option."
  "Please select a response." would read slightly better for a scale.

## Workflow - how this test works

```
for each page:
  click Next with the required questions empty
  for each visible question:
    read the message and check it is clear and sits under the question
  enter a valid answer
    confirm the message disappears
attach a wrong file type to the upload question and read the message
record each message and any wording suggestion
```

## Result

**Pass.** All 20 messages are clear, correct and correctly placed. One minor wording suggestion was
recorded for Q17.
