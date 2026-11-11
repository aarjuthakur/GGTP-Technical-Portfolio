# Capstone 2 - OrangeHRM Functional Testing

Manual functional testing of OrangeHRM v5.9 (Community Edition) across 7 core HR modules.

## Project Summary

| Item | Detail |
|------|--------|
| Application | OrangeHRM v5.9 (Community Edition) |
| Testing Type | Manual Functional Testing |
| Environment | XAMPP (Apache + MySQL), Windows 11, Chrome |
| Test Cases | 43 total |
| Pass Rate | 95% (38 passed, 2 failed, 3 skipped) |
| Defects Found | 4 |
| Recommendation | Conditional Go |

## Modules Tested

1. **User and Access Management** - Login, role-based access, user CRUD operations
2. **Employee Information Management** - Employee records, personal details, job information
3. **Leave Management** - Leave types, entitlements, apply/approve workflows
4. **Attendance Tracking** - Punch in/out, attendance records
5. **Recruitment and Hiring** - Job vacancies, candidate management, hiring workflow
6. **Performance Management** - KPI tracking, performance reviews
7. **Data Validation and Error Handling** - Form validations, boundary values, error messages

## Setup Instructions

### Prerequisites

- XAMPP (Apache + MySQL)
- Chrome browser
- OrangeHRM v5.9 Community Edition

### Installation

1. Install XAMPP and start Apache and MySQL services
2. Download OrangeHRM v5.9 from the official website
3. Extract to `C:\xampp\htdocs\orangehrm`
4. Open `http://localhost/orangehrm` in Chrome
5. Follow the OrangeHRM installation wizard (configure database, admin credentials)
6. Log in with the admin account to begin testing

## Deliverables

| File | Description |
|------|-------------|
| [Testing_report_sheet.xlsx](./Testing_report_sheet.xlsx) | Test cases, execution results, defect log, and lessons learned |
| [screenshots/](./screenshots/) | 52 screenshots: 3 installation + 49 test case evidence (TC-*.png) |

## How to Use the Test Report

1. Open `Testing_report_sheet.xlsx`
2. Review the **Test Cases** sheet for all 43 test scenarios with steps, expected results, and actual results
3. Check the **Defect Log** sheet for the 4 identified defects with severity and priority
4. See the **Lessons Learned** sheet for insights from the testing cycle

## Skills Learned

- Manual test case design and execution
- Defect identification, logging, and severity classification
- XAMPP local server environment setup (Apache + MySQL)
- OrangeHRM application domain knowledge (HR workflows)
- Test reporting and go/no-go recommendation
- Screenshot-based test evidence documentation
