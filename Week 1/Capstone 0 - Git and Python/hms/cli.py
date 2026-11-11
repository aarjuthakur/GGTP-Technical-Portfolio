import heapq
import math
import re
from datetime import datetime

from hms.exceptions.hospital_exception import HospitalError
from hms.models.ambulance import Ambulance
from hms.models.appointment import Appointment, AppointmentStatus
from hms.models.blood_bank import BloodBank, BloodUnavailableError
from hms.models.bill import Bill
from hms.models.diet_plan import DietPlan
from hms.models.doctor import Doctor
from hms.models.doctor_leave import DoctorLeave
from hms.models.emergency_case import EmergencyCase
from hms.models.follow_up import FollowUp
from hms.models.lab.blood_test import BloodTest
from hms.models.lab.ecg import ECG
from hms.models.lab.health_package import HealthPackage
from hms.models.lab.mri import MRI
from hms.models.lab.xray import XRay
from hms.models.medicine import Medicine
from hms.models.nurse import Nurse
from hms.models.operation_theatre import (
    OperationTheatre,
    ResourceConflictError,
)
from hms.models.patient import Patient
from hms.models.payroll import Payroll
from hms.models.prescription import Prescription
from hms.models.receptionist import Receptionist
from hms.models.referral import Referral
from hms.models.surgery import Surgery
from hms.models.visitor_pass import VisitorPass
from hms.models.ward import Ward
from hms.services.bill_services import BillService
from hms.services.hospital import Hospital
from hms.services.payments.corporate import CorporateTieUp
from hms.services.payments.goverment_scheme import GovernmentScheme
from hms.services.payments.private_insurance import PrivateInsurance
from hms.services.payments.self_pay import SelfPay


def _required_text(prompt):
    while True:
        value = input(prompt).strip()
        if value:
            return value
        print("This value cannot be empty. Please try again.")


def _name(prompt):
    pattern = re.compile(r"^[A-Za-z][A-Za-z .'-]*$")
    while True:
        value = input(prompt).strip()
        if not value:
            print("This value cannot be empty. Please try again.")
        elif not pattern.fullmatch(value):
            print(
                "Name must contain only letters, spaces, apostrophes, "
                "hyphens, and periods."
            )
        else:
            return value


def _integer(prompt, minimum=0, maximum=None):
    while True:
        value = input(prompt).strip()
        try:
            number = int(value)
        except ValueError:
            print("Please enter a whole number.")
            continue
        if number < minimum:
            print(f"Please enter a number of at least {minimum}.")
        elif maximum is not None and number > maximum:
            print(f"Please enter a number no greater than {maximum}.")
        else:
            return number


def _phone_number(prompt):
    while True:
        phone = input(prompt).strip()
        if len(phone) == 10 and phone.isdigit():
            return phone
        print("Phone number must contain exactly 10 digits.")


def _gender(prompt):
    genders = {"female": "Female", "male": "Male"}
    while True:
        value = input(prompt).strip().casefold()
        if value in genders:
            return genders[value]
        print("Please enter Female or Male.")


def _amount(prompt):
    while True:
        value = input(prompt).strip()
        try:
            amount = float(value)
        except ValueError:
            print("Please enter a valid amount.")
            continue
        if not math.isfinite(amount) or amount < 0:
            print("Amount must be a finite, non-negative number.")
        else:
            return amount


def _yes_no(prompt):
    while True:
        answer = input(prompt).strip().casefold()
        if answer in ("yes", "y"):
            return True
        if answer in ("no", "n"):
            return False
        print("Please enter yes or no.")


def _menu_choice(prompt, valid_choices):
    choice = input(prompt).strip()
    if choice not in valid_choices:
        print("Invalid choice. Please select a listed menu option.")
        return None
    return choice


def _find_appointment(hospital, appointment_id):
    return next(
        (
            appointment
            for appointment in hospital.appointments
            if appointment.appointment_id == appointment_id
        ),
        None,
    )


def _find_prescription(hospital, prescription_id):
    return next(
        (
            prescription
            for prescription in hospital.prescriptions
            if prescription.prescription_id == prescription_id
        ),
        None,
    )


def _load_demo_data(hospital, admissions, state):
    if any(
        patient.patient_id in {"P1001", "P1002"}
        for patient in hospital.patients
    ):
        print("Demo data has already been loaded.")
        return

    patient = Patient(
        "PER1001", "Jordan Lee", 34, "5551234567", "Female",
        "P1001", "Seasonal flu",
    )
    second_patient = Patient(
        "PER1002", "Sam Patel", 68, "5559876543", "Male",
        "P1002", "Routine checkup",
    )
    doctor = Doctor(
        "D1001", "Dr. Avery Morgan", 42, "5552223344", "Female",
        "General Medicine", 250.0,
    )
    second_doctor = Doctor(
        "D1002", "Dr. Taylor Reed", 50, "5553334455", "Male",
        "Cardiology", 400.0,
    )
    general_ward = Ward("General", 10, 150.0)
    cardiac_ward = Ward("Cardiology", 5, 300.0)
    for registered_patient in (patient, second_patient):
        hospital.register_patient(registered_patient)
    for registered_doctor in (doctor, second_doctor):
        hospital.add_doctor(registered_doctor)
    hospital.add_ward(general_ward)
    hospital.add_ward(cardiac_ward)

    hospital.admit_patient(patient, general_ward)
    admissions[patient.patient_id] = general_ward
    state["admission_dates"][patient.patient_id] = datetime.now()

    hospital.book_appointment(
        Appointment(
            "A1001", second_patient, second_doctor,
            "2026-10-07 10:00 AM",
        )
    )
    prescription = Prescription("RX1001", doctor, patient)
    prescription.add_medicine(Medicine("Paracetamol", "500 mg", 3, 10.0))
    hospital.add_prescription(prescription)

    bill_amount = BillService(
        doctor.consultation_fee, 30.0, general_ward.per_day_charge
    ).calculate_bill()
    hospital.generate_bill(Bill("B1001", patient, bill_amount))
    state["doctor_earnings"][doctor.person_id] = doctor.consultation_fee

    print("Demo data loaded. Sample IDs:")
    print("Patients: P1001, P1002")
    print("Doctors: D1001, D1002")
    print("Appointment: A1001 | Prescription: RX1001 | Bill: B1001")


def show_menu():
    print("\n====================================================")
    print("      CityCare Hospital Management System")
    print("====================================================")
    print("1.  Register Patient")
    print("2.  Add Doctor")
    print("3.  Add Staff (Nurse/Receptionist)")
    print("4.  View Patients")
    print("5.  View Doctors")
    print("6.  Search Patient")
    print("7.  Book Appointment")
    print("8.  View Appointments")
    print("9.  Cancel Appointment")
    print("10. Admit Patient")
    print("11. Discharge Patient")
    print("12. Ward Management")
    print("13. Add Prescription")
    print("14. Generate Bill")
    print("15. View Bills")
    print("16. Reports Dashboard")
    print("17. Payment Policy Management")
    print("18. Emergency & ICU Queue")
    print("19. Laboratory & Health Packages")
    print("20. Surgery & Advanced Services")
    print("0.  Exit")
    print("====================================================")


def _ward_management(hospital, admissions):
    choices = {
        "1": "Add Ward",
        "2": "View Wards",
        "3": "View Ward Occupancy",
        "4": "Ward Transfer",
    }
    while True:
        print("\n--- Ward Management ---")
        for key, label in choices.items():
            print(f"{key}. {label}")
        print("0. Back")
        choice = _menu_choice("Select: ", set(choices) | {"0"})
        if choice is None:
            continue
        if choice == "0":
            return
        try:
            if choice == "1":
                ward_type = _required_text("Ward type: ")
                if any(
                    ward.ward_type.casefold() == ward_type.casefold()
                    for ward in hospital.wards
                ):
                    print("A ward with this type already exists.")
                    continue
                ward = Ward(
                    ward_type,
                    _integer("Total beds: ", 1),
                    _amount("Per-day charge: "),
                )
                hospital.add_ward(ward)
                print(f"Ward added: {ward}")
            elif choice == "2":
                if not hospital.wards:
                    print("No wards are configured.")
                for ward in hospital.wards:
                    print(ward)
            elif choice == "3":
                if not hospital.wards:
                    print("No wards are configured.")
                for ward in hospital.wards:
                    print(
                        f"{ward.ward_type}: "
                        f"{ward.beds_occupied}/{ward.total_beds} occupied, "
                        f"{ward.beds_available()} available"
                    )
            elif choice == "4":
                patient_id = _required_text("Patient ID: ")
                old_ward = admissions.get(patient_id)
                if old_ward is None:
                    print("This patient is not currently admitted.")
                    continue
                for index, ward in enumerate(hospital.wards, start=1):
                    print(f"{index}. {ward}")
                target_number = _integer("Destination ward number: ", 1)
                if target_number > len(hospital.wards):
                    print("That ward number does not exist.")
                    continue
                target = hospital.wards[target_number - 1]
                if target is old_ward:
                    print("The patient is already in that ward.")
                    continue
                hospital.admit_patient(
                    hospital.search_patient(patient_id), target
                )
                hospital.discharge_patient(old_ward)
                admissions[patient_id] = target
                print(
                    f"Patient {patient_id} transferred to "
                    f"{target.ward_type}."
                )
        except (ValueError, HospitalError) as error:
            print(f"Unable to complete ward operation: {error}")


def _reports_dashboard(hospital, admissions, state):
    choices = {
        "1": "Revenue Report",
        "2": "Ward Occupancy Report",
        "3": "Long Stay Patients",
        "4": "Doctor Earnings",
        "5": "Patient Timeline",
    }
    while True:
        print("\n--- Reports Dashboard ---")
        for key, label in choices.items():
            print(f"{key}. {label}")
        print("0. Back")
        choice = _menu_choice("Select: ", set(choices) | {"0"})
        if choice is None:
            continue
        if choice == "0":
            return
        if choice == "1":
            print(f"Total revenue: {hospital.revenue_report():.2f}")
        elif choice == "2":
            report = hospital.ward_occupancy_report()
            if not report:
                print("No ward occupancy data available.")
            for ward_name, occupied in report.items():
                print(f"{ward_name}: {occupied} occupied")
        elif choice == "3":
            minimum_days = _integer("Minimum stay in days: ", 1)
            long_stays = [
                (patient_id, admitted_at)
                for patient_id, admitted_at
                in state["admission_dates"].items()
                if (datetime.now() - admitted_at).days >= minimum_days
            ]
            if not long_stays:
                print("No patients meet that stay duration.")
            for patient_id, admitted_at in long_stays:
                patient = hospital.search_patient(patient_id)
                days = (datetime.now() - admitted_at).days
                print(f"{patient.name} ({patient_id}): {days} days")
        elif choice == "4":
            if not state["doctor_earnings"]:
                print("No doctor earnings recorded.")
            for doctor in hospital.doctors:
                earned = state["doctor_earnings"].get(doctor.person_id, 0)
                print(f"{doctor.name}: {earned:.2f}")
        elif choice == "5":
            patient = hospital.search_patient(
                _required_text("Patient ID: ")
            )
            ward = admissions.get(patient.patient_id)
            status = f"Admitted to {ward.ward_type}" if ward else "Not admitted"
            print(f"Patient timeline: {patient.name} ({patient.patient_id})")
            print(f"Status: {status}")
            for appointment in hospital.appointments:
                if appointment.patient == patient:
                    print(
                        f"Appointment {appointment.appointment_id}: "
                        f"{appointment.slot} ({appointment.status.value})"
                    )
            for bill in hospital.bills:
                if bill.patient == patient:
                    print(f"Bill {bill.bill_id}: {bill.amount:.2f}")
            for prescription in hospital.prescriptions:
                if prescription.patient == patient:
                    print(f"Prescription {prescription.prescription_id}")
            for surgery in hospital.surgeries:
                if surgery.patient == patient:
                    print(f"Surgery {surgery.surgery_id}: {surgery.surgery_type}")
            for referral in hospital.referrals:
                if referral.patient == patient:
                    print(
                        f"Referral: {referral.from_doctor.name} to "
                        f"{referral.to_doctor.name}"
                    )
            for follow_up in hospital.follow_ups:
                if follow_up.patient == patient:
                    print(f"Follow-up: {follow_up.followup_date}")
            for plan in hospital.diet_plans:
                if plan.patient == patient:
                    print(f"Diet plan: {plan.diet_name}")
            for record in state["lab_tests"]:
                if record["patient"] == patient:
                    print(
                        f"Lab test {record['id']}: "
                        f"{record['test'].test_name}"
                    )


def _payment_policy_menu(state):
    policies = {
        "1": ("Self Pay", SelfPay),
        "2": ("Government Scheme", GovernmentScheme),
        "3": ("Private Insurance", PrivateInsurance),
        "4": ("Corporate Tie-up", CorporateTieUp),
    }
    while True:
        print("\n--- Payment Policy Management ---")
        for key, (name, _) in policies.items():
            print(f"{key}. {name}")
        print("0. Back")
        choice = _menu_choice("Select policy: ", set(policies) | {"0"})
        if choice is None:
            continue
        if choice == "0":
            return
        name, policy_class = policies[choice]
        state["payment_policy"] = policy_class()
        state["payment_policy_name"] = name
        print(f"Active payment policy: {name}")


def _emergency_menu(hospital, state):
    while True:
        print("\n--- Emergency & ICU Queue ---")
        print("1. Add Emergency Case")
        print("2. View Priority Queue")
        print("3. Doctor Leave Management")
        print("0. Back")
        choice = _menu_choice("Select: ", {"0", "1", "2", "3"})
        if choice is None:
            continue
        if choice == "0":
            return
        try:
            if choice == "1":
                patient = hospital.search_patient(
                    _required_text("Patient ID: ")
                )
                severity = _integer("Severity (1 low - 5 critical): ", 1, 5)
                case = EmergencyCase(patient, severity)
                state["emergency_sequence"] += 1
                heapq.heappush(
                    state["emergency_queue"],
                    (-severity, state["emergency_sequence"], case),
                )
                print(f"Emergency case queued for {patient.name}.")
            elif choice == "2":
                if not state["emergency_queue"]:
                    print("The emergency queue is empty.")
                for priority, _, case in sorted(state["emergency_queue"]):
                    print(
                        f"Severity {-priority}: {case.patient.name} "
                        f"({case.patient.patient_id})"
                    )
            elif choice == "3":
                doctor = hospital.find_doctor(
                    _required_text("Doctor ID: ")
                )
                leave_date = _required_text("Leave date (YYYY-MM-DD): ")
                leave = DoctorLeave(doctor, leave_date)
                state["doctor_leaves"].append(leave)
                affected = 0
                for appointment in hospital.appointments:
                    if (
                        appointment.doctor == doctor
                        and leave_date in appointment.slot
                        and appointment.status == AppointmentStatus.SCHEDULED
                    ):
                        appointment.cancel()
                        affected += 1
                print(
                    f"Leave recorded for {doctor.name}; "
                    f"{affected} matching appointment(s) cancelled for rescheduling."
                )
        except (ValueError, HospitalError) as error:
            print(f"Unable to complete emergency operation: {error}")


def _add_lab_test(hospital, state, test_type=None):
    patient = hospital.search_patient(_required_text("Patient ID: "))
    if test_type is None:
        print("1. Blood Test  2. X-Ray  3. MRI  4. ECG")
        choice = _menu_choice("Test type: ", {"1", "2", "3", "4"})
        if choice is None:
            return
        test_type = {"1": "Blood Test", "2": "X-Ray", "3": "MRI", "4": "ECG"}[
            choice
        ]
    cost = _amount("Test cost: ")
    test_classes = {
        "Blood Test": BloodTest,
        "X-Ray": XRay,
        "MRI": MRI,
        "ECG": ECG,
    }
    test = test_classes[test_type](cost)
    test_id = _required_text("Lab test ID: ")
    if any(record["id"] == test_id for record in state["lab_tests"]):
        print("A lab test with this ID already exists.")
        return
    state["lab_tests"].append(
        {"id": test_id, "patient": patient, "test": test}
    )
    print(f"Lab test recorded: {test_id} - {test.get_details()}")


def _laboratory_menu(hospital, state):
    while True:
        print("\n--- Laboratory & Health Packages ---")
        print("1. Add Lab Test")
        print("2. Blood Test")
        print("3. X-Ray")
        print("4. MRI")
        print("5. ECG")
        print("6. Create Health Package")
        print("7. View Health Packages")
        print("0. Back")
        choice = _menu_choice(
            "Select: ", {"0", "1", "2", "3", "4", "5", "6", "7"}
        )
        if choice is None:
            continue
        if choice == "0":
            return
        try:
            if choice in {"1", "2", "3", "4", "5"}:
                test_type = {
                    "2": "Blood Test",
                    "3": "X-Ray",
                    "4": "MRI",
                    "5": "ECG",
                }.get(choice)
                _add_lab_test(hospital, state, test_type)
            elif choice == "6":
                package_name = _required_text("Package name: ")
                if any(
                    package.package_name.casefold() == package_name.casefold()
                    for package in state["health_packages"]
                ):
                    print("A package with this name already exists.")
                    continue
                if not state["lab_tests"]:
                    print("Add lab tests before creating a package.")
                    continue
                for index, record in enumerate(state["lab_tests"], start=1):
                    print(
                        f"{index}. {record['id']} - "
                        f"{record['test'].get_details()}"
                    )
                package = HealthPackage(package_name)
                for index in range(
                    _integer("Number of tests to include: ", 1),
                ):
                    test_number = _integer(
                        f"Test number {index + 1}: ", 1
                    )
                    if test_number > len(state["lab_tests"]):
                        raise ValueError("That lab test number does not exist.")
                    package.add_test(
                        state["lab_tests"][test_number - 1]["test"]
                    )
                state["health_packages"].append(package)
                print(f"Health package created: {package}")
            elif choice == "7":
                if not state["health_packages"]:
                    print("No health packages are available.")
                for package in state["health_packages"]:
                    print(package)
        except (ValueError, HospitalError) as error:
            print(f"Unable to complete laboratory operation: {error}")


def _advanced_services_menu(hospital, state):
    while True:
        print("\n--- Surgery & Advanced Services ---")
        labels = (
            "Schedule Surgery",
            "Operation Theatre Booking",
            "Ambulance Management",
            "Blood Bank",
            "Payroll",
            "Diet Plan",
            "Visitor Pass",
            "Referral",
            "Follow Up",
        )
        for index, label in enumerate(labels, start=1):
            print(f"{index}. {label}")
        print("0. Back")
        choice = _menu_choice(
            "Select: ", {str(number) for number in range(10)}
        )
        if choice is None:
            continue
        if choice == "0":
            return
        try:
            if choice == "1":
                patient = hospital.search_patient(
                    _required_text("Patient ID: ")
                )
                doctor = hospital.find_doctor(
                    _required_text("Doctor ID: ")
                )
                surgery_id = _required_text("Surgery ID: ")
                if any(item.surgery_id == surgery_id for item in hospital.surgeries):
                    print("A surgery with this ID already exists.")
                    continue
                surgery = Surgery(
                    surgery_id, patient, doctor,
                    _required_text("Surgery type: "),
                )
                hospital.add_surgery(surgery)
                print(f"Surgery scheduled: {surgery}")
            elif choice == "2":
                if not hospital.operation_theatres:
                    theatre_id = _required_text("New theatre ID: ")
                    hospital.add_operation_theatre(
                        OperationTheatre(theatre_id)
                    )
                for index, theatre in enumerate(
                    hospital.operation_theatres, start=1
                ):
                    print(f"{index}. {theatre.theatre_id}: {theatre.bookings}")
                theatre_number = _integer("Theatre number: ", 1)
                if theatre_number > len(hospital.operation_theatres):
                    print("That theatre number does not exist.")
                    continue
                theatre = hospital.operation_theatres[theatre_number - 1]
                slot = _required_text("Booking date and time: ")
                theatre.reserve(slot)
                print(f"Theatre {theatre.theatre_id} booked for {slot}.")
            elif choice == "3":
                print("1. Add Ambulance  2. View Ambulances")
                action = _menu_choice("Select: ", {"1", "2"})
                if action == "1":
                    ambulance = Ambulance(
                        _required_text("Ambulance ID: "),
                        _required_text("Ambulance type: "),
                    )
                    if any(
                        existing.ambulance_id == ambulance.ambulance_id
                        for existing in state["ambulances"]
                    ):
                        print("An ambulance with this ID already exists.")
                        continue
                    state["ambulances"].append(ambulance)
                    print(f"Ambulance added: {ambulance}")
                elif action == "2":
                    if not state["ambulances"]:
                        print("No ambulances are registered.")
                    for ambulance in state["ambulances"]:
                        print(ambulance)
            elif choice == "4":
                print("1. Add Blood Stock  2. Issue Blood  3. View Stock")
                action = _menu_choice("Select: ", {"1", "2", "3"})
                blood_group = ""
                if action in {"1", "2"}:
                    blood_group = _required_text(
                        "Blood group (A+, A-, B+, B-, AB+, AB-, O+, O-): "
                    ).upper()
                    if blood_group not in {
                        "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
                    }:
                        print("Enter a valid blood group.")
                        continue
                if action == "1":
                    units = _integer("Units to add: ", 1)
                    state["blood_bank"].add_blood(blood_group, units)
                    print(f"Added {units} unit(s) of {blood_group}.")
                elif action == "2":
                    units = _integer("Units to issue: ", 1)
                    state["blood_bank"].issue_blood(blood_group, units)
                    print(f"Issued {units} unit(s) of {blood_group}.")
                elif action == "3":
                    if not state["blood_bank"].stock:
                        print("No blood stock is recorded.")
                    for group, units in sorted(state["blood_bank"].stock.items()):
                        print(f"{group}: {units} unit(s)")
            elif choice == "5":
                print("1. Add Payroll Record  2. View Payroll")
                action = _menu_choice("Select: ", {"1", "2"})
                if action == "1":
                    record = Payroll(
                        _name("Employee name: "),
                        _amount("Salary: "),
                    )
                    state["payroll"].append(record)
                    print(f"Payroll record added: {record}")
                elif action == "2":
                    if not state["payroll"]:
                        print("No payroll records are available.")
                    for record in state["payroll"]:
                        print(record)
            elif choice == "6":
                patient = hospital.search_patient(
                    _required_text("Patient ID: ")
                )
                plan = DietPlan(patient, _required_text("Diet plan: "))
                hospital.add_diet_plan(plan)
                print(f"Diet plan added: {plan}")
            elif choice == "7":
                patient = hospital.search_patient(
                    _required_text("Patient ID: ")
                )
                visitor = VisitorPass(
                    _name("Visitor name: "), patient
                )
                hospital.add_visitor_pass(visitor)
                print(
                    f"Visitor pass added for {visitor.visitor_name} "
                    f"to visit {patient.name}."
                )
            elif choice == "8":
                patient = hospital.search_patient(
                    _required_text("Patient ID: ")
                )
                source = hospital.find_doctor(
                    _required_text("Referring doctor ID: ")
                )
                destination = hospital.find_doctor(
                    _required_text("Receiving doctor ID: ")
                )
                if source == destination:
                    print("Choose two different doctors for a referral.")
                    continue
                referral = Referral(source, destination, patient)
                hospital.add_referral(referral)
                print(
                    f"Referral recorded: {patient.name}, "
                    f"{source.name} to {destination.name}."
                )
            elif choice == "9":
                patient = hospital.search_patient(
                    _required_text("Patient ID: ")
                )
                follow_up = FollowUp(
                    patient,
                    _required_text("Follow-up date (YYYY-MM-DD): "),
                )
                hospital.add_follow_up(follow_up)
                print(
                    f"Follow-up scheduled for {patient.name} on "
                    f"{follow_up.followup_date}."
                )
        except (
            ValueError,
            HospitalError,
            ResourceConflictError,
            BloodUnavailableError,
        ) as error:
            print(f"Unable to complete advanced service: {error}")


def _add_staff(hospital, state):
    print("\n--- Add Staff ---")
    print("1. Nurse")
    print("2. Receptionist")
    print("0. Back")
    choice = _menu_choice("Select: ", {"0", "1", "2"})
    if choice == "0" or choice is None:
        return
    try:
        person_id = _required_text("Person ID: ")
        name = _name("Staff name: ")
        age = _integer("Age: ", 0, 120)
        phone = _phone_number("Phone number: ")
        gender = _gender("Gender (Female/Male): ")
        if choice == "1":
            nurse_id = _required_text("Nurse ID: ")
            if any(nurse.nurse_id == nurse_id for nurse in hospital.nurses):
                print("A nurse with this ID already exists.")
                return
            nurse = Nurse(
                person_id, name, age, phone, gender,
                nurse_id, _required_text("Department: "),
            )
            hospital.add_nurse(nurse)
            print(f"Nurse added: {nurse}")
        else:
            receptionist_id = _required_text("Receptionist ID: ")
            if any(
                person.receptionist_id == receptionist_id
                for person in state["receptionists"]
            ):
                print("A receptionist with this ID already exists.")
                return
            receptionist = Receptionist(
                person_id, name, age, phone, gender,
                receptionist_id, _required_text("Shift: "),
            )
            state["receptionists"].append(receptionist)
            print(f"Receptionist added: {receptionist}")
    except (ValueError, HospitalError) as error:
        print(f"Unable to add staff: {error}")


def main():
    hospital = Hospital("CityCare Hospital")
    admissions = {}
    state = {
        "admission_dates": {},
        "doctor_earnings": {},
        "emergency_queue": [],
        "emergency_sequence": 0,
        "doctor_leaves": [],
        "payment_policy": SelfPay(),
        "payment_policy_name": "Self Pay",
        "lab_tests": [],
        "health_packages": [],
        "blood_bank": BloodBank(),
        "ambulances": [],
        "payroll": [],
        "receptionists": [],
    }
    _load_demo_data(hospital, admissions, state)

    while True:
        show_menu()
        try:
            choice = input("\nEnter your choice: ").strip()
            if choice == "1":
                patient = Patient(
                    _required_text("Person ID: "),
                    _name("Patient Name: "),
                    _integer("Age: ", 0, 120),
                    _phone_number("Phone Number: "),
                    _gender("Gender (Female/Male): "),
                    _required_text("Patient ID: "),
                    _required_text("Disease: "),
                )
                if any(
                    existing.patient_id == patient.patient_id
                    or existing.person_id == patient.person_id
                    for existing in hospital.patients
                ):
                    print("A patient with this ID is already registered.")
                    continue
                hospital.register_patient(patient)
                print("Patient registered successfully.")
            elif choice == "2":
                doctor = Doctor(
                    _required_text("Doctor ID: "),
                    _name("Doctor Name: "),
                    _integer("Age: ", 0, 120),
                    _phone_number("Phone Number: "),
                    _gender("Gender (Female/Male): "),
                    _required_text("Specialization: "),
                    _amount("Consultation Fee: "),
                )
                if any(
                    existing.person_id == doctor.person_id
                    for existing in hospital.doctors
                ):
                    print("A doctor with this ID is already registered.")
                    continue
                hospital.add_doctor(doctor)
                print("Doctor added successfully.")
            elif choice == "3":
                _add_staff(hospital, state)
            elif choice == "4":
                if not hospital.patients:
                    print("No patients available.")
                for patient in hospital.view_patients():
                    print(patient)
            elif choice == "5":
                if not hospital.doctors:
                    print("No doctors available.")
                for doctor in hospital.view_doctors():
                    print(doctor)
            elif choice == "6":
                patient_id = _required_text("Enter Patient ID: ")
                try:
                    print(hospital.search_patient(patient_id))
                except HospitalError:
                    print(f"Patient with ID {patient_id} not found")
            elif choice == "7":
                patient = hospital.search_patient(
                    _required_text("Patient ID: ")
                )
                doctor = hospital.find_doctor(
                    _required_text("Doctor ID: ")
                )
                appointment_id = _required_text("Appointment ID: ")
                if _find_appointment(hospital, appointment_id):
                    print("An appointment with this ID already exists.")
                    continue
                slot = _required_text("Appointment date and time: ")
                if any(
                    leave.doctor == doctor and leave.leave_date in slot
                    for leave in state["doctor_leaves"]
                ):
                    print("That doctor is on leave for the selected date.")
                    continue
                appointment = Appointment(
                    appointment_id, patient, doctor, slot
                )
                if any(
                    existing.conflicts_with(appointment)
                    for existing in hospital.appointments
                ):
                    print("That doctor already has a scheduled appointment then.")
                    continue
                hospital.book_appointment(appointment)
                print(f"Appointment booked: {appointment}")
            elif choice == "8":
                if not hospital.view_appointments():
                    print("No appointments available.")
                for appointment in hospital.view_appointments():
                    print(appointment)
            elif choice == "9":
                appointment_id = _required_text("Appointment ID: ")
                appointment = _find_appointment(hospital, appointment_id)
                if appointment is None:
                    print("Appointment not found.")
                elif appointment.status != AppointmentStatus.SCHEDULED:
                    print("Only scheduled appointments can be cancelled.")
                else:
                    hospital.cancel_appointment(appointment)
                    print("Appointment cancelled.")
            elif choice == "10":
                if not hospital.wards:
                    print("No wards are configured. Add a ward in option 12.")
                    continue
                patient = hospital.search_patient(
                    _required_text("Patient ID: ")
                )
                if patient.patient_id in admissions:
                    print("This patient is already admitted.")
                    continue
                for index, ward in enumerate(hospital.wards, start=1):
                    print(f"{index}. {ward}")
                ward_number = _integer("Ward number: ", 1)
                if ward_number > len(hospital.wards):
                    print("That ward number does not exist.")
                    continue
                ward = hospital.wards[ward_number - 1]
                hospital.admit_patient(patient, ward)
                admissions[patient.patient_id] = ward
                state["admission_dates"][patient.patient_id] = datetime.now()
                print(f"{patient.name} admitted to {ward.ward_type}.")
            elif choice == "11":
                patient_id = _required_text("Patient ID: ")
                ward = admissions.get(patient_id)
                if ward is None:
                    print("This patient is not currently admitted.")
                    continue
                hospital.discharge_patient(ward)
                del admissions[patient_id]
                state["admission_dates"].pop(patient_id, None)
                print(f"Patient {patient_id} discharged.")
            elif choice == "12":
                _ward_management(hospital, admissions)
            elif choice == "13":
                patient = hospital.search_patient(
                    _required_text("Patient ID: ")
                )
                doctor = hospital.find_doctor(
                    _required_text("Doctor ID: ")
                )
                prescription_id = _required_text("Prescription ID: ")
                if _find_prescription(hospital, prescription_id):
                    print("A prescription with this ID already exists.")
                    continue
                prescription = Prescription(
                    prescription_id, doctor, patient
                )
                while True:
                    name = _required_text("Medicine name (or 'done'): ")
                    if name.casefold() == "done":
                        if not prescription.medicines:
                            print("Add at least one medicine.")
                            continue
                        break
                    prescription.add_medicine(
                        Medicine(
                            name,
                            _required_text("Dose: "),
                            _integer("Days: ", 1),
                            _amount("Price per day: "),
                        )
                    )
                hospital.add_prescription(prescription)
                print(f"Prescription added: {prescription}")
            elif choice == "14":
                patient = hospital.search_patient(
                    _required_text("Patient ID: ")
                )
                doctor = hospital.find_doctor(
                    _required_text("Doctor ID: ")
                )
                medicine_cost = _amount("Medicine Cost: ")
                ward_cost = _amount("Ward Cost: ")
                senior = _yes_no(
                    "Senior Citizen (yes/no) "
                    f"[patient age {patient.age}]: "
                )
                gross = BillService(
                    doctor.consultation_fee,
                    medicine_cost,
                    ward_cost,
                    senior,
                ).calculate_bill()
                bill_id = _required_text("Bill ID: ")
                if any(bill.bill_id == bill_id for bill in hospital.bills):
                    print("A bill with this ID already exists.")
                    continue
                amount = round(
                    state["payment_policy"].apply_payment(gross), 2
                )
                bill = Bill(bill_id, patient, amount)
                hospital.generate_bill(bill)
                state["doctor_earnings"][doctor.person_id] = (
                    state["doctor_earnings"].get(doctor.person_id, 0)
                    + doctor.consultation_fee
                )
                print(
                    f"Bill generated under {state['payment_policy_name']}: "
                    f"{bill}"
                )
            elif choice == "15":
                if not hospital.view_bills():
                    print("No bills available.")
                for bill in hospital.view_bills():
                    print(bill)
            elif choice == "16":
                _reports_dashboard(hospital, admissions, state)
            elif choice == "17":
                _payment_policy_menu(state)
            elif choice == "18":
                _emergency_menu(hospital, state)
            elif choice == "19":
                _laboratory_menu(hospital, state)
            elif choice == "20":
                _advanced_services_menu(hospital, state)
            elif choice == "0":
                print("Thank you for using CityCare HMS.")
                return
            else:
                print("Invalid choice. Please select a listed menu option.")
        except EOFError:
            print("\nInput ended. Exiting CityCare HMS.")
            return
        except (ValueError, HospitalError) as error:
            print(f"Unable to complete operation: {error}")


if __name__ == "__main__":
    main()
