# 9_Screenshots - Evidence captures for ShopEasy QA Capstone

## Capture protocol
- **Tool:** Chromium desktop profile; console-level DOM interaction to place the application into the
  required state, followed by a full-page screenshot capture.
- **Naming:** `TC-<module>-<case>_<context>.png` for case evidence and `DEF-0n_<context>.png` naming
  for defect evidence; every capture below is keyed to its defects/test cases.
- **Verification:** every result in 2_Test_Cases.csv is **DOM-verified** (messages, totals, statuses,
  errors read live from the rendered page). Screenshots are supporting visual evidence, not the only
  source of truth.

## Environment limitation (honest reporting)
- The screenshot tool was **flaky** for parts of the session (first captures succeeded, then failed
  with "Screenshot needs a visible tab" for a period, then worked again late in the session).
- 25 captures listed below were successfully saved; the remaining case results that have no dedicated
  visual are DOM-asserted and reference the nearest related capture (see the Evidence column in
  2_Test_Cases.csv and the Screenshots sheet in 4_Execution_Report.xlsx).
- TC-UI-01 (375 px, DEF-009) and TC-UI-02 hover (DEF-013) have no capture: TC-UI-01 is Blocked
  (ER-01 - viewport not emulatable), TC-UI-02 is Blocked for hover (ER-04) and its Terms-page state is
  shown in `TC-UI-02_terms_footer.png`.

## Inventory
| # | File | Shows | Linked |
|---|---|---|---|
| 1 | TC-UI-02_products_grid.png | Products grid (home) | TC-AUTH-01, TC-SRCH-04, TC-UI-02 |
| 2 | TC-AUTH-05_register_form.png | Create Account page | TC-AUTH-02..05 |
| 3 | TC-AUTH-05_D12_16char_error.png | 16-char password rejected (DEF-012) | TC-AUTH-05 |
| 4 | TC-AUTH-06_login_success.png | Successful login (maya) | TC-AUTH-06, TC-AUTH-10 |
| 5 | TC-AUTH-07_wrong_password.png | Generic login error | TC-AUTH-07 |
| 6 | TC-AUTH-08_login_form.png | Login form | TC-AUTH-08, TC-AUTH-09 |
| 7 | TC-CART-04_product_page.png | Product page + Add to cart | TC-CART-01,02,04,05 |
| 8 | TC-CART-03_D01_qty11_cart.png | Cart qty 11 accepted (DEF-001) + badge | TC-CART-03, TC-CART-06, TC-CART-08 |
| 9 | TC-CART-07_cart_empty.png | Empty cart | TC-CART-07 |
| 10 | TC-CHKT-05_D06_shipping100.png | Rs 100 shipping at exactly Rs 2,000 (DEF-006) | TC-CHKT-01..05 |
| 11 | TC-CHKT-06_D10_stack_apply2.png | Coupon applied once | TC-CHKT-09 |
| 12 | TC-CHKT-06_D10_stack_apply3.png | Coupon stacked x3 (DEF-010) | TC-CHKT-06, TC-DT-01 |
| 13 | TC-CHKT-07_old20_expired.png | Expired coupon message | TC-CHKT-07 |
| 14 | TC-CHKT-08_invalid_coupon.png | Invalid coupon message | TC-CHKT-08 |
| 15 | TC-PAY-05_D03_checkout.png | Checkout summary | TC-PAY-02,03,04,08 |
| 16 | TC-PAY-05_D03_confirmation.png | Total Rs 600, charged Rs 700 (DEF-003) | TC-PAY-01,05,06,09,10, TC-E2E-01 |
| 17 | TC-PAY-07_D05_checkout_6499.png | Smartwatch Rs 6,499 checkout | TC-PAY-07 |
| 18 | TC-PAY-07_D05_500_page.png | 500 Internal Server Error (DEF-005) | TC-PAY-07 |
| 19 | TC-ORD-01_cancel_button.png | Orders page - cancel options (DEF-008) | TC-ORD-01 |
| 20 | TC-ORD-02_return_accepted.png | Return accepted SE-1002 | TC-ORD-02 |
| 21 | TC-ORD-03_D14_orders_leak.png | All users' orders visible (DEF-014) | TC-ORD-03, TC-EXP-01 |
| 22 | TC-UI-02_terms_footer.png | Footer Terms link (DEF-013 context) | TC-UI-02 |
| 23 | TC-SRCH-01_D02_case_sensitive.png | 'Shoes' = 0 results (DEF-002) | TC-SRCH-01, TC-SRCH-05 |
| 24 | TC-SRCH-02_partial_shoe.png | Partial search 'shoe' works | TC-SRCH-02, TC-SRCH-03 |
| 25 | TC-PAY-07_D05_checkout_b.png | UPI high-value checkout (second run) | TC-PAY-07 |

## Where to find the full mapping
- **Per case:** Evidence column in 2_Test_Cases.csv.
- **Per defect:** Evidence column in 5_Defect_Log.xlsx.
- **Cross-reference:** Screenshots sheet in 4_Execution_Report.xlsx.