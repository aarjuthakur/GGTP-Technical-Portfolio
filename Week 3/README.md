# Arju Thakur - Week 3 Projects

This folder contains two e-commerce testing capstones completed during Week 3. Capstone 3 focuses
on manual functional testing of ShopEasy; Capstone 4 applies automated end-to-end testing with
Playwright and TypeScript.

## Capstones

| Project | Focus | Start here |
|---|---|---|
| Capstone 3 - ShopEasy | Black-box manual functional testing across account access, product search, cart, checkout, payment, orders, and usability | [Capstone 3 README](./capstone%203/README.md) |
| Capstone 4 - E-commerce automation | Playwright and TypeScript end-to-end testing of the Automation Exercise website | [Capstone 4 README](./Capstone%204/README.md) |

## Capstone 3 - ShopEasy manual testing

The project documents 50 test cases mapped to 14 business rules, with test planning, exploratory
testing, execution evidence, defect tracking, retesting, regression checks, and a release
recommendation.

- [Test plan](./capstone%203/1_Test_Plan.md)
- [Test cases and results workbook](./capstone%203/Shop_EasyTest_Cases.xlsx)
- [Exploratory notes](./capstone%203/7_Exploratory_Notes.md)
- [Test summary report](./capstone%203/8_Test_Summary_Report.md)
- [Execution screenshots](./capstone%203/9_Screenshots/)
- [Project presentation](./capstone%203/ShopEasy_Capstone_Presentation1.pptx)

The recorded results report a **No-Go** for Build 1.0 and a **Go with documented residual risks**
for Build 1.1. These are historical project results, not a fresh execution.

## Capstone 4 - Playwright automation

The project uses Playwright Test with TypeScript to exercise e-commerce workflows against the
public Automation Exercise website. It includes page objects, fixtures, JSON test data, and
Chromium, Firefox, and WebKit browser projects.

- [Automation project README](./Capstone%204/README.md) - prerequisites, setup, commands, structure, and result interpretation
- [Test status report](./Capstone%204/TEST_STATUS_REPORT.md)
- [Complete report workbook](./Capstone%204/Playwright_Capstone_Complete_Report.xlsx)
- [Project presentation](./Capstone%204/Playwright_Capstone_Presentation.pptx)

From the Capstone 4 folder, install dependencies and browser binaries with `npm ci` and
`npx playwright install`; run the configured browser suite with `npm test`. The checked-in
cross-browser results are historical and the README documents known report inconsistencies; run
the suite to obtain current results.

## Suggested review order

1. Read each capstone's README for its scope and deliverables.
2. Review the plan and test design before the execution reports.
3. Use the linked workbook, evidence, and presentation for supporting details.
