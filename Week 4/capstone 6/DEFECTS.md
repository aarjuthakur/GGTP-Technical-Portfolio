# ShopEasy Defect Report

## Summary

| ID | Title | Severity | Area | Test Method |
|----|-------|----------|------|-------------|
| D01 | Cart accepts quantity above 10 | Major | Cart | testQuantityAboveMaximumRejected |
| D02 | Search is case-sensitive | Major | Search | testSearchCaseInsensitiveShoes |
| D03 | Gateway charges shipping twice | Critical | Checkout | testGatewayChargeMatchesOrderTotal |
| D04 | Account not locked after 5 failed logins | Major | Login | testAccountLockAfter5FailedAttempts |
| D05 | UPI payment returns error 500 above Rs 5,000 | Critical | Payment | testUpiPaymentAbove5000 |
| D06 | Free shipping threshold off-by-one | Major | Checkout | testFreeShippingAtExactly2000 |
| D07 | Cart badge intermittently shows 0 | Minor | Cart | testCartBadgeVisibleAfterAdd |
| D08 | Shipped orders can be cancelled | Major | Orders | testCancelShippedOrderShouldFail |
| D09 | Pay button overlaps address on mobile | Minor | Checkout | testPayButtonNoOverlapAt375px |
| D10 | Coupon discount stacks on reapply | Major | Checkout | testCouponDoesNotStackOnReapply |
| D11 | Pincode accepts 5 and 7 digits | Minor | Checkout | testPincode5DigitsRejected |
| D12 | 16-character password rejected | Minor | Register | testRegisterWith16CharPassword |
| D13 | Terms link missing hover underline | Trivial | Footer | testTermsLinkUnderlineOnHover |
| D14 | Orders list shows every user's orders | Major | Orders | testOrdersFilteredByUser |

---

## D01: Cart accepts quantity above 10

- **Severity**: Major (P2)
- **Area**: Cart
- **Steps to Reproduce**:
  1. Open any product page
  2. Set quantity to 11
  3. Click "Add to Cart"
- **Expected**: Error message "Maximum quantity is 10" should be displayed
- **Actual**: Quantity 11 or higher is accepted without validation
- **Root Cause**: The max quantity guard (`n > 10`) is skipped when defect is active
- **Test**: `CartTests.testQuantityAboveMaximumRejected`

## D02: Search is case-sensitive

- **Severity**: Major (P2)
- **Area**: Product Search
- **Steps to Reproduce**:
  1. Search for "Shoes" (capital S)
  2. Note the result count
  3. Search for "shoes" (lowercase)
  4. Compare result counts
- **Expected**: Both searches should return identical results (case-insensitive)
- **Actual**: "shoes" returns fewer or no results because the search needle is not lowercased
- **Root Cause**: The search query is not converted to lowercase before comparison
- **Test**: `ProductSearchTests.testSearchCaseInsensitiveShoes`

## D03: Gateway charges shipping twice

- **Severity**: Critical (P1)
- **Area**: Checkout / Payment
- **Steps to Reproduce**:
  1. Login and add an item to cart
  2. Go to checkout with standard shipping (Rs 100)
  3. Pay with card (non-COD)
  4. Compare order total displayed vs gateway charge amount
- **Expected**: Gateway charge should equal the order total (which already includes shipping)
- **Actual**: Gateway charge adds shipping a second time (total + shipping again)
- **Root Cause**: Shipping cost is added to the charge on top of the total that already includes it
- **Test**: `PaymentTests.testGatewayChargeMatchesOrderTotal`

## D04: Account not locked after 5 failed logins

- **Severity**: Major (P1)
- **Area**: Login / Security
- **Steps to Reproduce**:
  1. Attempt login with wrong password 5 times for `lock.test@example.com`
  2. Try logging in with the correct password `Valid#123`
- **Expected**: Account should be locked after 5 failed attempts; login with correct password should show "locked" error
- **Actual**: Account is never locked; correct password succeeds after 5 failures
- **Root Cause**: The `u.locked = true` assignment is skipped after 5 failed attempts
- **Test**: `AuthTests.testAccountLockAfter5FailedAttempts`

## D05: UPI payment returns error 500 above Rs 5,000

- **Severity**: Critical (P1)
- **Area**: Payment
- **Steps to Reproduce**:
  1. Login and add a product costing more than Rs 5,000 (e.g., Smartwatch p6 at Rs 6,499)
  2. Go to checkout and select UPI payment
  3. Enter valid UPI ID (`name@bank`) and place order
- **Expected**: Order should be placed successfully
- **Actual**: Application shows a fake HTTP 500 error page
- **Root Cause**: UPI payments with total > 5000 trigger a hardcoded error response
- **Test**: `PaymentTests.testUpiPaymentAbove5000`

## D06: Free shipping threshold off-by-one (> instead of >=)

- **Severity**: Major (P2)
- **Area**: Checkout / Shipping
- **Steps to Reproduce**:
  1. Add items totaling exactly Rs 2,000 (e.g., 4x Cotton T-Shirt p7 at Rs 500 each)
  2. Go to checkout and check shipping cost
- **Expected**: Free shipping should apply at subtotal >= Rs 2,000
- **Actual**: Shipping of Rs 100 is still charged because the check uses `> 2000` (strictly greater)
- **Root Cause**: Off-by-one error in free shipping threshold comparison
- **Test**: `CheckoutTests.testFreeShippingAtExactly2000`

## D07: Cart badge intermittently shows 0 after adding item

- **Severity**: Minor (P3)
- **Area**: Cart / Navigation
- **Steps to Reproduce**:
  1. Add any item to the cart
  2. Observe the cart badge count in the navigation bar
  3. Repeat multiple times
- **Expected**: Badge should always show the correct item count
- **Actual**: Badge randomly shows 0 approximately 40% of the time
- **Root Cause**: A random condition sets the badge count to 0 during nav rendering
- **Test**: `CartTests.testCartBadgeVisibleAfterAdd`

## D08: Shipped orders can be cancelled

- **Severity**: Major (P2)
- **Area**: Orders
- **Steps to Reproduce**:
  1. Place an order
  2. Use admin API to advance the order to "Shipped" status
  3. Go to order history and check for cancel button
- **Expected**: Cancel button should NOT be visible for shipped orders
- **Actual**: Cancel button is available and shipped orders can be cancelled
- **Root Cause**: The cancellation check incorrectly includes "Shipped" as a valid cancellable status
- **Test**: `OrderTests.testCancelShippedOrderShouldFail`

## D09: Pay button overlaps address on mobile viewport

- **Severity**: Minor (P3)
- **Area**: Checkout / Responsive
- **Steps to Reproduce**:
  1. Navigate to checkout page and fill in address
  2. Resize viewport to 375px mobile width
  3. Observe the layout of the pay button relative to the pincode field
- **Expected**: All elements should be visible and non-overlapping
- **Actual**: Pay button overlaps the pincode/address section due to absolute positioning
- **Root Cause**: CSS `position:absolute` on `.pay-btn` with `bottom:-6px` at `@media(max-width:400px)`
- **Test**: `ResponsiveTests.testPayButtonNoOverlapAt375px`

## D10: Coupon discount stacks on reapply

- **Severity**: Major (P2)
- **Area**: Checkout / Coupons
- **Steps to Reproduce**:
  1. Login and add an item to cart
  2. Go to checkout and apply coupon `SAVE10`
  3. Note the total
  4. Apply `SAVE10` again
  5. Compare the total
- **Expected**: Total should remain unchanged; message "Coupon already applied"
- **Actual**: Discount doubles (20% off instead of 10%) because the coupon stacks
- **Root Cause**: Re-applying the coupon increments a counter and multiplies the discount
- **Test**: `CheckoutTests.testCouponDoesNotStackOnReapply`

## D11: Pincode accepts 5 and 7 digit values

- **Severity**: Minor (P3)
- **Area**: Checkout / Validation
- **Steps to Reproduce**:
  1. Login and add item to cart
  2. Go to checkout
  3. Enter 5-digit pincode "40001" and submit
  4. Also try 7-digit pincode "4000011"
- **Expected**: Only exactly 6-digit pincodes should be accepted
- **Actual**: 5, 6, and 7 digit pincodes are all accepted
- **Root Cause**: Pincode regex uses `{5,7}` instead of `{6}`
- **Test**: `EdgeCaseTests.testPincode5DigitsRejected`

## D12: 16-character password rejected at registration

- **Severity**: Minor (P3)
- **Area**: Registration
- **Steps to Reproduce**:
  1. Go to registration page
  2. Enter a 16-character password like "Abcdefgh12345678"
  3. Submit the registration form
- **Expected**: Password should be accepted (valid range is 8-16 characters)
- **Actual**: Password is rejected because the max length is set to 15 instead of 16
- **Root Cause**: Off-by-one error in password max length validation
- **Test**: `RegisterTests.testRegisterWith16CharPassword`

## D13: Terms link has no underline on hover

- **Severity**: Trivial (P4)
- **Area**: Checkout / CSS
- **Steps to Reproduce**:
  1. Navigate to checkout page
  2. Hover over the "Terms" link
- **Expected**: Link should show underline on hover like other links
- **Actual**: No underline appears on hover
- **Root Cause**: CSS class removes hover underline styling from the Terms link
- **Test**: `ResponsiveTests.testTermsLinkUnderlineOnHover`

## D14: Orders list shows every user's orders (not filtered)

- **Severity**: Major (P2)
- **Area**: Orders / Security
- **Steps to Reproduce**:
  1. Login as User A and place an order
  2. Login as User B and place an order
  3. Check each user's order list via GET /api/orders
- **Expected**: Each user should only see their own orders
- **Actual**: Orders list may show orders from other users (not filtered by logged-in user)
- **Root Cause**: The orders query does not filter by the current user's session
- **Test**: `OrderAPITests.testOrdersFilteredByUser`
- **Note**: This defect may only manifest in the UI frontend, not at the API level
