# ShopEasy E-Commerce - QA Capstone Test Plan

| Field | Value |
|---|---|
| Project | ShopEasy E-Commerce web application |
| Build under test | Build 1.0 (seed defects enabled) / Build 1.1 (defects resolved, retest) |
| Test type | Black-box functional / system testing (manual execution, UI-automated in a Selenium-style console) |
| Test period | 2026-10-12 |
| Prepared by | A. Thakur (QA trainee) |
| Facilitator | Facilitator (environment / data control, PIN-protected panel) |
| Document status | Final |

---

## 1. Introduction
This test plan defines the scope, approach, resources and schedule for testing the ShopEasy e-commerce
application. The application supports account management, product search, cart, checkout, payments
(credit card / UPI / Cash on Delivery), order management and returns.

## 2. Scope (Modules in test)
| Code | Module | # Test cases |
|---|---|---|
| AUTH | Account & Login (Registration, Login, Lockout, Reset) | 10 |
| SRCH | Product Search | 5 |
| CART | Product & Cart | 8 |
| CHKT | Checkout (address validation, shipping, coupons) | 9 |
| PAY | Payment (card / UPI / COD, gateway, reward points) | 10 |
| ORD | Orders & Returns (stretch) | 3 |
| UI | UI / Usability (stretch) | 2 |
| E2E | End-to-end journey (stretch) | 1 |
| DT | Decision-table validation (stretch) | 1 |
| EXP | Exploratory session (stretch) | 1 |
| **Total** | | **50** |

## 3. Out of scope
- Performance, load and stress testing.
- Security penetration testing beyond rule-level checks (e.g., password rules, account lockout, order visibility).
- API / integration testing of the payment gateway (test gateway only).
- Cross-browser matrix (single Chromium profile used).
- Real payments with real card/UPI (test data only).

## 4. Test strategy & techniques
Black-box functional testing, with UI driven through console-level DOM interaction (treated as
Selenium-style UI automation). Each business rule is exercised using a defined technique:

- **Equivalence Partitioning (EP)** - 18 cases
- **Boundary Value Analysis (BVA)** - 9 cases
- **Decision Table** - 7 cases (12-rule coupon/shipping/payment matrix executed in TC-DT-01, plus
  payment-method and coupon-interaction cases)
- **State Transition** - TC-ORD-01/02, TC-AUTH-09 (order statuses: Placed/Packed/Shipped/Delivered/
  Cancelled/Returned; account Active/Locked)
- **Use Case / End-to-End** - TC-E2E-01, transactional use cases (add-to-cart, login, COD)
- **Exploratory** - TC-EXP-01 charter (45-minute session, findings documented in 7_Exploratory_Notes.md)

**Test design minimums satisfied:** >=10 P1 cases (17), >=6 BVA cases (9), >=4 EP cases (18),
decision table >=6 rules (12), >=1 state-transition set, >=1 end-to-end use case, >=1 exploratory charter.

## 5. Test environment
| Item | Value |
|---|---|
| Application URL | http://127.0.0.1:8099/index%20(2).html |
| Browser | Chromium (desktop profile) |
| Automation | Console-level DOM interaction + screenshot captures |
| Test data | Seeded catalogue (12 products/8 categories), test users, test cards & UPI handles |
| Reporting files | This package (10 deliverables) in the deliverables folder |

## 6. Test data
| Data | Value | Used for |
|---|---|---|
| Users | maya.test@example.com / Valid#123; lock.test@example.com / Valid#123; test.user, eight.pass, sixteen.pass (blocked), e2e.user | AUTH / E2E |
| Card (approved) | 4111 1111 1111 1111 | PAY positive |
| Card (declined) | 4000 0000 0000 0002 | PAY negative |
| Invalid card | 1234 5678 9012 | PAY field validation |
| UPI | name@bank (e.g., maya@okbank) | PAY UPI |
| Coupons | SAVE10 (10%, valid); OLD20 (expired) | CHKT |
| Orders | SE-1001 ... (sequence from 1001) | ORD |
| Facilitator panel access | PIN-protected (admin log) | environment control |

- No real personal or card data is used anywhere in this project.
- Environment changes are requested in writing and logged (ER-01 .. ER-04, see 4_Execution_Report.xlsx).

## 7. Roles and responsibilities
| Role | Responsibility |
|---|---|
| QA Trainee (A. Thakur) | Design cases, execute, verify, log defects, build deliverables |
| Facilitator | Maintain/seed defects, reset data, advance order statuses, age deliveries (admin panel) |
| Trainer / Reviewer | Review deliverables and sign-off |

## 8. Entry / Exit criteria
**Entry:** application available; seed defects documented; test data prepared; tools ready.

**Exit:**
1. 0 open defects with severity Critical / P1 / Major **or** documented, justified residual risk.
2. 100% business-rule coverage (each BR has at least one linked test case).
3. 100% of test cases executed **or** blocked with a written reason (ER-01, ER-04).
4. Go / No-Go recommendation produced in 8_Test_Summary_Report.md.

## 9. Schedule (2026-10-12)
| Step | Window | Result |
|---|---|---|
| AUTH + SRCH execution | 09:00 - 11:00 | 15 cases executed |
| CART + CHKT execution | 11:00 - 14:00 | 17 cases executed |
| PAY execution | 14:00 - 16:00 | 10 cases executed (incl. UPI/COD/rewards) |
| ORD + UI + E2E + DT + EXP | 16:00 - 18:00 | 8 cases executed/blocked |
| Retest & regression (Build 1.1) | 18:00 - 19:00 | 14 defects retested; 8 regression checks |
| Deliverables compilation | 19:00 - 21:00 | Package finalized |

## 10. Risks and mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| 375 px viewport cannot be emulated (window.resizeTo ineffective) | TC-UI-01 blocked; DEF-009 un-verified | Environment request ER-01; case marked Blocked with reason |
| No interactive pointer (hover) in automation | TC-UI-02 blocked; DEF-013 un-verified | Environment request ER-04; visual check pending on a desktop session |
| Defect seeding toggles | Retest validity | Retest run with seeded defects disabled; evidence captured for each fix |
| Flaky screenshot tool early in session | Evidence coverage | Re-tried capture late in session; 25 evidence captures produced plus DOM-asserted results |

## 11. Deliverables
1. **1_Test_Plan.md** (this document)
2. **2_Test_Cases.csv** - 50 cases with verified results, evidence, technique and BR for each
3. **3_Traceability_Matrix.xlsx** - BR-01..BR-14 to test cases, coverage summary
4. **4_Execution_Report.xlsx** - execution detail, module metrics, environment requests, screenshot inventory, learnings
5. **5_Defect_Log.xlsx** - DEF-001 .. DEF-014
6. **6_Retest_Regression.xlsx** - Build 1.1 retest + regression
7. **7_Exploratory_Notes.md** - exploratory charter and findings
8. **8_Test_Summary_Report.md** - Go / No-Go recommendation
9. **9_Screenshots/** - 25 evidence captures + capture protocol README
10. **10_Sign_Off_Sheet.xlsx** - deliverable checklist and sign-off

## 12. Approval
This plan is approved for execution by the QA trainee and the facilitator; final sign-off is recorded in deliverable 10.