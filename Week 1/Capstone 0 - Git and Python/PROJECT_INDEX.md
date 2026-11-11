# CityCare HMS Project Index

This index maps each main CLI option to the file containing its workflow and the
models/services that support it. Internal project links are relative to this
file.

The menu is displayed by `show_menu()` in [`hms/cli.py`](hms/cli.py). The
`main()` function in that file dispatches menu choices. [`hms/main.py`](hms/main.py)
is the application entry point; run it with `python -m hms.main`.

| Option | Menu item | CLI logic | Model / service logic |
|---|---|---|---|

|**1** | Register Patient | `main()`, option 1 | [`patient.py`](hms/models/patient.py), [`person.py`](hms/models/person.py) (shared validation), [`hospital.py`](hms/services/hospital.py) (`register_patient`) |

========================================================================================================================

| **2** | Add Doctor | `main()`, option 2 | [`doctor.py`](hms/models/doctor.py), [`hospital.py`](hms/services/hospital.py) (`add_doctor`) |

=========================================================================================================================

| **3** | Add Staff (Nurse/Receptionist) | `_add_staff()` | [nurse.py](hms/models/nurse.py), [`receptionist.py`](hms/models/receptionist.py), [`hospital.py`](hms/services/hospital.py) (`add_nurse`) |

========================================================================================================================

| 4 | View Patients | `main()`, option 4 | [`hospital.py`](hms/services/hospital.py) (`view_patients`), [`patient.py`](hms/models/patient.py) |

=============================================================================================================================

| 5 | View Doctors | `main()`, option 5 | [`hospital.py`](hms/services/hospital.py) (`view_doctors`), [`doctor.py`](hms/models/doctor.py) |

=============================================================================================================================

| 6 | Search Patient | `main()`, option 6 | [`hospital.py`](hms/services/hospital.py) (`search_patient`) |

====================================================================================================================================

| 7 | Book Appointment | `main()`, option 7 | [`appointment.py`](hms/models/appointment.py), [`hospital.py`](hms/services/hospital.py) (`book_appointment`, `search_patient`, `find_doctor`) |

=========================================================================================================================
| 8 | View Appointments | `main()`, option 8 | [`hospital.py`](hms/services/hospital.py) (`view_appointments`), [`appointment.py`](hms/models/appointment.py) |

======================================================================================================================================

| 9 | Cancel Appointment | `main()`, option 9 | [`appointment.py`](hms/models/appointment.py) (`cancel`), [`hospital.py`](hms/services/hospital.py) (`cancel_appointment`) |

=========================================================================================================================

| 10 | Admit Patient | `main()`, option 10 | [`ward.py`](hms/models/ward.py), [`hospital.py`](hms/services/hospital.py) (`admit_patient`) |
=========================================================================================================================

| 11 | Discharge Patient | `main()`, option 11 | [`ward.py`](hms/models/ward.py), [`hospital.py`](hms/services/hospital.py) (`discharge_patient`) |

=========================================================================================================================

| 12 | Ward Management | `_ward_management()` | [`ward.py`](hms/models/ward.py), [`hospital.py`](hms/services/hospital.py) (`add_ward`, admit/discharge methods) |

=========================================================================================================================

| 13 | Add Prescription | `main()`, option 13 | [`prescription.py`](hms/models/prescription.py), [`medicine.py`](hms/models/medicine.py), [`hospital.py`](hms/services/hospital.py) (`add_prescription`) |

=========================================================================================================================

| 14 | Generate Bill | `main()`, option 14 | [`bill.py`](hms/models/bill.py), [`bill_services.py`](hms/services/bill_services.py), [`payments/`](hms/services/payments/), [`hospital.py`](hms/services/hospital.py) (`generate_bill`) |

=========================================================================================================================

| 15 | View Bills | `main()`, option 15 | [`hospital.py`](hms/services/hospital.py) (`view_bills`), [`bill.py`](hms/models/bill.py) |

=========================================================================================================================

| 16 | Reports Dashboard | `_reports_dashboard()` | [`hospital.py`](hms/services/hospital.py) (`revenue_report`, `ward_occupancy_report`); stay, earnings, and timeline calculations are in [`cli.py`](hms/cli.py) |

=========================================================================================================================

| 17 | Payment Policy Management | `_payment_policy_menu()` | [`payment_policy.py`](hms/services/payments/payment_policy.py) and implementations in [`payments/`](hms/services/payments/) |

=========================================================================================================================

| 18 | Emergency & ICU Queue | `_emergency_menu()` | [`emergency_case.py`](hms/models/emergency_case.py), [`doctor_leave.py`](hms/models/doctor_leave.py); queue/leave handling is in [`cli.py`](hms/cli.py). ICU patients use a ward configured as ICU via option 12. |

=========================================================================================================================

| 19 | Laboratory & Health Packages | `_laboratory_menu()` | Models in [`lab/`](hms/models/lab/), including [`health_package.py`](hms/models/lab/health_package.py); the workflow is in [`cli.py`](hms/cli.py) |

=========================================================================================================================

| 20 | Surgery & Advanced Services | `_advanced_services_menu()` | [`surgery.py`](hms/models/surgery.py), [`operation_theatre.py`](hms/models/operation_theatre.py), [`ambulance.py`](hms/models/ambulance.py), [`blood_bank.py`](hms/models/blood_bank.py), [`payroll.py`](hms/models/payroll.py), [`diet_plan.py`](hms/models/diet_plan.py), [`visitor_pass.py`](hms/models/visitor_pass.py), [`referral.py`](hms/models/referral.py), [`follow_up.py`](hms/models/follow_up.py) |

=========================================================================================================================

## Submenus

| Main option | Submenu choices | Handler |
|---|---|---|
| 12. Ward Management | 1 Add Ward; 2 View Wards; 3 View Ward Occupancy; 4 Ward Transfer | `_ward_management()` |

=========================================================================================================================

| 16. Reports Dashboard | 1 Revenue Report; 2 Ward Occupancy Report; 3 Long Stay Patients; 4 Doctor Earnings; 5 Patient Timeline | `_reports_dashboard()` |

=========================================================================================================================

| 17. Payment Policy Management | 1 Self Pay; 2 Government Scheme; 3 Private Insurance; 4 Corporate Tie-up | `_payment_policy_menu()` |

=========================================================================================================================

| 18. Emergency & ICU Queue | 1 Add Emergency Case; 2 View Priority Queue; 3 Doctor Leave Management | `_emergency_menu()` |

=========================================================================================================================

| 19. Laboratory & Health Packages | 1 Add Lab Test; 2 Blood Test; 3 X-Ray; 4 MRI; 5 ECG; 6 Create Health Package; 7 View Health Packages | `_laboratory_menu()` |

=========================================================================================================================

| 20. Surgery & Advanced Services | 1 Schedule Surgery; 2 Operation Theatre Booking; 3 Ambulance Management; 4 Blood Bank; 5 Payroll; 6 Diet Plan; 7 Visitor Pass; 8 Referral; 9 Follow Up | `_advanced_services_menu()` |

=========================================================================================================================
## Data Storage

The CLI currently keeps records in memory for the duration of the run. It does
not save them to a database or file.
