# ShopEasy E-Commerce - Exploratory Testing Notes

| Field | Value |
|---|---|
| Session ID | EXP-01 |
| Charter | "Explore the cart badge behaviour, order-history visibility and checkout robustness under repeated use; discover defects beyond the seeded set." |
| Time-box | 45 minutes (2026-10-12, 16:00 - 16:45) |
| Tester | A. Thakur |
| Technique | Session-based exploratory testing (charter -> notes -> debrief -> defect intake) |

## 1. Charter
Explore the ShopEasy application for behaviour that is not covered by the scripted 50-case suite:
1. Cart badge consistency under rapid, repeated add-to-cart actions.
2. Order-history visibility across users, guests and sessions (data isolation).
3. Checkout and payment robustness at boundary values and repeated actions (coupon re-apply,
   address fields, rapid double-submit).
4. General product/catalogue navigation observations (stretch UI details).

## 2. Session notes (timeline)
| Time | Focus | Observation |
|---|---|---|
| 16:00 - 16:10 | Badge consistency | Adding products 10 consecutive times, the cart badge read 0 in **5 of 10 adds (~50%)** until a page change corrected it. Intermittent - new candidate defect **DEF-007** (badge stale after add). |
| 16:10 - 16:20 | Order visibility | A **guest** session saw all orders including `maya.test@example.com`'s order. Logging in as a different user (**eight.pass@example.com**) still listed all 12 orders from every account. Data isolation broken - new candidate defect **DEF-014**. |
| 16:20 - 16:30 | Checkout boundaries | Coupon **SAVE10** applied repeatedly stacks the discount (Rs 140 -> Rs 280 -> Rs 420) - candidate **DEF-010**. Pincodes of 5 and 7 digits are accepted - candidate **DEF-011**. |
| 16:30 - 16:40 | Payments | Card order of Rs 1,499 shows a gateway receipt of Rs 1,599 - shipping charged twice - candidate **DEF-003**. UPI above Rs 5,000 shows a raw '500 Internal Server Error' page instead of an order - candidate **DEF-005**. Smartwatch purchase via UPI tested twice to confirm. |
| 16:40 - 16:45 | Stretch / misc | Split-payment option (multi-method checkout) is **not offered** anywhere in the checkout flow - documented as an absent stretch feature (BR-13 split-payment N/A). No defects logged for it. SE-1001 order total verified at Rs 1,499 with status Paid. Badge count cross-checked against cart length after page reload (correct after reload). |

## 3. Findings and defect intake
| # | Finding | Severity / Priority | Intaken as | Reproducibility |
|---|---|---|---|---|
| 1 | Cart badge shows 0 intermittently after adding | Minor / P3 | DEF-007 | 5/10 adds in the timed run (flaky) |
| 2 | Orders list shows all users' orders, including across login states | Major / P2 | DEF-014 | Every repeat (guest and each user) |
| 3 | Coupon SAVE10 stacks on repeated apply | Major / P2 | DEF-010 | Every repeat |
| 4 | 5- and 7-digit pincodes accepted | Minor / P3 | DEF-011 | Every repeat |
| 5 | Gateway charges shipping twice on card/UPI orders | Critical / P1 | DEF-003 | Every card/UPI order with shipping > 0 |
| 6 | UPI payment above Rs 5,000 raises a 500 error | Critical / P1 | DEF-005 | Every repeat on the Rs 6,499 product |
| 7 | Split payments (stretch) not present in the UI | n/a | Documented only | Feature absence |

## 4. Discussion / debrief (what worked, what didn't)
- **What worked:** rapid repeated actions exposed the intermittent badge defect (DEF-007); the
  cross-user orders check is cheap and highly effective for data-isolation findings (DEF-014);
  boundary re-pokes (coupon re-apply, pincode, shipping threshold, gateway receipts) surfaced cluster
  defects efficiently.
- **What didn't:** viewport/device emulation is unavailable (375 px check blocked, ER-01) and no
  interactive pointer exists for hover checks (ER-04) - these remain manual follow-ups.
- Screenshot capture proved flaky mid-session; a second capture pass later succeeded and produced the
  evidence set in deliverable 9.

## 5. Follow-ups
- DEF-014 raised beyond the seeded defect set - recommend a Build 1.2 fix and user-isolation tests.
- Confirm DEF-007 fix by 20 repeated adds (expect 0 zeros) in the Build 1.1 retest (result: badges 1,2,3 across three adds - no zeros observed).
- Verify DEF-009/DEF-013 visually on a desktop/mobile session as scheduled in the test summary report.