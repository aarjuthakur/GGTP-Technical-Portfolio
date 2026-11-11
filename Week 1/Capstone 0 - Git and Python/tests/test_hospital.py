import unittest
from hms.services.hospital import Hospital
from hms.models.patient import Patient
from hms.models.doctor import Doctor
from hms.models.nurse import Nurse
from hms.models.ward import Ward
from hms.models.appointment import Appointment
from hms.models.prescription import Prescription
from hms.models.bill import Bill
from hms.models.surgery import Surgery
from hms.models.operation_theatre import OperationTheatre
from hms.models.diet_plan import DietPlan
from hms.models.visitor_pass import VisitorPass
from hms.models.referral import Referral
from hms.models.follow_up import FollowUp
from hms.exceptions.hospital_exception import (
    PatientNotFoundError,
    DoctorNotAvailableError,
    WardFullError,
    InvalidOperationError
)
#testing file print("hello wwold")

class TestHospitalPatientOps(unittest.TestCase):

    def setUp(self):
        self.hospital = Hospital("CityCare Hospital")
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )

    def test_register_patient(self):
        self.hospital.register_patient(self.patient)
        self.assertEqual(len(self.hospital.patients), 1)

    def test_search_patient_found(self):
        self.hospital.register_patient(self.patient)
        result = self.hospital.search_patient("P001")
        self.assertEqual(result, self.patient)

    def test_search_patient_not_found_raises(self):
        with self.assertRaises(PatientNotFoundError):
            self.hospital.search_patient("P999")

    def test_search_patient_by_name(self):
        self.hospital.register_patient(self.patient)
        results = self.hospital.search_patient_by_name("John")
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0], self.patient)

    def test_search_patient_by_name_case_insensitive(self):
        self.hospital.register_patient(self.patient)
        results = self.hospital.search_patient_by_name("john")
        self.assertEqual(len(results), 1)

    def test_search_patient_by_name_no_match(self):
        self.hospital.register_patient(self.patient)
        results = self.hospital.search_patient_by_name("Alice")
        self.assertEqual(len(results), 0)

    def test_patient_timeline(self):
        timeline = self.hospital.patient_timeline(self.patient)
        self.assertEqual(timeline["name"], "John")
        self.assertIn("status", timeline)


class TestHospitalDoctorOps(unittest.TestCase):

    def setUp(self):
        self.hospital = Hospital("CityCare Hospital")
        self.doctor = Doctor(
            1, "Dr. Smith", 45, "1234567890", "Male",
            "Cardiology", 500
        )

    def test_add_doctor(self):
        self.hospital.add_doctor(self.doctor)
        self.assertEqual(len(self.hospital.doctors), 1)

    def test_find_doctor_found(self):
        self.hospital.add_doctor(self.doctor)
        result = self.hospital.find_doctor(1)
        self.assertEqual(result, self.doctor)

    def test_find_doctor_not_found_raises(self):
        with self.assertRaises(DoctorNotAvailableError):
            self.hospital.find_doctor(999)

    def test_view_doctors(self):
        self.hospital.add_doctor(self.doctor)
        self.assertEqual(self.hospital.view_doctors(), [self.doctor])


class TestHospitalWardOps(unittest.TestCase):

    def setUp(self):
        self.hospital = Hospital("CityCare Hospital")
        self.ward = Ward("General", 2, 500)
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )

    def test_add_ward(self):
        self.hospital.add_ward(self.ward)
        self.assertEqual(len(self.hospital.wards), 1)

    def test_admit_patient(self):
        result = self.hospital.admit_patient(self.patient, self.ward)
        self.assertTrue(result)
        self.assertEqual(self.ward.beds_occupied, 1)

    def test_admit_patient_ward_full_raises(self):
        self.ward.beds_occupied = 2
        with self.assertRaises(WardFullError):
            self.hospital.admit_patient(self.patient, self.ward)

    def test_discharge_patient(self):
        self.ward.beds_occupied = 1
        self.hospital.discharge_patient(self.ward)
        self.assertEqual(self.ward.beds_occupied, 0)

    def test_discharge_empty_ward_raises(self):
        with self.assertRaises(InvalidOperationError):
            self.hospital.discharge_patient(self.ward)


class TestHospitalAppointmentOps(unittest.TestCase):

    def setUp(self):
        self.hospital = Hospital("CityCare Hospital")
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )
        self.doctor = Doctor(
            2, "Dr. Smith", 45, "9876543210", "Male",
            "General", 300
        )
        self.appointment = Appointment(
            "A001", self.patient, self.doctor, "10:00 AM"
        )

    def test_book_appointment(self):
        self.hospital.book_appointment(self.appointment)
        self.assertEqual(len(self.hospital.appointments), 1)

    def test_cancel_appointment(self):
        self.hospital.book_appointment(self.appointment)
        self.hospital.cancel_appointment(self.appointment)
        self.assertEqual(self.appointment.status.value, "Cancelled")

    def test_view_appointments(self):
        self.hospital.book_appointment(self.appointment)
        self.assertEqual(
            self.hospital.view_appointments(),
            [self.appointment]
        )


class TestHospitalPrescriptionOps(unittest.TestCase):

    def setUp(self):
        self.hospital = Hospital("CityCare Hospital")
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )
        self.doctor = Doctor(
            2, "Dr. Smith", 45, "9876543210", "Male",
            "General", 300
        )

    def test_add_prescription(self):
        rx = Prescription("RX001", self.doctor, self.patient)
        self.hospital.add_prescription(rx)
        self.assertEqual(len(self.hospital.prescriptions), 1)


class TestHospitalBillingOps(unittest.TestCase):

    def setUp(self):
        self.hospital = Hospital("CityCare Hospital")
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )

    def test_generate_bill(self):
        bill = Bill("B001", self.patient, 1000)
        self.hospital.generate_bill(bill)
        self.assertEqual(len(self.hospital.bills), 1)

    def test_view_bills(self):
        bill = Bill("B001", self.patient, 1000)
        self.hospital.generate_bill(bill)
        self.assertEqual(self.hospital.view_bills(), [bill])


class TestHospitalNurseOps(unittest.TestCase):

    def setUp(self):
        self.hospital = Hospital("CityCare Hospital")

    def test_add_nurse(self):
        nurse = Nurse(
            1, "Nurse Joy", 30, "1234567890", "Female",
            "N001", "Emergency"
        )
        self.hospital.add_nurse(nurse)
        self.assertEqual(len(self.hospital.nurses), 1)


class TestHospitalR3COps(unittest.TestCase):

    def setUp(self):
        self.hospital = Hospital("CityCare Hospital")
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )
        self.doctor = Doctor(
            2, "Dr. Smith", 45, "9876543210", "Male",
            "General", 300
        )

    def test_add_surgery(self):
        surgery = Surgery("S001", self.patient, self.doctor, "Bypass")
        self.hospital.add_surgery(surgery)
        self.assertEqual(len(self.hospital.surgeries), 1)

    def test_add_operation_theatre(self):
        theatre = OperationTheatre("OT1")
        self.hospital.add_operation_theatre(theatre)
        self.assertEqual(len(self.hospital.operation_theatres), 1)

    def test_add_diet_plan(self):
        diet = DietPlan(self.patient, "Low Salt")
        self.hospital.add_diet_plan(diet)
        self.assertEqual(len(self.hospital.diet_plans), 1)

    def test_add_visitor_pass(self):
        visitor = VisitorPass("Jane", self.patient)
        self.hospital.add_visitor_pass(visitor)
        self.assertEqual(len(self.hospital.visitor_passes), 1)

    def test_add_referral(self):
        to_doc = Doctor(
            3, "Dr. B", 50, "5555555555", "Male",
            "Cardiology", 800
        )
        referral = Referral(self.doctor, to_doc, self.patient)
        self.hospital.add_referral(referral)
        self.assertEqual(len(self.hospital.referrals), 1)

    def test_add_follow_up(self):
        followup = FollowUp(self.patient, "2024-03-01")
        self.hospital.add_follow_up(followup)
        self.assertEqual(len(self.hospital.follow_ups), 1)


class TestHospitalStr(unittest.TestCase):

    def test_str_representation(self):
        hospital = Hospital("CityCare Hospital")
        result = str(hospital)
        self.assertIn("CityCare Hospital", result)
        self.assertIsInstance(result, str)

    def test_view_patients(self):
        hospital = Hospital("CityCare Hospital")
        patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )
        hospital.register_patient(patient)
        self.assertEqual(hospital.view_patients(), [patient])


if __name__ == "__main__":
    unittest.main()
