# CityCare Hospital Management System
## Project Plan

---

# Project Objective

Develop a CL Hospital Management System (HMS) using Python OOP principles and Git Version Control.

The system demonstrates following things:

1. Class and Objects, Encapsulation, Inheritance, Multilevel Inheritance, Polymorphism, Abstraction, Composition, Custom Exceptions, Magic Methods, Strategy Pattern, Command Pattern, Reporting, Menu Driven Application, Git Branching and Pull Request Workflow

---

# Release 1 - Core HMS Foundation

## Sprint 1 - Project Setup

### Deliverables

1. Folder Structure
2. README.md
3. CHANGELOG.md
4. Project Plan
5. Sprint Notes
6. .gitignore

---

## Sprint 2 - Medicine Model

### Features

- Medicine Class
- Medicine Cost Calculation
- String Representation

---

## Sprint 3 - Ward Model

### Features

- Ward Class
- Bed Management
- Ward Occupancy
- Available Bed Calculation

---

## Sprint 4 - Person Abstract Class

### Features

- Abstract Person Class
- Abstract Method get_details()

---

## Sprint 5 - Validation & Encapsulation

### Features

- Age Validation
- Phone Validation
- Property Decorators
- Private Attributes

---

## Sprint 6 - Doctor Model

### Features

- Doctor Class
- Inheritance from Person
- Consultation Fee
- Specialization

---

## Sprint 7 - Patient class

### Features

- Patient Class
- Disease Tracking
- Inheritance from Person

---

## Sprint 8 - Nurse & Receptionist class

### Features

- Nurse Class
- Receptionist Class
- Staff Hierarchy

---

## Sprint 9 - Specialized Patient class

### Features

- InPatient
- OutPatient
- Patient Specialization

---

## Sprint 10 - Senior Doctor class

### Features

- SeniorDoctor
- Multilevel Inheritance
- Experience Tracking

---

## Sprint 11 - Billing System class

### Features

- Billable Abstraction
- Billing Service
- OPD Billing
- IPD Billing
- Tax Calculation
- Senior Citizen Discount

---

## Sprint 12 - Hospital Service Layer

### Features

- Hospital Class
- Patient Registration
- Doctor Management
- Nurse Management
- Ward Management
- Search Operations
- Admission and Discharge

---

## Sprint 13 - Exceptions & Magic Methods

### Features

#### Custom Exceptions

- HospitalError
- PatientNotFoundError
- DoctorNotAvailableError
- WardFullError
- InvalidOperationError

#### Magic Methods

- __repr__()
- __eq__()
- __len__()
- __contains__()
- __lt__()
- __add__()

---

## Sprint 14 - Final Release 1 Completion

### Features

- Appointment Model
- Prescription Model
- Bill Entity
- Complete Hospital Operations
- Full CLI Integration
- CityCare HMS Menu

---

# Release 2 - Advanced Business Scenarios

## R2-S01 Runtime OPD to IPD Conversion

### Features

- Patient Status Architecture
- Runtime Status Conversion
- OPDStatus
- IPDStatus

---

## R2-S02 Ward Transfer Tracking

### Features

- StayRecord
- Ward Tracking
- Bed Tracking
- Admission History

---

## R2-S03 Payment Strategy Pattern

### Features

- PaymentPolicy
- SelfPay
- GovernmentScheme
- PrivateInsurance
- CorporateTieUp
- ClaimRejectedError

---

## R2-S04 Doctor Leave Management

### Features

- Doctor Leave Records
- Patient Notification Logic
- Appointment Rescheduling Support

---

## R2-S05 Appointment Conflict Detection

### Features

- Overlapping Appointment Checks
- Booking Validation

---

## R2-S06 Patient State Machine

### Features

- ADMITTED
- UNDER_TREATMENT
- DISCHARGE_REQUESTED
- APPROVED
- BILLED
- DISCHARGED

### Exception

- InvalidTransitionError

---

## R2-S07 ICU Emergency Queue

### Features

- EmergencyCase
- Severity Based Queue
- Priority Handling

---

## R2-S08 Prescription Safety

### Features

- Allergy Checking
- Drug Interaction Protection

### Exceptions

- AllergyAlertError
- DrugInteractionError

---

## R2-S09 Nurse Coverage Rules

### Features

- Shift Assignment
- Coverage Management

---

## R2-S10 Undo Framework

### Features

- Command Pattern
- Execute Operations
- Undo Operations

---

## R2-S11 Reporting Module

### Features

- Ward Occupancy Report
- Revenue Report
- Patient Timeline
- Long Stay Reports

---

# Release 3 - Additional Features

## Release 3A - Clinical Services

### Laboratory System

- LabTest (Abstract)
- BloodTest
- XRay
- MRI
- ECG

### Health Packages

- HealthPackage
- Package Cost Calculation

---

## Release 3B - Support Services

### Payroll

- Payroll
- Salary Calculation

### Blood Bank

- Blood Inventory Management
- BloodUnavailableError

### Ambulance

- Basic Ambulance
- Advanced Life Support Ambulance

### Bed Lifecycle

- AVAILABLE
- OCCUPIED
- CLEANING
- MAINTENANCE

---

## Release 3C - Advanced Operations

### Surgery Management

- Surgery
- OperationTheatre
- ResourceConflictError

### Diet Management

- DietPlan

### Visitor Management

- VisitorPass
- VisitorPolicyError

### Referral Management

- Referral

### Follow-Up Management

- FollowUp

### Advanced Search

- Patient Search by Name
- Patient Timeline

---

# Testing Strategy

## Test Modules

- test_patient.py
- test_doctor.py
- test_billing.py
- test_hospital.py

### Validation Areas

- Patient Registration
- Doctor Registration
- Billing
- Hospital Operations
- Exceptions
- Reports

---

# Final Deliverables

## Documentation

- README.md
- CHANGELOG.md
- project-plan.md
- Sprint Notes

## Source Code

- Models
- Services
- Exceptions
- CLI

## Git Deliverables

- Feature Branches
- Pull Requests
- Merge History
- Release Tags

---

# Expected Outcome

A fully functional command-line Hospital Management System implementing Release 1, Release 2, and Release 3 requirements using Python OOP concepts and professional Git workflow.