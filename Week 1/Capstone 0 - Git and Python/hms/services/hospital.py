#main hospital
from hms.exceptions.hospital_exception import (
    PatientNotFoundError,
    DoctorNotAvailableError,
    WardFullError,
    InvalidOperationError
)


class Hospital:
#implementing hospital
    def __init__(self, hospital_name):

        self.hospital_name = hospital_name

        self.patients = []
        self.doctors = []
        self.nurses = []
        self.wards = []

        self.appointments = []
        self.prescriptions = []
        self.bills = []

        self.surgeries = []
        self.operation_theatres = []
        self.diet_plans = []
        self.visitor_passes = []
        self.referrals = []
        self.follow_ups = []

    #patient operation

    def register_patient(self, patient):
        self.patients.append(patient)

    def search_patient(self, patient_id):

        for patient in self.patients:

            if patient.patient_id == patient_id:
                return patient

        raise PatientNotFoundError(
            f"Patient with ID {patient_id} not found"
        )

   #doctor operation

    def add_doctor(self, doctor):
        self.doctors.append(doctor)

    def find_doctor(self, person_id):

        for doctor in self.doctors:

            if doctor.person_id == person_id:
                return doctor

        raise DoctorNotAvailableError(
            f"Doctor with ID {person_id} not found"
        )

    #nurse operation
    def add_nurse(self, nurse):
        self.nurses.append(nurse)

  #ward operation

    def add_ward(self, ward):
        self.wards.append(ward)

    def admit_patient(self, patient, ward):

        if ward.beds_available() > 0:

            ward.beds_occupied += 1

            return True

        raise WardFullError(
            f"Ward {ward.ward_type} is full"
        )

    def discharge_patient(self, ward):

        if ward.beds_occupied > 0:
            ward.beds_occupied -= 1
        else:
            raise InvalidOperationError(
                "No patients to discharge from this ward"
            )

    #appointment

    def book_appointment(self, appointment):
        self.appointments.append(appointment)

    def cancel_appointment(self, appointment):
        appointment.cancel()

    #presciptionS
    def add_prescription(self, prescription):
        self.prescriptions.append(prescription)

    #billing
    def generate_bill(self, bill):
        self.bills.append(bill)

    #surgery operations

    def add_surgery(self, surgery):
        self.surgeries.append(surgery)

    def add_operation_theatre(self, theatre):
        self.operation_theatres.append(theatre)

    #diet plan operations

    def add_diet_plan(self, diet_plan):
        self.diet_plans.append(diet_plan)

    #visitor pass operations

    def add_visitor_pass(self, visitor_pass):
        self.visitor_passes.append(visitor_pass)

    #referral operations

    def add_referral(self, referral):
        self.referrals.append(referral)

    #follow up operations

    def add_follow_up(self, follow_up):
        self.follow_ups.append(follow_up)

    #search by name

    def search_patient_by_name(self, name):

        return [
            patient
            for patient in self.patients
            if name.lower() in patient.name.lower()
        ]

    #patient timeline

    def patient_timeline(self, patient):

        return {
            "name": patient.name,
            "status": getattr(
                patient,
                "status",
                None
            )
        }

    #view

    def view_doctors(self):
        return self.doctors

    def view_patients(self):
        return self.patients

    def view_bills(self):
        return self.bills

    def view_appointments(self):
        return self.appointments
    def patients_admitted_longer_than(self, days):

        for patient in self.patients:

            if hasattr(patient, "stay_days"):

                if patient.stay_days > days:
                    yield patient
    def revenue_report(self):

        total = 0

        for bill in self.bills:
            total += bill.amount

        return total
        #string
    def ward_occupancy_report(self):

        report = {}

        for ward in self.wards:
            report[ward.ward_type] = ward.beds_occupied

        return report

    def __str__(self):

        return (
            f"Hospital("
            f"Name={self.hospital_name}, "
            f"Patients={len(self.patients)}, "
            f"Doctors={len(self.doctors)}, "
            f"Nurses={len(self.nurses)}, "
            f"Wards={len(self.wards)})"
        )
