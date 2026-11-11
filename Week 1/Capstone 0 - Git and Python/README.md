# Hospital Management System

A command-line Hospital Management System built with Python OOP concepts and Git version control.

## Features

### Patient Management system 
- Register patients with personal details and disease tracking
- Search patients by ID or name (case-insensitive)
- Patient timeline view
- Support for InPatient (admitted) and OutPatient types
- Age and phone number validation

### Doctor Management
- Add and find doctors by ID,
- Doctor specialization and consultation fee tracking
- SeniorDoctor with experience years (multilevel inheritance)
- Doctor comparison by consultation fee

### Appointment Booking
- Book and cancel appointments
- Appointment status tracking (Scheduled, Completed, Cancelled)

### Room Management
- Ward management with bed tracking
- Admit and discharge patients
- Ward occupancy and availability checks

### Finance System
- Bill generation for patients
- BillService with tax calculation (5%)
- Senior citizen discount (10%)
- Bill addition support

### Surgery and Operations (Release 3)
- Surgery scheduling with patient and doctor assignment
- Operation Theatre booking with conflict detection
- Diet Plan management for patients
- Visitor Pass tracking
- Doctor-to-doctor referral workflow
- Follow-up appointment scheduling

### Error Handling
- Custom exception hierarchy (HospitalError base)
- PatientNotFoundError, DoctorNotAvailableError
- WardFullError, InvalidOperationError
- ResourceConflictError for theatre booking conflicts

## Project Structure

```
hms/
    __init__.py
    main.py                          # CLI entry point
    models/
        __init__.py
        person.py                    # Abstract base class
        patient.py                   # Patient model
        doctor.py                    # Doctor model
        nurse.py                     # Nurse model
        receptionist.py              # Receptionist model
        medicine.py                  # Medicine model
        ward.py                      # Ward model
        inpatient.py                 # InPatient (multilevel inheritance)
        outpatient.py                # OutPatient (multilevel inheritance)
        senior_doc.py                # SeniorDoctor (multilevel inheritance)
        bill.py                      # Bill entity model
        appointment.py               # Appointment model with status enum
        prescription.py              # Prescription model
        surgery.py                   # Surgery model
        operation_theatre.py         # Operation Theatre with booking
        diet_plan.py                 # Diet Plan model
        visitor_pass.py              # Visitor Pass model
        referral.py                  # Referral model
        follow_up.py                 # Follow-up model
    services/
        __init__.py
        hospital.py                  # Hospital service (composition)
        bill.py                      # Abstract Bill class
        bill_services.py             # BillService implementation
    exceptions/
        __init__.py
        hospital_exception.py        # Custom exception hierarchy
tests/
    __init__.py
    test_medicine.py
    test_ward.py
    test_patient.py                  # Patient, InPatient, OutPatient
    test_doctor.py                   # Doctor, SeniorDoctor
    test_staff.py                    # Nurse, Receptionist
    test_appointment.py
    test_prescription.py
    test_bill.py                     # Bill model + BillService
    test_hospital.py                 # Hospital service integration
    test_r3c_models.py              # Surgery, Theatre, Diet, Visitor, Referral, FollowUp
    test_exceptions.py
docs/
    project-plan.md
    sprint notes/
CHANGELOG.md
README.md
```

## OOP Concepts Used

- **Abstraction**: Person is an abstract base class (ABC) with abstract `get_details()`
- **Inheritance**: Doctor, Patient, Nurse, Receptionist extend Person
- **Multilevel Inheritance**: InPatient/OutPatient extend Patient; SeniorDoctor extends Doctor
- **Encapsulation**: Age and phone validation via property decorators
- **Composition**: Hospital class composes patients, doctors, wards, appointments, etc.
- **Magic Methods**: `__str__`, `__repr__`, `__eq__`, `__lt__`, `__len__`, `__contains__`, `__add__`
- **Polymorphism**: `get_details()` implemented differently in each subclass

## How to Run

### Prerequisites

- Python 3.10 or higher

### Run the Application

```bash
python -m hms.main
```

The interactive menu supports patient and doctor registration, appointment
booking/cancellation, ward creation and patient admission/discharge, prescription
entry, bill generation, and listing the saved records. Numeric, phone, amount,
and yes/no inputs are validated at the prompt. Add a ward with option 14 before
admitting a patient.

Linked sample records are loaded automatically when the application starts, so
the view options have data immediately. The demo includes patients
`P1001`/`P1002`, doctors `D1001`/`D1002`, appointment `A1001`, prescription
`RX1001`, and bill `B1001`. Option 17 can also be used during the session; it
will report that the sample data is already loaded. Data is held in memory for
that run only.

### Run Tests

```bash
python -m unittest discover -s tests -v
```

## Technologies 

- Python.
- Git.
- GitHub.

## Author

Arju Thakur
#complete read me guide
