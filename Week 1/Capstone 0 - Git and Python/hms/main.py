import math
#main function for main shell
from hms.exceptions.hospital_exception import (
    DoctorNotAvailableError,
    InvalidOperationError,
    PatientNotFoundError,
    WardFullError,
)
from hms.models.appointment import Appointment, AppointmentStatus
from hms.models.bill import Bill
from hms.models.doctor import Doctor
from hms.models.medicine import Medicine
from hms.models.patient import Patient
from hms.models.prescription import Prescription
from hms.models.ward import Ward
from hms.services.bill_services import BillService
from hms.services.hospital import Hospital
#importing

def _required_text(prompt):
    while True:
        value = input(prompt).strip()
        if value:
            return value
        print("This value cannot be empty. Please try again.")

#integer
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
            continue
        if maximum is not None and number > maximum:
            print(f"Please enter a number no greater than {maximum}.")
            continue
        return number

#phn no
def _phone_number(prompt):
    while True:
        phone = input(prompt).strip()
        if len(phone) == 10 and phone.isdigit():
            return phone
        print("Phone number must contain exactly 10 digits.")

#amounttt
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
            continue
        return amount

#yes no
def _yes_no(prompt):
    while True:#appointment
        answer = input(prompt).strip().lower()
        if answer in ("yes", "y"):
            return True
        if answer in ("no", "n"):
            return False
        print("Please enter yes or no.")


def _find_appointment(hospital, appointment_id):
    for appointment in hospital.appointments:
        if appointment.appointment_id == appointment_id:
            return appointment
    return None

#appointment
def _find_prescription(hospital, prescription_id):
    for prescription in hospital.prescriptions:
        if prescription.prescription_id == prescription_id:
            return prescription
    return None


def _load_demo_data(hospital, admissions):
    if any(
        patient.patient_id in {"P1001", "P1002"}
        for patient in hospital.patients
    ):#appointment
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
    hospital.register_patient(patient)
    hospital.register_patient(second_patient)
    hospital.add_doctor(doctor)
    hospital.add_doctor(second_doctor)
    hospital.add_ward(general_ward)
    hospital.add_ward(cardiac_ward)

    hospital.admit_patient(patient, general_ward)
    admissions[patient.patient_id] = general_ward

    appointment = Appointment(
        "A1001", second_patient, second_doctor, "2026-10-07 10:00 AM"
    )
    hospital.book_appointment(appointment)

    prescription = Prescription("RX1001", doctor, patient)
    prescription.add_medicine(
        Medicine("Paracetamol", "500 mg", 3, 10.0)
    )#appointment#appointment
    hospital.add_prescription(prescription)

    bill_amount = BillService(
        doctor.consultation_fee, 30.0, general_ward.per_day_charge
    ).calculate_bill()
    hospital.generate_bill(Bill("B1001", patient, bill_amount))
#appointment
    print("Demo data loaded. Sample IDs:")
    print("Patients: P1001, P1002")
    print("Doctors: D1001, D1002")
    print("Appointment: A1001 | Prescription: RX1001 | Bill: B1001")


def show_menu(): #menu
    print("\n===== CityCare Hospital Management System =====")
    print("1. Register Patient")
    print("2. Add Doctor")
    print("3. View Doctors")
    print("4. View Patients")
    print("5. Search Patient")
    print("6. Book Appointment")
    print("7. Cancel Appointment")
    print("8. Admit Patient")
    print("9. Discharge Patient")
    print("10. Add Prescription")
    print("11. Generate Bill")
    print("12. View Ward Occupancy")
    print("13. View Bills")
    print("14. Add Ward")
    print("15. View Appointments")
    print("16. View Prescriptions")
    print("17. Load Demo Data")
    print("0. Exit")


def main(): #main
    hospital = Hospital("CityCare Hospital")
    admissions = {}
    _load_demo_data(hospital, admissions)

    while True:
        show_menu()
        choice = input("\nEnter your choice: ").strip()

        try:
            if choice == "1":
                patient = Patient(
                    _required_text("Person ID: "),
                    _required_text("Patient Name: "),
                    _integer("Age: ", 0, 120),
                    _phone_number("Phone Number: "),
                    _required_text("Gender: "),
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
                    _required_text("Doctor Name: "),
                    _integer("Age: ", 0, 120),
                    _phone_number("Phone Number: "),
                    _required_text("Gender: "),
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
                if not hospital.doctors:
                    print("No doctors available.")
                else:
                    for doctor in hospital.view_doctors():
                        print(doctor)

            elif choice == "4":
                if not hospital.patients:
                    print("No patients available.")
                else:
                    for patient in hospital.view_patients():
                        print(patient)

            elif choice == "5":
                patient_id = _required_text("Enter Patient ID: ")
                try:
                    print(hospital.search_patient(patient_id))
                except PatientNotFoundError:
                    print(f"Patient with ID {patient_id} not found")

            elif choice == "6":
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

            elif choice == "7":
                appointment_id = _required_text("Appointment ID: ")
                appointment = _find_appointment(hospital, appointment_id)
                if appointment is None:
                    print("Appointment not found.")
                elif appointment.status != AppointmentStatus.SCHEDULED:
                    print("Only scheduled appointments can be cancelled.")
                else:
                    hospital.cancel_appointment(appointment)
                    print("Appointment cancelled.")

            elif choice == "8":
                if not hospital.wards:
                    print("No wards are configured. Add a ward first (option 14).")
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
                print(f"{patient.name} admitted to {ward.ward_type}.")

            elif choice == "9":#appointment
                patient_id = _required_text("Patient ID: ")
                ward = admissions.get(patient_id)
                if ward is None:
                    print("This patient is not currently admitted.")
                    continue
                hospital.discharge_patient(ward)
                del admissions[patient_id]
                print(f"Patient {patient_id} discharged.")
#appointment
            elif choice == "10":
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
                while True:#appointment
                    name = _required_text("Medicine name (or 'done'): ")
                    if name.casefold() == "done":
                        if not prescription.medicines:
                            print("Add at least one medicine.")
                            continue
                        break
                    medicine = Medicine(
                        name,
                        _required_text("Dose: "),
                        _integer("Days: ", 1),
                        _amount("Price per day: "),
                    )#appointment
                    prescription.add_medicine(medicine)
                hospital.add_prescription(prescription)
                print(f"Prescription added: {prescription}")

            elif choice == "11":
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
                amount = BillService(
                    doctor.consultation_fee,
                    medicine_cost,
                    ward_cost,
                    senior,
                ).calculate_bill()
                bill_id = _required_text("Bill ID: ")
                if any(bill.bill_id == bill_id for bill in hospital.bills):
                    print("A bill with this ID already exists.")
                    continue
                bill = Bill(bill_id, patient, amount)
                hospital.generate_bill(bill)
                print(f"Bill generated: {bill}")

            elif choice == "12":
                if not hospital.wards:
                    print("No wards available.")
                else:
                    for ward in hospital.wards:
                        print(
                            f"{ward.ward_type}: "
                            f"{ward.beds_occupied}/{ward.total_beds} occupied, "
                            f"{ward.beds_available()} available"
                        )

            elif choice == "13":
                if not hospital.view_bills():
                    print("No bills available.")
                else:
                    for bill in hospital.view_bills():
                        print(bill)

            elif choice == "14":
                ward_type = _required_text("Ward type: ")
                if any(
                    ward.ward_type.casefold() == ward_type.casefold()
                    for ward in hospital.wards
                ):
                    print("A ward with this type already exists.")
                    continue
                total_beds = _integer("Total beds: ", 1)
                charge = _amount("Per-day charge: ")
                ward = Ward(ward_type, total_beds, charge)
                hospital.add_ward(ward)
                print(f"Ward added: {ward}")

            elif choice == "15":
                if not hospital.view_appointments():
                    print("No appointments available.")
                else:
                    for appointment in hospital.view_appointments():
                        print(appointment)

            elif choice == "16":
                if not hospital.prescriptions:
                    print("No prescriptions available.")
                else:
                    for prescription in hospital.prescriptions:
                        print(prescription)

            elif choice == "17":
                _load_demo_data(hospital, admissions)

            elif choice == "0":
                print("Thank you for using CityCare HMS.")
                break

            else:
                print("Invalid choice. Please select a listed menu option.")

        except (ValueError, PatientNotFoundError, DoctorNotAvailableError,
                WardFullError, InvalidOperationError) as error:
            print(f"Unable to complete operation: {error}")
>>>>>>> origin/main


if __name__ == "__main__":
    main()
