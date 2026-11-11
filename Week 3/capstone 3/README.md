# Capstone 3: ShopEasy E-Commerce Manual Testing

**Tester:** Arju Thakur

**Project type:** Black-box functional testing

**Application:** ShopEasy E-Commerce, Builds 1.0 and 1.1

## Project overview

This capstone applies a structured manual testing process to an online store. The work covers the
core shopping and payment journeys, records defects, retests fixes in a second build, and provides a
release recommendation. Testing was performed in Chromium against the local ShopEasy test
environment; the application itself is not included in this folder.

The test suite contains **50 cases** mapped to **14 business rules**. It covers five core areas -
account and login, product search, cart, checkout, and payment - plus extended scenarios for orders
and returns, UI/usability, an end-to-end journey, decision-table validation, and exploratory testing.

## Test approach

The test plan uses black-box functional testing and these design techniques:

- Equivalence partitioning and boundary value analysis
- Decision tables for coupon, shipping, and payment combinations
- State-transition checks for account and order states
- An end-to-end shopping journey
- A time-boxed exploratory session

The test data is for this capstone only. No real customer or payment details are used.

## Deliverables in this folder

| File or folder | Description |
|---|---|
| [1_Test_Plan.md](./1_Test_Plan.md) | Scope, environment, test techniques, schedule, entry/exit criteria, and planned deliverables |
| [Shop_EasyTest_Cases.xlsx](./Shop_EasyTest_Cases.xlsx) | Test cases, defect log, retest/regression, traceability, and summary/coverage worksheets |
| [7_Exploratory_Notes.md](./7_Exploratory_Notes.md) | Exploratory charter, session observations, and findings |
| [8_Test_Summary_Report.md](./8_Test_Summary_Report.md) | Results, defect summary, retest/regression outcomes, and release recommendation |
| [9_Screenshots/](./9_Screenshots/) | Execution evidence and screenshot inventory |
| [ShopEasy_Capstone_Presentation1.pptx](./ShopEasy_Capstone_Presentation1.pptx) | Capstone presentation |

## Results at a glance

The detailed results are in [8_Test_Summary_Report.md](./8_Test_Summary_Report.md).

- **Build 1.0:** 34 passed, 14 failed, and 2 blocked out of 50 cases; the report recommends **NO-GO**.
- **Build 1.1:** 14 defects were retested (11 verified, 2 pending environmental/visual checks, and 1 reopened); all 8 recorded regression checks passed.
- **Release recommendation:** The report recommends **GO for Build 1.1 with documented residual risks**. DEF-014, a major cross-user order-visibility issue, was reopened and is recommended for follow-up in Build 1.2; the pending visual checks also require follow-up.

These figures describe the recorded project execution, not a fresh run.

## Review order

1. Start with the [test plan](./1_Test_Plan.md) for scope and approach.
2. Review the [test cases workbook](./Shop_EasyTest_Cases.xlsx) and [evidence](./9_Screenshots/).
3. Read the [exploratory notes](./7_Exploratory_Notes.md) and [test summary](./8_Test_Summary_Report.md).
4. View the [presentation](./ShopEasy_Capstone_Presentation1.pptx) for a project overview.
