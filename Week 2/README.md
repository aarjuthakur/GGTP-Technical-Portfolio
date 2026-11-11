# OrangeHRM Functional Testing Capstone

## Project Overview

Manual functional testing of OrangeHRM v5.9 (Community Edition) - an open-source Human Resource Management System. This project covers end-to-end testing of 7 core HR modules with 43 test cases, defect logging, and a comprehensive test report.

**Tester:** Arju Thakur  
**Course:** Perficient Automation Testing Course  
**Test Period:** October 8-9, 2026  
**Application URL:** http://localhost/orangehrm/web/index.php/auth/login

---

## Test Environment

| Component       | Details                                    |
|-----------------|--------------------------------------------|
| Application     | OrangeHRM OS v5.9 (Community Edition)      |
| Server          | XAMPP (Apache + MySQL) on Windows 11       |
| Browser         | Google Chrome (latest stable)              |
| Database        | MySQL (orangehrm_db1)                      |
| OS              | Windows 11 Enterprise                      |

---

## Modules Tested

1. **User & Access Management** - Login, logout, password reset, role assignment, account deactivation
2. **Employee Information Management** - Add/edit/terminate employee, photo upload, directory, document upload
3. **Leave Management** - Apply/approve/reject/cancel leave, balance tracking, special characters
4. **Attendance Tracking** - Punch in/out, view records, edit attendance, report generation
5. **Recruitment & Hiring** - Create/publish vacancy, add candidate, review application, schedule interview
6. **Performance Management** - Create review, assign goals/KPIs, submit feedback, view ratings
7. **Data Validation & Error Handling** - Mandatory fields, date/email format, duplicate prevention, session timeout, concurrent edits

---

## How I Approached This Project (Manual Testing Workflow)

### Phase 1: Understand the Application

Before writing any test cases, I explored OrangeHRM as an end user. I navigated through every module, clicked every menu, and understood what each feature does. This gave me a clear picture of the application's functionality and helped identify what needs testing.

### Phase 2: Define Test Scope

From the capstone assignment requirements, I identified 7 modules that cover the core HR operations. For each module, I listed out the key features and functionalities that needed to be verified. This became my test scope - what is in scope and what is out of scope.

### Phase 3: Design Test Cases Using Testing Techniques

For each feature, I designed test cases using standard testing techniques:

- **Equivalence Partitioning:** Divided inputs into valid and invalid groups. For example, for login - valid credentials (should succeed), invalid password (should fail), empty fields (should show validation). Instead of testing hundreds of combinations, one representative from each group is sufficient.

- **Boundary Value Analysis (BVA):** Tested at the edges of input ranges. For example, leave balance limits - what happens when you request exactly your remaining balance versus one day more than available.

- **Positive Testing (Happy Path):** Verified that features work correctly with valid inputs. Does login work with correct credentials? Does adding an employee with all required data succeed?

- **Negative Testing:** Intentionally broke things. Wrong passwords, missing mandatory fields, duplicate employee IDs, invalid date formats (99/99/9999), malformed email addresses (test@).

- **Error Guessing:** Based on common failure patterns, tested things that typically break in web applications - special characters in text fields (& @ /), concurrent edits by two users on the same record, session timeout behavior, oversized file uploads.

### Phase 4: Write Structured Test Cases

Each test case was documented with a clear structure:

| Field            | Purpose                                           |
|------------------|---------------------------------------------------|
| Test Case ID     | Unique identifier (e.g., TC-1.1)                  |
| Module           | Which module it belongs to                        |
| Title            | What is being tested                              |
| Pre-Conditions   | What must be true before the test starts           |
| Test Steps       | Step-by-step instructions to execute               |
| Expected Result  | What should happen if the feature works correctly  |
| Actual Result    | What actually happened during execution            |
| Status           | Pass / Fail / Skip                                |
| Execution Date   | When the test was run                             |
| Evidence         | Screenshot filename for proof                     |

### Phase 5: Set Up the Test Environment

1. Installed XAMPP (Apache web server + MySQL database)
2. Deployed OrangeHRM v5.9 on localhost
3. Configured the MySQL database (orangehrm_db1)
4. Created admin user account
5. Verified all modules are accessible from the dashboard
6. Took installation screenshots as proof of successful setup

### Phase 6: Execute Tests Systematically

Executed all 43 test cases one by one, following each step exactly as written:

1. Set up the pre-conditions
2. Followed the test steps in order
3. Observed and recorded the actual result
4. Compared actual vs expected result
5. Marked the status: **Pass** (matched), **Fail** (didn't match), or **Skip** (couldn't execute)
6. Took a screenshot immediately as evidence
7. Moved to the next test case

### Phase 7: Log Defects

Whenever a test failed or I found unexpected behavior, I created a defect entry with:

- **Severity & Priority** - How critical is it and how urgently should it be fixed
- **Steps to Reproduce** - Exact steps so a developer can recreate the issue
- **Expected vs Actual Result** - Clear comparison of what should happen vs what did happen
- **Root Cause Analysis** - My analysis of why the defect exists
- **Recommendation** - Suggested fix approach

### Phase 8: Analyze Results and Write Test Report

After all tests were executed, I compiled a comprehensive test report with:

- **Test Metrics** - Pass/fail/skip counts, pass percentage per module
- **Executive Summary** - High-level findings for stakeholders
- **Module-Wise Analysis** - Detailed breakdown of each module's results
- **Risk Assessment** - Identified risks with severity, likelihood, and mitigation
- **Go/No-Go Recommendation** - Based on results, recommended "Conditional Go"

### Phase 9: Document Lessons Learned

Captured insights from the entire testing process - environment setup challenges, application-specific behaviors, test design improvements, and defect discovery techniques that would be useful for future projects.

---

## Test Results Summary

| Metric                  | Value     |
|-------------------------|-----------|
| Total Test Cases        | 43        |
| Passed                  | 38        |
| Failed                  | 2         |
| Skipped                 | 3         |
| Pass Rate (Executed)    | **95.0%** |
| Pass Rate (Overall)     | 88.4%     |
| Defects Found           | 4         |
| Recommendation          | Conditional Go |

### Pass Rate Calculation

```
Executed Tests = Total - Skipped = 43 - 3 = 40
Pass Rate = (Passed / Executed) x 100 = (38 / 40) x 100 = 95%
```

### Defects Found

| ID      | Title                                    | Severity | Module              |
|---------|------------------------------------------|----------|---------------------|
| DEF-001 | Concurrent Edit Has No Locking Mechanism | Critical | Employee Management |
| DEF-002 | Published Vacancy Not Visible in List    | High     | Recruitment         |
| DEF-003 | No File Size Validation on Upload        | Medium   | Employee Management |
| DEF-004 | Password Reset Needs SMTP Configuration  | Medium   | User Management     |

---

## Project Deliverables

| #  | Deliverable              | File                                                        |
|----|--------------------------|------------------------------------------------------------|
| 1  | Test Report Spreadsheet  | `capstone 2 testing/Testing_report_sheet.xlsx`             |
| 2  | Installation Screenshots | `capstone 2 testing/screenshots/Installation_*.png` (3)    |
| 3  | Test Case Screenshots    | `capstone 2 testing/screenshots/TC-*.png` (49)             |

The `Testing_report_sheet.xlsx` contains test cases, execution results, defect log, and lessons learned in a single workbook.

---

## Folder Structure

```
capstone 2 testing/
├── Testing_report_sheet.xlsx
└── screenshots/
    ├── Installation_Dashboard_Proof.png
    ├── Installation_Admin_Users.png
    ├── Installation_Admin_Module.png
    ├── fatal_error.png
    ├── TC-1.1_login_valid.png
    ├── TC-1.2_login_invalid_password.png
    ├── ... (49 test case screenshots across 7 modules)
    └── TC-7.6_concurrent_edit.png
```

---

## Testing Techniques Used

| Technique                  | Where Applied                                              |
|----------------------------|------------------------------------------------------------|
| Equivalence Partitioning   | Login (valid/invalid/empty), leave balance (sufficient/insufficient) |
| Boundary Value Analysis    | Date formats, leave balance limits, field length limits    |
| Positive Testing           | All happy-path scenarios (valid login, add employee, apply leave) |
| Negative Testing           | Wrong passwords, missing fields, duplicate IDs, bad formats |
| Error Guessing             | Special characters, concurrent edits, session timeout, oversized files |
